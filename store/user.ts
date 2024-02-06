import { defineStore } from 'pinia'

interface UserSettingsInterface {
  email?: string;
  password?: string;
  login?: string;
  fullname?: string;
  token: string;
}

interface UserTelegramAttachInterface {
    nick: string;
    token: string;
}

interface GetUserInterface {
    token: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: true,
    user: ''
  }),
  actions: {
    async getUser ({ token }: GetUserInterface, update = false) {
      const store = useUserStore()
      if (store.user && !update) { return store.user }
      const { data, pending }: any = await useFetch('/api/users/me', {
        method: 'post',
        headers: { Authorization: `Bearer ${token}` }
      })
      store.loading = pending
      store.user = toRaw(data.value)
      return store.user
    },
    async userSettings ({ email = '', password = '', login = '', fullname = '', token }: UserSettingsInterface) {
      const store = useUserStore()
      let success = true
      if (password) {
        const { pending, error }: any = await useFetch('/api/users/change_password', {
          method: 'post',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ password })
        })
        store.loading = pending
        if (error.value) { success = false }
      }
      if (email || login || fullname) {
        const { pending, error }: any = await useFetch('/api/users/change_profile', {
          method: 'post',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ email, login, fullname })
        })
        store.loading = pending
        if (error.value) { success = false }
      }
      return success
    },
    async userTelegramAttach ({ nick, token }: UserTelegramAttachInterface) {
      const store = useUserStore()
      const { data, pending }: any = await useFetch('/api/users/attach_chat', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nick })
      })
      store.loading = pending
      if (data.value) {
        store.telegramAttached = true
      }
    }
  }
})
