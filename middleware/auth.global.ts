import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive
  const token = useCookie('coinht') // get token from cookies
  if (token.value) {
    authenticated.value = true
  }

  // if token exists and url is /auth redirect to homepage
  if (token.value && to?.name === 'auth') { return navigateTo('/') }
  if (!token.value && to?.name === 'account') { return navigateTo('/') }
})
