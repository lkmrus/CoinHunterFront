<template>
  <div
    v-if="token && !attached"
    class="hint-unit"
    @click="goToUrl(`https://t.me/CurrencyScanner3000Bot${userParam}`)"
  >
    <div class="hint-unit__text">
      {{ $t('hint_unit_text') }}
    </div>
    <div class="hint-unit__telegram">
      <svg-icon icon="telegram" />
      <div class="desktop">
        {{ $t('hint_unit_tg_desktop') }}
      </div>
      <div class="mobile">
        {{ $t('hint_unit_tg_mobile') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user'

const token = useCookie('coinht')
const { getUser } = useUserStore()

const user = ref({})
const userParam = computed(() => user?.value.login ? `?start=${user.value.login}` : '')
const attached = computed(() => !!user.value?.chats?.length)

const goToUrl = async (url) => {
  await navigateTo(url, {
    external: true,
    open: {
      target: '_blank',
      windowFeatures: {
        width: 500,
        height: 500
      }
    }
  })
}

onBeforeMount(async () => {
  user.value = await getUser({ token: token.value })
})
</script>

<style lang="scss" scoped>
.hint-unit{
    cursor: pointer;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-blue-light);
    width: 100%;
    height: 44px;
    z-index: 2000;
    &__text{
        @include text-md-mixin;
        margin-right: 32px;
    }
    &__telegram{
        display: flex;
        align-items: center;
        @include text-mixin;
        .mobile{
            display: none;
        }
        .svg{
            margin-right: 8px;
        }
    }
}

@media (max-width: 920px) {
    .hint-unit{
        &__text{
            display: none;
        }
        &__telegram{
            .desktop{
                display: none;
            }
            .mobile{
                display: block;
            }
        }
    }
}
</style>
