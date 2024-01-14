<template>
    <NuxtLayout name="no-footer-layout">
        <div class="error">
            <div class="error__content">
                <div class="error__code">
                    404
                </div>
                <div class="error__text">
                    {{ $t('404_error_text') }}
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
definePageMeta({
  layout: 'default'
})
</script>
<style lang="scss" scoped>
.error {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url(assets/img/astronaut.png), url(assets/img/gradient-404-lt.png),
    url(assets/img/gradient-404-rb.png);
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: top 68px left, top 68px left, right bottom;

  &__content {
    max-width: 516px;
    margin: 16px;
  }

  &__code {
    font-family: Inter;
    font-size: 200px;
    font-weight: 900;
    line-height: 240px;
    letter-spacing: -4px;
    text-align: center;
  }

  &__text {
    font-family: Inter;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;
    margin-top: 4px;
  }

  @media (max-width: 560px) {
    &__code {
      font-size: 112px;
      line-height: 134.4px;
    }

    &__text {
      font-size: 16px;
      line-height: 22.4px;
    }
  }
  @media (max-width: 360px) {
    background-image: url(assets/img/astronaut-small.png), url(assets/img/gradient-404-lt-small.png),
    url(assets/img/gradient-404-rb-small.png);
    background-position: top 68px left, top left, right bottom;
  }

}
</style>