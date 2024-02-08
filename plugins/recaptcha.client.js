import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin(({ vueApp }) => {
  const {
    public: { recaptchaKey: siteKey }
  } = useRuntimeConfig()

  vueApp.use(VueReCaptcha, {
    siteKey,
    loaderOptions: {
      autoHideBadge: true,
      renderParameters: {
        hl: 'en'
      }
    }
  })
})
