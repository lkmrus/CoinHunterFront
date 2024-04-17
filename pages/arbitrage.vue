<template>
  <div class="arbitrage-page">
    <section class="arbitrage-page__content">
      <h2>{{ $t('arbitrage_title') }}</h2>
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
              <div class="selections">
                <input-custom
                    :disabled="!authenticated"
                    :placeholder="$t('arbitrage_filter_element_1_selection_placeholder')"
                    @input="fillFilterPair($event, 0)"
                />
                <selection-custom
                  class="selection-second"
                  :inactive="!authenticated"
                  :class="{'selected-tab_small': !isOpen}"
                  :options="[
                    { name: $t('arbitrage_filter_element_1_selection_placeholder') },
                    { name: 'USDT'},
                    { name: 'BTC' },
                    { name: 'ETH' },
                  ]"
                  :placeholder="$t('arbitrage_filter_element_1_selection_placeholder')"
                  :active-options="[]"
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
                  { name: $t('arbitrage_filter_element_2_selection_placeholder'), is_active: false },
                  { name: 'binance', is_active: false },
                  { name: 'bybit', is_active: false },
                  { name: 'bitget', is_active: false },
                  { name: 'okx', is_active: false },
                ]"
                :placeholder="$t('arbitrage_filter_element_2_selection_placeholder')"
                :active-options="[]"
              />
            </div>
            <div class="filter-income-and-notifications">
              <div class="profit-no-less filter-item">
                <div class="filter-item__name">
                  {{ $t('arbitrage_filter_element_3_input_name') }}
                </div>
                <input-custom
                  :disabled="!authenticated"
                  placeholder="0 - 100 %"
                />
              </div>
              <div class="notification-frequency filter-item">
                <div class="filter-item__name">
                  {{ $t('arbitrage_filter_element_3_input_selection_name') }}
                </div>
                <selection-custom
                  :class="{'selected-tab_small': !isOpen}"
                  :inactive="!authenticated"
                  :options="[
                    { name: $t('arbitrage_filter_element_1_selection_placeholder') },
                    { name: '1s'},
                    { name: '5s'},
                    { name: '30s'},
                    { name: '1m'},
                    { name: '10m'},
                  ]"
                  :placeholder="$t('arbitrage_filter_element_1_selection_placeholder')"
                  :active-options="[]"
                />
              </div>
            </div>
          </div>
          <button-custom
            :disabled="!authenticated"
            :value="filterButtonText.name"
            :b-icon="filterButtonText.icon"
          />
        </div>
<!--        <div-->
<!--          v-if="authenticated"-->
<!--          class="filter__checkbox"-->
<!--        >-->
<!--          <checkbox-custom-->
<!--            default-type-->
<!--            :checked="telegramNotifications"-->
<!--            :text="$t('arbitrage_filter_checkbox')"-->
<!--            @click="telegramNotifications = !telegramNotifications"-->
<!--          />-->

<!--          <checkbox-custom-->
<!--            default-type-->
<!--            :checked="pushNotifications"-->
<!--            :text="$t('arbitrage_filter_checkbox_push')"-->
<!--            @click="pushNotifications = !pushNotifications"-->
<!--          />-->
<!--        </div>-->
        <div
          v-if="authenticated"
          class="filter__checkbox filter__checkbox_mobile"
        >
          <checkbox-custom
            default-type
            :checked="telegramNotifications"
            :text="$t('arbitrage_filter_checkbox_mobile')"
            @click="telegramNotifications = !telegramNotifications"
          />

          <checkbox-custom
            default-type
            :checked="pushNotifications"
            :text="$t('arbitrage_filter_checkbox_push')"
            @click="pushNotifications = !pushNotifications"
          />
        </div>
      </div>
      <div
        v-if="authenticated"
        class="cards"
      >
        <arbitrage-card
          v-for="card in arbitrageService?.arbitrageList"
          :key="card.volume"
          :card="card"
        />
      </div>
      <div
        v-else
        class="arbitrage-page__text"
      >
        <div class="content">
          <h4>{{ pageText.heading }}</h4>
          <p>{{ pageText.text }}</p>
          <div
            v-if="pageText.button_text"
            class="button-content"
          >
            <button-custom
              id="table"
              :value="pageText.button_text"
              @click="goToPage(pageText.button_method.page, pageText.button_method.query)"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
import { ArbitrageService } from '~/services/arbitrage/ArbitrageService.js'
import { FilterService } from '~/services/spreads/FilterService.js'
import { FilterPagination } from "~/models/FilterPagination.js";
import { SpreadsService } from "~/services/spreads/SpreadsService.js";

const { t } = useI18n({ useScope: 'global' })
const { authenticated } = storeToRefs(useAuthStore())
const telegramNotifications = ref(false)
const pushNotifications = ref(false)
const haveFilter = ref(false)
const isOpen = ref(false)
const filterButtonText = reactive({
  name: t('arbitrage_filter_button_text_name'),
  icon: ''
})
const pageText = reactive({
  heading: t('arbitrage_auth_text_heading'),
  text: t('arbitrage_auth_text_description'),
  button_text: t('arbitrage_auth_text_button'),
  button_method: { page: '/payment', query: {} }
})
watch(() => haveFilter, (newval) => {
  if (newval.value === true) {
    filterButtonText.name = t('arbitrage_filter_button_reset_text_name')
    filterButtonText.icon = 'close'
  } else {
    filterButtonText.name = t('arbitrage_filter_button_text_name')
    filterButtonText.icon = ''
  }
}, { immediate: true, deep: true })
watchEffect(() => {
  if (authenticated.value) {
    pageText.heading = t('arbitrage_auth_text_heading')
    pageText.text = t('arbitrage_auth_text_description')
    pageText.button_text = t('arbitrage_auth_text_button')
    pageText.button_method = { page: '/payment', query: {} }
  } else {
    pageText.heading = t('arbitrage_inactive_text_heading')
    pageText.text = t('arbitrage_inactive_text_description')
    pageText.button_text = t('arbitrage_inactive_text_button')
    pageText.button_method = { page: '/auth', query: { type: 'registration' } }
  }
})
const goToPage = async (page, query = {}) => {
  await navigateTo({
    path: page,
    query
  })
}

const arbitrageService = ref(null)

onMounted(() => {
  arbitrageService.value = new ArbitrageService()
})

let timeOutPair = null
const spreadsService = new SpreadsService()
const spreadsList = ref([])
const spreadsCount = ref(0)
const filterService = new FilterService(FilterPagination)
filterService.setDefaultLimit(10)
const SPLITTED_PAIR_FIRST_INDEX = 0

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

</script>

<style lang="scss">
.arbitrage-page {
  padding-top: 182px;
  padding-bottom: 120px;

  h2 {
    margin-bottom: 44px;
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

    &__content {
      margin-bottom: 4px;
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

          .selections {
            display: flex;
            gap: 2px;
          }
        }

        .filter-cryptocouple {
          .selection-first {
            width: 160px;

            .selection-custom__content {
              border-radius: 16px 0px 0px 16px;
            }
          }

          .selection-second {
            width: 160px;

            .selection-custom__content {
              border-radius: 0;
            }
          }
        }

        .filter-cryptoexchanges {
          .selection-custom {
            &__content {
              border-radius: 0;
            }
          }
        }

        .filter-income-and-notifications {
          display: flex;
          align-items: flex-end;
          gap: 2px;

          .notification-frequency {
            .selection-custom {
              width: 220px;

              &__content {
                border-radius: 0px 16px 16px 0px;
              }
            }
          }

          .profit-no-less {
            .input-custom {
              width: 160px;
              min-width: 160px;
              height: 44px;

              .input {
                @include text-md-mixin;
                width: 100%;
                height: 100%;
                border-radius: 0;
                padding: 0 12px;
              }
            }
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

  .cards {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__text {
    margin: 120px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .content {
      text-align: center;
      width: 570px;

      h4 {
        margin-bottom: 20px;
      }

      p {
        margin-bottom: 32px;
      }

      .button-content {
        display: flex;
        place-content: center;
      }
    }
  }
}

@media (max-width: 1360px) {
  .arbitrage-page {
    .filter {
      &__content {
        .filter-elements {
          .filter-cryptocouple {
            .selection-first {
              width: 120px;
            }

            .selection-second {
              width: 120px;
            }
          }

          .filter-cryptoexchanges {
            .selection-custom {
              width: 160px;
            }
          }

          .filter-income-and-notifications {
            .notification-frequency {
              .selection-custom {
                width: 160px;
              }
            }

            .profit-no-less {
              .input-custom {
                width: 160px;
                min-width: 160px;
              }
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
}

@media (max-width: 920px) {
  .arbitrage-page {
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
            .selection-first {
              width: 50%;

              .selection-custom__content {
                border-radius: 16px 0px 0px 16px;
              }
            }

            .selection-second {
              width: 50%;

              .selection-custom__content {
                border-radius: 0px 16px 16px 0px;
              }
            }
          }

          .filter-cryptoexchanges {
            .selection-custom {
              width: 100%;

              &__content {
                border-radius: 16px;
              }
            }
          }

          .filter-income-and-notifications {
            gap: 12px;

            .notification-frequency {
              width: 50%;

              .selection-custom {
                width: 100%;

                &__content {
                  border-radius: 16px;
                }
              }
            }

            .profit-no-less {
              width: 50%;

              .input-custom {
                width: 100%;
                min-width: 100%;

                .input {
                  border-radius: 16px;
                }
              }
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
}

@media (max-width: 720px) {
  .arbitrage-page {
    &__text {
      .content {
        width: 100%;
      }
    }
  }
}

@media (max-width: 520px) {
  .arbitrage-page {
    &__text {
      .content {
        p {
          @include text-md-mixin;
        }

        button {
          @include text-md-mixin;
        }
      }
    }
  }
}
</style>
