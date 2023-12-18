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
            Личный кабинет
        </h2>
        <div class="account-page__input">
            <input-custom
                v-model="editableUser.fullname"
                title="Имя"
                placeholder="Как к вам обращаться"
            />
        </div>
        <div class="account-page__input">
            <input-custom
                v-model="editableUser.email"
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
                title="Пароль"
                placeholder="example_password"
                :i-error="passwordv$.password.$error"
                :i-error-name="passwordv$.password.minLength.$message"
                @change="passwordv$.password.$touch"
            />
        </div>
        <div class="account-page__input account-page__input_telegram">
            <input-custom
                v-model="editableUser.login"
                title="Telegram ID"
                placeholder="@example"
            />
            <button-custom
                class="big-h"
                value="Привязать"
                @click="goToUrl(`https://t.me/CurrencyScanner3000Bot?start=${editableUser.login}`)"
            />
        </div>
        <div class="account-page__subscription">
            <h5 class="title">
                Премиум подписка
            </h5>
            <div
                v-if="editableUser.paidUpToDate"
                class="status status_active"
            >
                Подписка премиум активна до {{ editableUser.paidUpToDate }}
            </div>
            <div
                v-else
                class="status"
            >
                Подписка не активна
                <div class="status__pay">
                    <button-custom
                        class="big-h"
                        value="Оплатить"
                        @click="goToPage('/payment')"
                    />
                </div>
            </div>
        </div>
        <div class="account-page__buttons">
            <div class="pay-mobile">
                <button-custom
                    class="big-h"
                    value="Привязать Telegram"
                    @click="goToUrl(`https://t.me/CurrencyScanner3000Bot?start=${editableUser.login}`)"
                />
                <button-custom
                    class="big-h"
                    value="Оплатить"
                    @click="goToPage('/payment')"
                />
            </div>
            <div class="save">
                <button-custom
                    class="big-h"
                    value="Сохранить изменения"
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
            title="Данные успешно изменены"
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
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useUserStore } from '~/store/user'

const { userSettings, userTelegramAttach, getUser } = useUserStore()
const token = useCookie('coinht')

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
  title: 'Не удалось изменить данные',
  description: `Непридвиденные обстоятельства могут подкарауливать нас всех.
                Пожалуйста, попробуйте отправить запрос на изменение данных ещё раз и проверьте
                свое интернет-соединение.`
})

const user = await getUser({ token: token.value })

const editableUser = reactive({ ...user })

const passwordForm = reactive({
  password: ''
})

const userRules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Введите email', required),
      email: helpers.withMessage('Неверный формат почты', email)
    }
  }
})

const passwordRules = computed(() => {
  return {
    password: {
      required: helpers.withMessage('Введите пароль', required),
      minLength: helpers.withMessage('Пароль должен содердать не менее 6 символов', minLength(6))
    }
  }
})

const userv$ = useVuelidate(userRules, editableUser)
const passwordv$ = useVuelidate(passwordRules, passwordForm)

const saveSettings = async () => {
  userv$.value.$validate()
  if (!userv$.value.$error) {
    const save = await userSettings({
      email: editableUser.email,
      login: editableUser.login,
      fullname: editableUser.fullname,
      token: token.value
    })
    if (save) {
      switchPopup(true)
    } else {
      notificationSettings.isOpen = true
    }
  }
  if (passwordForm.password) {
    passwordv$.value.$validate()
    if (!passwordv$.value.$error) {
      await userSettings({
        password: passwordForm.password, token: token.value
      })
    }
  }
  if (editableUser.telegram) {
    await userTelegramAttach({ nick: editableUser.telegram, token: token.value })
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

<style lang="scss">
.account-page{
    margin-top: 182px;
    position: relative;
    margin-bottom: 60px;
    padding: 0 calc(50% - 600px);
    display: flex;
    flex-direction: column;
    gap: 32px;
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
            height: 60px;
            border-radius: 16px 32px 32px 16px;
            background: var(--bg-dark-blue);
            padding:16px 16px;
            padding-right: 0;
            color: var(--error);
            &_active{
                border-radius: 16px;
                color: #32D583
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

footer{
    display: none;
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

    footer{
        display: block;
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
