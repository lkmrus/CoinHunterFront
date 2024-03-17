<template>
  <form @submit.prevent="submit">
    <div class="forget-password">
      <div class="forget-password__info">
        <h2 class="title">
          {{ $t('auth_forget_password_title') }}
        </h2>
        <span class="subtitle">{{ $t('auth_forget_password_subtitle') }}</span>
      </div>
      <div class="forget-password__input">
        <input-custom
          v-model="emailPrimary"
          title="Email"
          :disabled="codeSent"
          placeholder="name@example.com"
        />
      </div>
      <div
        v-if="codeSent"
        class="forget-password__input"
      >
        <input-custom
          v-model="renewPasswordPayload.code"
          :title="$t('auth_forget_form_code_title')"
          placeholder="1234"
        />
      </div>
      <div
        v-if="codeSent"
        class="forget-password__input"
      >
        <input-custom
          v-model="renewPasswordPayload.password"
          :title="$t('auth_forget_form_password_title')"
          password-type
          :i-error="v$.password.$error"
          :i-error-name="v$.password.minLength.$message"
          type="password"
        />
      </div>
      <div class="forget-password__button">
        <button-custom
          v-if="!codeSent"
          class="big-h"
          :value="$t('auth_forget_button')"
          :disabled="codeSent"
          @click="requestCode"
        />
        <button-custom
          v-else
          class="big-h"
          :value="$t('auth_confirm_button')"
          type="submit"
          @click="renewPassword"
        />
      </div>
      <notification-unit
        v-if="notificationEmailSettings.isOpen"
        error
        :title="notificationEmailSettings.title"
        :description="notificationEmailSettings.description"
        @close="notificationEmailSettings.isOpen = false"
      />
      <notification-unit
        v-if="notificationCodeSettings.isOpen"
        error
        :title="notificationCodeSettings.title"
        :description="notificationCodeSettings.description"
        @close="notificationCodeSettings.isOpen = false"
      />
    </div>
  </form>
</template>

<script setup>
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const TIMEOUT_DELAY = 1000 * 60 * 3

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const codeSent = ref(false)
const emailPrimary = ref('')
const timeoutId = ref()

const renewPasswordPayload = reactive({
  email: '',
  code: '',
  password: ''
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

const v$ = useVuelidate(rules, renewPasswordPayload)

const notificationEmailSettings = reactive({
  isOpen: false,
  title: t('auth_notification_error_title'),
  description: t('auth_notification_error_email_description')
})
const notificationCodeSettings = reactive({
  isOpen: false,
  title: t('auth_notification_error_title'),
  description: t('auth_notification_error_code_description')
})

const resetSentCode = () => {
  emailPrimary.value = ''
  codeSent.value = false
  renewPasswordPayload.email = ''
  renewPasswordPayload.code = ''
  renewPasswordPayload.password = ''
}

const requestCode = async () => {
  const sentOnEmail = emailPrimary.value
  const payload = {
    email: sentOnEmail
  }

  const { error } = await useFetch('/api/users/request_email_recovery', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (error.value) {
    notificationEmailSettings.isOpen = true

    return
  }

  renewPasswordPayload.email = sentOnEmail
  codeSent.value = true
  timeoutId.value = setTimeout(resetSentCode, TIMEOUT_DELAY)
}

const renewPassword = async () => {
  const payload = renewPasswordPayload

  const { error } = await useFetch('/api/users/email_recovery', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (error.value) {
    notificationCodeSettings.isOpen = true

    return
  }

  router.push('/auth')
}

onBeforeUnmount(() => {
  clearTimeout(timeoutId.value)
})
</script>

<style lang="scss">
.forget-password{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 32px;
    &__info{
        width: 548px;
        .subtitle{
            margin-top: 12px;
            color: var(--text-gray-dark)
        }
    }
    &__button{
        button{
            width: 384px;
        }
    }
}
</style>
