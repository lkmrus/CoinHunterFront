<template>
    <div
        class="registration"
    >
        <div class="registration__info">
            <h2 class="title">
                {{ $t('auth_registration_title') }}
            </h2>
            <span class="subtitle">
                {{ $t('auth_registration_subtitle_text') }}
                <nuxt-link to="?type=login">
                    {{ $t('auth_registration_subtitle_link') }}
                </nuxt-link>
            </span>
        </div>
        <div class="registration__input">
            <input-custom
                v-model="regitrationForm.fullname"
                :title="$t('form_name_title')"
                :placeholder="$t('form_name_placeholder')"
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
                password-type
                :title="$t('auth_registration_create_password_title')"
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
            />
        </div>
        <div class="registration__button">
            <button-custom
                class="big-h"
                :value="$t('auth_registration_button')"
                @click="authRegister()"
            />
        </div>
        <span class="registration__privacy-policy">
            {{ $t('auth_registration_privacy_policy_text') }}
            <nuxt-link to="#">
                {{ $t('auth_registration_privacy_policy_link') }}
            </nuxt-link>
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
        :title="$t('auth_registration_popup_success_title')"
        :description="$t('auth_registration_popup_success_description')"
    />
</template>

<script setup>
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
import { useUserStore } from '~/store/user'
const { t } = useI18n({ useScope: 'global' })

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
  title: t('auth_registration_notification_error_title'),
  description: t('auth_registration_notification_error_description')
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

const v$ = useVuelidate(rules, regitrationForm)

const authRegister = async () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    const regData = {
      fullname: regitrationForm.fullname,
      email: regitrationForm.email,
      password: regitrationForm.password
    }
    if (regitrationForm.login) {
      regData.login = regitrationForm.login
    }
    await userRegistration(regData)

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
