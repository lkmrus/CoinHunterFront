import { defineStore } from 'pinia'

interface UserLoginPayloadInterface {
  email: string;
  password: string;
}

interface UserRegistrationPayloadInterface {
  email: string;
  password: string;
  login?: string;
  fullname?: string;
  token?: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: true
  }),
  actions: {
    async authenticateUser ({ email, password }: UserLoginPayloadInterface, isRememberMe: boolean) {
      const store = useAuthStore()
      const { data, pending }: any = await useFetch('/api/auth/sign_in', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      store.loading = pending

      if (data.value) {
        if (!isRememberMe) {
          // sessionStorage.setItem('coinht', data?.value)
          const token = useCookie('coinht')
          token.value = data?.value
          store.authenticated = true
        } else {
          const token = useCookie('coinht')
          token.value = data?.value
          store.authenticated = true
        }
      }
    },
    async userRegistration ({ email, password, login = '', fullname = '', token = '' }: UserRegistrationPayloadInterface) {
      const store = useAuthStore()
      const { data, pending }: any = await useFetch('/api/auth/sign_up', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, login, fullname, token })
      })
      store.loading = pending
      if (data.value) {
        const token = useCookie('coinht')
        token.value = data?.value
        store.authenticated = true
      }
    },
    async logUserOut () {
      const store = useAuthStore()
      const token = await useCookie('coinht')
      if (token.value) {
        store.authenticated = false
        token.value = null
      } else if (process.client) {
        const sessiontoken = sessionStorage.getItem('coinht')
        if (sessiontoken) {
          store.authenticated = false
          sessionStorage.removeItem('coinht')
        }
      }
      return location.reload()
    }
  }
})
