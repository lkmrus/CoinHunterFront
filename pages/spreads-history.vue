<template>
  <section class="spread-history__page">
    <h2 class="spread-history_title">
      {{ $t('spreads_history_title') }}
    </h2>
    <div
      class="filter"
      :class="{'inactive': !authenticated}"
    >
      <div class="filter__content">
        <div class="filter-elements">
          <div class="filter-cryptocouple filter-item">
            <div class="filter-item__name">
              {{ $t('arbitrage_filter_element_1_name') }}
            </div>
            <div class="filter__block">
              <input-custom
                :disabled="!authenticated"
                :placeholder="$t('arbitrage_filter_element_1_selection_placeholder')"
                @input="fillFilterPair($event, 0)"
              />
              <selection-custom
                class="filter-second"
                :inactive="!authenticated"
                :class="{'selected-tab_small': !isOpen}"
                :options="[
                  { name: $t('arbitrage_filter_element_1_selection_placeholder') },
                  ...getPairOptions('right')
                ]"
                :placeholder="$t('arbitrage_filter_element_1_selection_placeholder')"
                :active-options="[]"
                @change="fillFilterPair($event.new_item.name, 1)"
              />
            </div>
          </div>
          <div class="filter-cryptoexchanges filter-item">
            <div class="filter-item__name">
              {{ $t('arbitrage_filter_element_2_name') }}
            </div>
            <selection-custom
              :class="{'selected-tab_small': !isOpen}"
              :inactive="!authenticated"
              :multiple-type="true"
              :options="[
                { name: $t('arbitrage_filter_element_2_selection_placeholder'), is_active: false},
                ...exchangesOptions
              ]"
              :placeholder="$t('arbitrage_filter_element_2_selection_placeholder')"
              :active-options="[]"
              @change="fillFilterAskExchange($event.new_item)"
            />
          </div>
        </div>
      </div>
    </div>
    <main-table
      class="spread-history__table"
      :table-header="tableHeader"
      :table-columns="tableColumns"
      :table-body="spreadsList"
    />
    <table-pagination
      v-if="spreadsCount > filterService.filter.limit"
      :limit="filterService.filter.limit"
      :count="spreadsCount"
      @page-change="filterService.setOffset($event); getSpreadsList()"
    />
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { SpreadsService } from '~/services/spreads/SpreadsService.js'
import { FilterService } from '~/services/spreads/FilterService.js'
import { FilterPagination } from '~/models/FilterPagination.js'
import { useAuthStore } from '~/store/auth'
import { FilterConfig } from '~/configs/FilterConfig.js'
import { SelectionCustomData } from '~/DTO/SelectionCustomData.js'

const { t } = useI18n({ useScope: 'global' })

const { authenticated } = storeToRefs(useAuthStore())

const isOpen = ref(false)

useHead(() => {
  return {
    title: t('spreads_history_title')
  }
})

const getPairOptions = position => FilterConfig.pair[position].map(pairElem => new SelectionCustomData(pairElem))
const exchangesOptions = computed(() => FilterConfig.exchanges.map((exchangeElem) => {
  return {
    name: exchangeElem,
    is_active: false
  }
}))

const spreadsService = new SpreadsService()
const filterService = new FilterService(FilterPagination)
filterService.setDefaultLimit(10)

const spreadsList = ref([])
const spreadsCount = ref(0)

const SPLITTED_PAIR_FIRST_INDEX = 0
let timeOutPair = null
let timeOutAskExchange = null
const fillFilterPair = async (filterValue, splittedPairIndex) => {
  if (splittedPairIndex === SPLITTED_PAIR_FIRST_INDEX) {
    clearTimeout(timeOutPair)
    timeOutPair = setTimeout(async () => {
      if (filterService.fillPair(filterValue.toUpperCase(), splittedPairIndex)) {
        await getSpreadsList()
      }
    }, 1000)

    return this
  }

  if (filterService.fillPair(filterValue, splittedPairIndex)) {
    await getSpreadsList()
  }
}
const fillFilterAskExchange = (askExchangeItem) => {
  clearTimeout(timeOutAskExchange)
  filterService.fillAskExchange(
    askExchangeItem.name,
    askExchangeItem.is_active
      ? 'remove'
      : 'change'
  )

  timeOutAskExchange = setTimeout(async () => {
    await getSpreadsList()
  }, 1000)
}

const getSpreadsList = async () => {
  try {
    spreadsList.value = await spreadsService.getSpreadList(filterService.filter)
    spreadsCount.value = await spreadsService.getSpreadsCount(filterService.filter)

    spreadsCount.value = Number(spreadsCount.value)

    filterService.setSpreadsCount(spreadsCount.value)
  } catch (err) {
	  // TODO: Добавить логирование ошибок
  }
}
getSpreadsList()

const tableColumns = ['pair', 'profit', 'askExchange', 'askPrice', 'askSize', 'bidExchange', 'bidPrice', 'lifeTime', 'createdDate']
const tableHeader = reactive([
  { name: 'Pair', is_wide: false },
  { name: 'Profit (%)', is_wide: false },
  { name: 'Ask Exchange', is_wide: false },
  { name: 'Ask Price', is_wide: false },
  { name: 'Ask Size', is_wide: false },
  { name: 'Bid Exchange', is_wide: false },
  { name: 'Bid Price', is_wide: false },
  { name: 'Life time (min)', is_wide: false },
  { name: 'Date', is_wide: false }
])

</script>

<style scoped lang="scss">
.spread-history {
  &__page{
    padding-top: 182px;
    padding-bottom: 120px;
  }
  &_title{
    margin-bottom: 24px;
  }
  &__table {
    margin-bottom: 24px;
    @media (max-width: 920px) {
      margin-bottom: 32px;
    }
  }
}
:global(.filter-cryptocouple .input-custom) {
  width: 160px;
  height: auto;
}
:global(.filter-cryptocouple .input-custom .input_default) {
  border-radius: 16px 0px 0px 16px;
}
:global(.filter-cryptocouple .filter-second .selection-custom__content) {
  border-radius: 0;
}
:global(.filter-cryptoexchanges .selection-custom__content) {
  border-radius: 0px 16px 16px 0px;
}
.filter {
  margin-bottom: 34px;

  &.inactive {
    pointer-events: none;

    .filter__content {
      .filter-elements {
        .filter-item {
          &__name {
            color: var(--text-gray-dark);
          }
        }
      }
    }
  }

  &__block {
    display: flex;
    gap: 2px;
  }

  &__content {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    margin-bottom: 14px;

    .filter-elements {
      display: flex;
      gap: 2px;

      .filter-item {
        &__name {
          @include text-xs-mixin;
          margin-bottom: 8px;
        }
      }

      .filter-cryptocouple {
        .filter-second {
          width: 160px;
        }
      }
    }
  }

  &__checkbox {
    display: flex;
    justify-content: flex-end;
    gap: 15px;

    &_mobile {
      display: none;
    }
  }
}

@media (max-width: 1360px) {
  :global(.filter-cryptocouple .input-custom) {
    width: 120px;
  }
  .filter {
    &__content {
      .filter-elements {
        .filter-cryptocouple {
          .filter-second {
            width: 120px;
          }
        }

        .filter-cryptoexchanges {
          .selection-custom {
            width: 160px;
          }
        }
      }

      button {
        @include text-md-mixin;
        width: 120px;
      }
    }
  }
}

@media (max-width: 920px) {
  :global(.filter-cryptocouple .input-custom) {
    width: 50%;
  }
  :global(.filter-cryptocouple .input-custom .input_default) {
    border-radius: 16px 0px 0px 16px;
  }
  :global(.filter-cryptocouple .filter-second .selection-custom__content) {
    border-radius: 0px 16px 16px 0px;
  }
  :global(.filter-cryptoexchanges .selection-custom__content) {
    border-radius: 16px;
  }
  .filter {
    margin-bottom: 175px;
    position: relative;

    &__content {
      width: 100%;

      .filter-elements {
        width: 100%;
        gap: 12px;
        flex-direction: column;

        .filter-cryptocouple {
          .filter-second {
            width: 50%;
          }
        }

        .filter-cryptoexchanges {
          .selection-custom {
            width: 100%;
          }
        }
      }

      button {
        @include text-md-mixin;
        position: absolute;
        bottom: -140px;
        width: 100%;
      }
    }

    &__checkbox {
      position: absolute;
      left: 12px;
      bottom: -80px;
      display: none;

      &_mobile {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
