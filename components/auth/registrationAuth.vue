<template>
    <div
        class="registration"
    >
        <div class="registration__info">
            <h2 class="title">
                Регистрация
            </h2>
            <span class="subtitle">У меня уже есть аккаунт, <nuxt-link to="?type=login">Войти</nuxt-link></span>
        </div>
        <div class="registration__input">
            <input-custom
                v-model="regitrationForm.fullname"
                title="Имя"
                placeholder="Как к вам обращаться"
            />
        </div>
        <div class="registration__input">
            <input-custom
                v-model="regitrationForm.email"
                title="Email"
                placeholder="name@example.com"
                :i-error="v$.email.$error"
                :i-error-name="v$.email.email.$message"
                @change="v$.email.$touch"
            />
        </div>
        <div class="registration__input">
            <input-custom
                v-model="regitrationForm.password"
                title="Создайте пароль"
                placeholder="example_password"
                :i-error="v$.password.$error"
                :i-error-name="v$.password.minLength.$message"
                @change="v$.password.$touch"
            />
        </div>
        <div class="registration__input">
            <input-custom
                v-model="regitrationForm.login"
                title="Telegram ID"
                placeholder="@example"
                :i-error="v$.login.$error"
                :i-error-name="v$.login.minLength.$message"
                @change="v$.login.$touch"
            />
        </div>
        <div class="registration__button">
            <button-custom
                class="big-h"
                value="Зарегистрироваться"
                @click="authRegister()"
            />
        </div>
        <span class="registration__privacy-policy">
            Регистрируясь, вы принимаете нашу <nuxt-link to="#">политику конфиденциальности</nuxt-link>
        </span>
    </div>
    <notification-unit
        v-if="notificationSettings.isOpen"
        error
        :title="notificationSettings.title"
        :description="notificationSettings.description"
        @close="notificationSettings.isOpen = false"
    />
    <popup-notification
        id="popup-notification"
        type="success"
        title="Вы успешно создали аккаунт"
        description="Через 5 секунд вы будете автоматически перенаправлены в личный кабинет"
    />
</template>

<script setup>
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
import { useUserStore } from '~/store/user'

const { userRegistration } = useAuthStore()

const { userTelegramAttach } = useUserStore()
const { authenticated } = storeToRefs(useAuthStore())

const switchPopup = () => {
  const popup = document.getElementById('popup-notification')
  const router = useRouter()
  if (popup) {
    popup.style.display = 'flex'
    setTimeout(() => {
      popup.style.opacity = '1'
      setTimeout(() => {
        router.push('/account')
      }, 5000)
    }, 200)
  }
}

const regitrationForm = reactive({
  fullname: '',
  email: '',
  password: '',
  login: ''
})

const notificationSettings = reactive({
  isOpen: false,
  title: 'Неверные данные',
  description: 'Проверьте введенные данные.'
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
    },
    login: {
      required: helpers.withMessage('Введите ваш telegram ID', required),
      minLength: helpers.withMessage('Telegram должен содердать не менее 3 символов', minLength(3))
    }
  }
})

const v$ = useVuelidate(rules, regitrationForm)

const authRegister = async () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    await userRegistration({
      fullname: regitrationForm.fullname,
      email: regitrationForm.email,
      password: regitrationForm.password,
      login: regitrationForm.login
    })
    if (authenticated.value) {
      if (regitrationForm.login) {
        await userTelegramAttach({ nick: regitrationForm.login, token: authenticated.value })
      }
      switchPopup()
    } else {
      notificationSettings.isOpen = true
    }
  }
}
</script>

<style lang="scss">
.registration{
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
    &__privacy-policy{
        @include text-md-mixin;
        color: var(--text-gray-dark)
    }
    &__input{
      position: relative;
      .button{
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 10;
        }
    }
    &__button_mobile{
      display: none;
    }
}

@media (max-width: 1210px) {
    .registration{
        &__input{
          width: 95%;
          .input-custom{
            width: 100%;
          }
        }
    }
}

@media (max-width: 920px) {
}

@media (max-width: 720px) {
    .registration{
        &__input{
            width: 100%;
            .input-custom{
                width: 100%;
            }
        }
        &__button_mobile{
          display: block;
        }
    }
}
</style>
