import { useAuthStore } from '~/store/auth'
import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive
  const { getUser } = useUserStore()
  const token = useCookie('coinht') // get token from cookies
  const user = await getUser({ token: token.value })
  if (user) {
    authenticated.value = true
  } else {
    authenticated.value = false
  }

  // if token exists and url is /auth redirect to homepage
  if (user && to?.name === 'auth') { return navigateTo('/') }
  if (!user && to?.name === 'account') { return navigateTo('/') }
})
