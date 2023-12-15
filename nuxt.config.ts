import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
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
    'nuxt-swiper'
  ],
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
    '/api/**': { proxy: { to: 'http://78.140.137.106:3000/**' } }
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none'
    }
  },
  components: [
    { global: true, path: '~/components', pathPrefix: false }
  ]
})
