<template>
  <div>
    <NuxtLayout :name="activePageLayout">
      <div class="auth-page">
        <div class="auth-page__left-content">
          <img
            src="@/assets/img/auth-background-high.png"
            alt="user1"
          >
        </div>
        <div class="auth-page__right-content">
          <registration-auth
            v-if="queryValue == 'registration'"
          />
          <forget-password-auth
            v-else-if="queryValue == 'forget-password'"
          />
          <login-auth
            v-else
          />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const route = useRoute()
const queryValue = computed(() => route.query.type)
const activePageLayout = ref('no-footer-layout')

const handleWindowResize = (e) => {
  const width = e.target.innerWidth

  if (width <= 920) {
    if (activePageLayout.value !== 'default') {
      activePageLayout.value = 'default'
    }

    return
  }

  if (activePageLayout.value !== 'no-footer-layout') {
    activePageLayout.value = 'no-footer-layout'
  }
}

onMounted(() => {
  if (process.client) {
    if (window.innerWidth <= 920) {
      activePageLayout.value = 'default'
    }

    window.addEventListener('resize', handleWindowResize)
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', handleWindowResize)
  }
})

</script>
<style lang="scss">
.auth-page{
  $header-height: 68px;

  padding-top: 68px;
  position: relative;
    display: flex;
    &__left-content{
        width: 50%;
        height: calc(100vh - $header-height);
        img{
          width: 100%;
          height: 100%;
        }
    }
    &__right-content{
        width: 50%;
        display: flex;
        align-items: center;
        padding-left: 52px;
    }
}

@media (max-width: 920px) {
  .auth-page{
      padding: 0 calc(50% - 322px);
      &__left-content{
        display: none;
      }
      &__right-content{
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
      }
  }
  .login, .registration, .forget-password{
    margin-top: 152px;
  }

}

@media (max-width: 720px) {
  .auth-page{
      padding: 0 16px;
  }
  .login, .registration, .forget-password{
    width: 100%;
    &__info{
        width: 100%;
        .title{
          font-size: 32px;
        }
    }
    &__input{
      width: 100%;
      .input-custom{
          width: 100%;
      }
      }
    &__button{
      width: 100%;
      button{
          width: 100%
      }
    }
  }
}
</style>
