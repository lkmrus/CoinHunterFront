<template>
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
</template>

<script setup>

let activePageLayout = 'no-footer-layout'

definePageMeta({
  layout: 'no-footer-layout'
})

const route = useRoute()
let queryValue = route.query.type
watch(
  () => route.query.type,
  (newValue) => {
    if (newValue) {
      queryValue = newValue
    } else {
      queryValue = ''
    }
  }
)

onMounted(() => {
  if (process.client) {
    if (window.innerWidth <= 920) {
      setPageLayout('default')
      activePageLayout = 'default'
    }
    window.addEventListener('resize', (e) => {
      const width = e.target.innerWidth
      if (width <= 920 && activePageLayout !== 'default') {
        setPageLayout('default')
        activePageLayout = 'default'
      } else if (activePageLayout !== 'no-footer-layout') {
        setPageLayout('no-footer-layout')
        activePageLayout = 'no-footer-layout'
      }
    })
  }
})

</script>
<style lang="scss">
.auth-page{
  padding-top: 68px;
  position: relative;
    display: flex;
    &__left-content{
        width: 50%;
        height: 100vh;
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
