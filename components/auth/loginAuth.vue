<template>
    <div class="login">
        <div class="login__info">
            <h2 class="title">
                {{ $t('auth_login_title') }}
            </h2>
            <span class="subtitle">
                {{ $t('auth_login_subtitle_text') }}
                <nuxt-link to="?type=registration">
                    {{ $t('auth_login_subtitle_link') }}
                </nuxt-link>
            </span>
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
                password-type
                :title="$t('form_password_title')"
                placeholder="example_password"
                :i-error="v$.password.$error"
                :i-error-name="v$.password.minLength.$message"
                @change="v$.password.$touch"
            />
        </div>
        <div class="login__options">
            <checkbox-custom
                default-type
                :text="$t('auth_login_form_checkbox')"
                :checked="isRememberMe"
                @click="isRememberSwitch()"
            />

            <nuxt-link
                class="forget-password-link"
                to="?type=forget-password"
            >
                {{ $t('auth_login_form_forget_passsword') }}
            </nuxt-link>
        </div>
        <div class="login__button">
            <button-custom
                class="big-h"
                :value="$t('auth_login_form_button')"
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
const { t } = useI18n({ useScope: 'global' })

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
  title: t('auth_login_notification_error_title'),
  description: t('auth_login_notification_error_description')
})

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(t('form_email_helper_required_text'), required),
      email: helpers.withMessage(t('form_email_helper_text'), email)
    },
    password: {
      required: helpers.withMessage(t('form_password_helper_required_text'), required),
      minLength: helpers.withMessage(t('form_password_helper_text'), minLength(6))
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
    &__input{
      position: relative;
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
