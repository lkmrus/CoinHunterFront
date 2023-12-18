<template>
    <div
        class="hint-unit"
        @click="goToUrl(`https://t.me/CurrencyScanner3000Bot`)"
    >
        <div class="hint-unit__text">
            Арбитражные связки с задержкой всего 2 секунды уже в нашем Telegram боте
        </div>
        <div class="hint-unit__telegram">
            <svg-icon icon="telegram" />
            <div class="desktop">
                Перейти
            </div>
            <div class="mobile">
                Перейти в Telegram бота
            </div>
        </div>
    </div>
</template>

<script setup>
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
