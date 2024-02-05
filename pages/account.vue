<template>
    <div class="account-page">
        <div class="blurs">
            <div class="blurs__content">
                <div class="blur blur-1" />
                <div class="blur blur-2" />
                <div class="blur blur-3" />
            </div>
        </div>
        <h2 class="account-page__title">
            {{ $t('account_title') }}
        </h2>
        <div class="account-page__input">
            <input-custom
                v-model="editableUser.fullname"
                :title="$t('form_name_title')"
                :placeholder="$t('form_name_placeholder')"
            />
        </div>
        <div class="account-page__input">
            <input-custom
                v-model="editableUser.email"
                disabled
                title="Email"
                placeholder="name@example.com"
                :i-error="userv$.email.$error"
                :i-error-name="userv$.email.email.$message"
                @change="userv$.email.$touch"
            />
        </div>
        <div class="account-page__input">
            <input-custom
                v-model="passwordForm.password"
                password-type
                :title="$t('form_password_title')"
                placeholder="example_password"
                :i-error="passwordv$.password.$error"
                :i-error-name="passwordv$.password.minLength.$message"
                @change="passwordv$.password.$touch"
            />
        </div>
        <div class="account-page__input">
            <input-custom
                v-model="passwordForm.repeatPassword"
                password-type
                :title="$t('form_repeat_password_title')"
                placeholder="example_password"
                :i-error="passwordv$.repeatPassword.$error"
                :i-error-name="
                    passwordv$.repeatPassword.$errors[0] ? passwordv$.repeatPassword.$errors[0].$message : ''
                "
                @change="passwordv$.repeatPassword.$touch"
            />
        </div>
        <!-- {{ passwordv$.repeatPassword.$errors[0].$message }} -->
        <div class="account-page__input account-page__input_telegram">
            <input-custom
                v-model="editableUser.login"
                title="Telegram ID"
                placeholder="@example"
            />
            <button-custom
                class="attach-description"
                :value="$t('account_add_telegram_button_name')"
                @click="goToUrl(`https://t.me/CurrencyScanner3000Bot?start=${editableUser.login}`)"
            />
        </div>
        <div class="account-page__subscription">
            <h5
                class="title"
                style="color:#ffd700;"
            >
                &#9733; {{ $t('account_subscription_title') }} &#9733;
            </h5>
            <div
                v-if="isSubscriptionActive"
                class="status status_active"
            >
                {{ $t('account_subscription_active_text') }} {{ subscriptionDate }}
            </div>
            <div
                v-else
                class="status"
            >
                {{ $t('account_subscription_inactive_text') }}
                <div class="status__pay">
                    <button-custom
                        class="big-h"
                        :value="$t('account_subscription_inactive_button')"
                        @click="goToPage('/payment')"
                    />
                </div>
            </div>
        </div>
        <div class="account-page__buttons">
            <div class="pay-mobile">
                <button-custom
                    class="big-h"
                    :value="$t('account_connect_telegram_button')"
                    @click="goToUrl(`https://t.me/CurrencyScanner3000Bot?start=${editableUser.login}`)"
                />
                <button-custom
                    class="big-h"
                    :value="$t('account_subscription_inactive_button')"
                    @click="goToPage('/payment')"
                />
            </div>
            <div class="save">
                <button-custom
                    :value="$t('account_save_settings')"
                    @click="saveSettings()"
                />
            </div>
        </div>
        <img
            class="bitcoin"
            src="@/assets/img/bitcoin.png"
            alt="bitcoin"
        >
        <popup-sending
            id="popup-sending"
            :title="$t('account_popup_success_title')"
            @close="switchPopup(false)"
        />
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
import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useUserStore } from '~/store/user'
const { t } = useI18n({ useScope: 'global' })

const { userSettings, userTelegramAttach, getUser } = useUserStore()
const token = useCookie('coinht')

let activePageLayout = 'no-footer-layout'

definePageMeta({
  layout: 'no-footer-layout'
})

onMounted(() => {
  if (process.client) {
    if (window.innerWidth <= 920) {
      setPageLayout('default')
      activePageLayout = 'default'
    }
    window.addEventListener('resize', (e) => {
      const width = e.target.innerWidth
      if (width <= 920 && activePageLayout !== 'default') {
        setPageLayout('default')
        activePageLayout = 'default'
      } else if (activePageLayout !== 'no-footer-layout') {
        setPageLayout('no-footer-layout')
        activePageLayout = 'no-footer-layout'
      }
    })
  }
})

const switchPopup = (show) => {
  const popup = document.getElementById('popup-sending')
  if (popup) {
    if (show) {
      popup.style.display = 'flex'
      setTimeout(() => {
        popup.style.opacity = '1'
      }, 200)
    } else {
      popup.style.opacity = '0'
      setTimeout(() => {
        popup.style.display = 'none'
      }, 200)
    }
  }
}

const notificationSettings = reactive({
  isOpen: false,
  title: t('account_notification_error_title'),
  description: t('account_notification_error_description')
})

const user = await getUser({ token: token.value })

const editableUser = reactive({ ...user })

const passwordForm = reactive({
  password: '',
  repeatPassword: ''
})

const subscription = computed(() => {
  for (const chat of editableUser.chats) {
    if (chat.paidUpToDate) {
      return chat.paidUpToDate
    }
  }
})

const subscriptionDate = computed(() => subscription.value
  ? (new Date(subscription.value)).toLocaleDateString()
  : ''
)
const isSubscriptionActive = computed(() => {
  if (!subscription.value) {
    return false
  }

  return subscription.value > Date.now()
})

const userRules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(t('form_email_helper_required_text'), required),
      email: helpers.withMessage(t('form_email_helper_text'), email)
    }
  }
})

const passwordRules = computed(() => {
  return {
    password: {
      required: helpers.withMessage(t('form_password_helper_required_text'), required),
      minLength: helpers.withMessage(t('form_password_helper_text'), minLength(6))
    },
    repeatPassword: {
      required: helpers.withMessage(t('form_password_helper_required_text'), required),
      minLength: helpers.withMessage(t('form_password_helper_text'), minLength(6)),
      sameAs: helpers.withMessage(t('form_password_helper_same_as_text'), sameAs(passwordForm.password))
    }
  }
})

const userv$ = useVuelidate(userRules, editableUser)
const passwordv$ = useVuelidate(passwordRules, passwordForm)

const saveSettings = async () => {
  let isSavedData = null
  let isSavedPassword = null
  userv$.value.$validate()
  if (passwordForm.password) { passwordv$.value.$validate() }
  if (
    !userv$.value.$error &&
    (editableUser.email !== user.email ||
    editableUser.login !== user.login ||
    editableUser.fullname !== user.fullname) &&
    ((passwordForm.password && !passwordv$.value.$error) || !passwordForm.password)
  ) {
    isSavedData = await userSettings({
      email: editableUser.email,
      login: editableUser.login,
      fullname: editableUser.fullname,
      token: token.value
    })
  }
  if (
    passwordForm.password &&
    ((
      (editableUser.email !== user.email ||
      editableUser.login !== user.login ||
      editableUser.fullname !== user.fullname) &&
      !userv$.value.$error
    ) || (
      editableUser.email === user.email &&
      editableUser.login === user.login &&
      editableUser.fullname === user.fullname
    ))
  ) {
    if (!passwordv$.value.$error) {
      isSavedPassword = await userSettings({
        password: passwordForm.password, token: token.value
      })
    }
  }
  if (editableUser.telegram) {
    await userTelegramAttach({ nick: editableUser.telegram, token: token.value })
  }
  if (
    (isSavedData && isSavedPassword) ||
    (isSavedData && isSavedPassword === null) ||
    (isSavedPassword && isSavedData === null)
  ) {
    switchPopup(true)
  } else {
    notificationSettings.isOpen = true
  }
}

const goToUrl = async (url) => {
  await navigateTo(url, {
    external: true,
    open: {
      target: '_blank',
      windowFeatures: {
        width: 500,
        height: 500
      }
    }
  })
}

const goToPage = async (page, query = {}) => {
  await navigateTo({
    path: page,
    query
  })
}

</script>

<style lang="scss" scoped>
.attach-description:hover{
  &:after{
    content: "Instruction: \0a 1. Write your Telegram ID in the field.  \0a 2. Click 'Save changes' button. \0a 3. Click 'Attach' button. \0a 4. Click 'Start' button in the opened Telegram window. \0a 5. Done!";
    position: absolute;
    white-space: pre;
    text-align: left;
    top: 0;
    left: 130px;
    width: 220px;
    height: 100%;
    font-size: 12px;
    border-radius: 16px;
    z-index: 1;
    opacity: 0.8;
  }
}
.account-page{
    margin-top: 130px;
    position: relative;
    margin-bottom: 30px;
    padding: 0 calc(50% - 600px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    .blurs{
        width: 100%;
        position: absolute;
        top: 40%;
        right: -60%;
        &__content{
            position: relative;
            .blur-1{
                position: absolute;
                width: 50%;
                height: calc(100vh / 4);
                border-radius: 759.739px;
                background: #A9F9FF;
                filter: blur(150px);
                z-index: 3;
            }
            .blur-2{
                position: absolute;
                width: 80%;
                height: calc(100vh / 3);
                border-radius: 1135.506px;
                background: #4966FF;
                filter: blur(150px);
                z-index: 2;
            }
            .blur-3{
                position: absolute;
                width: 110%;
                height: calc(100vh / 2);
                border-radius: 1741px;
                background: rgba(230, 73, 255, 0.40);
                filter: blur(200px);
                z-index: 1;
            }
        }
    }
    &__subscription{
        .title{
            margin-bottom: 16px;
        }
        .status{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 548px;
            height: 50px;
            border-radius: 16px 32px 32px 16px;
            background: var(--bg-dark-blue);
            padding:16px 16px;
            padding-right: 0;
            color: var(--error);
            &_active{
                border-radius: 16px;
                color: #32D583
            }
            .button{
              height: 50px;
            }
        }
    }
    &__buttons{
        display: flex;
        flex-direction: column;
        gap: 20px;
        .pay-mobile{
            display: none;
        }
        button{
            width: 384px;
        }
    }
    .bitcoin{
        z-index: 4;
        position: absolute;
        width: 696px;
        height: 789px;
        top: 0px;
        right: 0px;
    }
    &__input{
        width: fit-content;
        position: relative;
        .button{
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 10;
            height: 50px;
        }
        &_telegram{
            .input-custom{
                .input{
                    border-top-right-radius: 32px;
                    border-bottom-right-radius: 32px;
                }
            }
        }
    }
}

@media (max-width: 1360px) {
    .account-page {
        padding: 0 calc(50% - 432px);
        .blurs{
            top: 40%;
            right: -75%;
        }
        .bitcoin{
            width: 550px;
            height: auto;
        }
    }
}

@media (max-width: 1260px) {
    .account-page {
        .blurs{
            top: 40%;
            right: -75%;
        }
        .bitcoin{
            top: 50px;
            right: -50px;
            width: 500px;
            height: auto;
        }
    }
}

@media (max-width: 1060px) {
    .account-page{
        .blurs{
            display: none;
        }
        .bitcoin{
            display: none;
        }
    }
}

@media (max-width: 920px) {
    .account-page{
        padding: 0 calc(50% - 322px);
        &__input{
            &_telegram{
                .button{
                    border-radius: 100px;
                    bottom: 8px;
                    right: 8px;
                }
            }
        }
        &__subscription{
            .status{
                &__pay{
                    margin-right: 8px;
                }
            }
        }
    }
}

@media (max-width: 720px) {
    .account-page{
        padding: 0 16px;
        &__input{
            width: 100%;
            .input-custom{
                width: 100%;
            }
            &_telegram{
                .button{
                    display: none;
                }
            }
        }
        &__subscription{
            .status{
                width: 100%;
                border-radius: 16px;
                &__pay{
                    display: none;
                }
            }
        }
        &__buttons{
            width: 100%;
            .pay-mobile{
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .save{
                button{
                    background: var(--bg-dark-blue);
                }
            }
            button{
                width: 100%;
            }
        }
    }
}
</style>
