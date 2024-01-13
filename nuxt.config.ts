import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [{
        name: 'Content-Security-Policy',
        content: 'This is my page description.'
      }]
    }
  },
  typescript: {
    typeCheck: true
  },
  pages: true,
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/eslint-module',
    'nuxt-security',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt'
  ],
  i18n: {
    lazy: true,
    langDir: './locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      cookieCrossOrigin: true
    },
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru-RU.json' },
      { code: 'en', name: 'English', file: 'en-US.json' }
    ]
  },
  css: ['@/assets/css/style.scss'],
  plugins: [],
  alias: {
    '@svg': fileURLToPath(new URL('./assets/svg', import.meta.url)),
    '@css': fileURLToPath(new URL('./assets/css', import.meta.url)),
    '@img': fileURLToPath(new URL('./assets/img', import.meta.url))
  },
  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: true,
          additionalData: `
            @use "@/assets/css/mixins/text.scss" as *;
          `
        }
      }
    }
  },
  routeRules: {
    '/api/**': { proxy: { to: process.env.NUXT_BASE_API_URL || 'http://0.0.0.0:3010/**' } }
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none'
    }
  },
  components: [
    { global: true, path: '~/components', pathPrefix: false }
  ],
  runtimeConfig: {
    public: {
      recaptchaKey: process.env.NUXT_RECAPTCHA_SITE_KEY
    }
  }
})
