<template>
    <div class="login">
        <div class="login__info">
            <h2 class="title">
                Вход в аккаунт
            </h2>
            <span class="subtitle">Я новенький, <nuxt-link to="?type=registration">Регистрация</nuxt-link></span>
        </div>
        <div class="login__input">
            <input-custom
                v-model="loginForm.email"
                title="Email"
                placeholder="name@example.com"
                :i-error="v$.email.$error"
                :i-error-name="v$.email.email.$message"
                @change="v$.email.$touch"
            />
        </div>
        <div class="login__input">
            <input-custom
                v-model="loginForm.password"
                title="Пароль"
                placeholder="example_password"
                :i-error="v$.password.$error"
                :i-error-name="v$.password.minLength.$message"
                @change="v$.password.$touch"
            />
        </div>
        <div class="login__options">
            <checkbox-custom
                default-type
                text="Запомнить меня"
                :checked="isRememberMe"
                @click="isRememberSwitch()"
            />

            <nuxt-link
                class="forget-password-link"
                to="?type=forget-password"
            >
                Забыли пароль?
            </nuxt-link>
        </div>
        <div class="login__button">
            <button-custom
                class="big-h"
                value="Войти"
                @click="authLogin()"
            />
        </div>
        <notification-unit
            v-if="notificationSettings.isOpen"
            error
            :title="notificationSettings.title"
            :description="notificationSettings.description"
            @close="notificationSettings.isOpen = false"
        />
    </div>
</template>

<script setup>
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

const { authenticateUser } = useAuthStore()
const { authenticated } = storeToRefs(useAuthStore())
const router = useRouter()

const isRememberMeCookie = useCookie('irmcoinh')
const isRememberMe = ref(Boolean(isRememberMeCookie.value))

const loginForm = reactive({
  email: '',
  password: ''
})

const notificationSettings = reactive({
  isOpen: false,
  title: 'Неверные данные',
  description: 'Такого аккаунта не существует. Проверьте email и пароль.'
})

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Введите email', required),
      email: helpers.withMessage('Неверный формат почты', email)
    },
    password: {
      required: helpers.withMessage('Введите пароль', required),
      minLength: helpers.withMessage('Пароль должен содердать не менее 6 символов', minLength(6))
    }
  }
})

const v$ = useVuelidate(rules, loginForm)

const isRememberSwitch = () => {
  if (isRememberMe.value) {
    isRememberMe.value = !isRememberMe.value
    isRememberMeCookie.value = isRememberMe.value.toString()
  } else {
    isRememberMe.value = !isRememberMe.value
    isRememberMeCookie.value = isRememberMe.value.toString()
  }
}

const authLogin = async () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    await authenticateUser({ email: loginForm.email, password: loginForm.password }, isRememberMe.value)
    if (authenticated.value) {
      router.push('/')
    } else {
      notificationSettings.isOpen = true
    }
  }
}

</script>

<style lang="scss">
.login{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 32px;
    &__info{
        .subtitle{
            margin-top: 12px;
            color: var(--text-gray-dark)
        }
    }
    &__options{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    &__button{
        button{
            width: 384px;
        }
    }
}

@media (max-width: 720px) {
  .login{
    &__options{
        .forget-password-link{
            @include text-md-mixin;
            color: var(--link)
        }
    }
  }
}
</style>
