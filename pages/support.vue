<template>
    <div class="support">
        <section class="any-questions">
            <div class="blurs">
                <div class="blurs__content">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                </div>
            </div>
            <h1>{{ $t('index_any_questions_title') }}</h1>
            <h2>{{ $t('index_any_questions_subtitle') }}</h2>
            <form
                class="form"
            >
                <div class="form-item">
                    <input-custom
                        v-model="questionForm.name"
                        :title="$t('index_any_questions_name')"
                        :placeholder="$t('index_any_questions_name_placeholder')"
                        :i-error="v$.name.$error"
                        :i-error-name="v$.name.minLength.$message"
                    />
                </div>
                <div class="form-item">
                    <input-custom
                        v-model="questionForm.email"
                        title="Email"
                        placeholder="name@example.com"
                        :i-error="v$.email.$error"
                        :i-error-name="v$.email.email.$message"
                        @change="v$.email.$touch"
                    />
                </div>
                <div class="textarea form-item">
                    <div class="textarea__title">
                        {{ $t('index_any_questions_question') }}
                    </div>
                    <textarea
                        v-model="questionForm.question"
                        :class="{'error': v$.question.$error }"
                        :placeholder="$t('index_any_questions_question_placeholder')"
                    />
                    <div
                        v-if="v$.question.$error"
                        class="input-error"
                    >
                        {{ v$.question.required.$message }}
                    </div>
                </div>
                <button-custom
                    class="big-h"
                    :value="$t('index_any_questions_button')"
                    @click="sendMail()"
                />
            </form>
            <img
                class="question-robot"
                src="@/assets/img/question-robot.png"
                alt="question-robot"
            >
        </section>
        <popup-sending
            id="popup-sending"
            :title="$t('index_success_form_title')"
            :description="$t('index_success_form_description')"
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
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'

const { vueApp } = useNuxtApp()
const config = useRuntimeConfig()
const { t, locale } = useI18n({ useScope: 'global' })

vueApp.use(VueReCaptcha, {
  siteKey: config.public.recaptchaKey,
  loaderOptions: {
    autoHideBadge: true,
    renderParameters: {
      hl: locale.value
    }
  }
})

const recaptchaInstance = useReCaptcha()
const questionForm = reactive({
  name: '',
  email: '',
  question: ''
})

const questionRules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(t('form_email_helper_required_text'), required),
      minLength: helpers.withMessage(t('form_name_helper_text'), minLength(3))
    },
    email: {
      required: helpers.withMessage(t('form_email_helper_required_text'), required),
      email: helpers.withMessage(t('form_email_helper_text'), email)
    },
    question: {
      required: helpers.withMessage(t('form_question_helper_required_text'), required)
    }
  }
})

const v$ = useVuelidate(questionRules, questionForm)

const sendMail = async () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    await recaptchaInstance?.recaptchaLoaded()

    const token = await recaptchaInstance?.executeRecaptcha('LOGIN')
    const { error } = await useFetch('/api/users/question', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: questionForm.email,
        name: questionForm.name,
        text: questionForm.question,
        token
      })
    })
    if (error.value) {
      notificationSettings.isOpen = true
    } else {
      switchPopup(true)
    }
  }
}

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
  title: t('index_notification_settings_error_title'),
  description: t('index_notification_settings_error_description')
})
</script>

<style lang="scss">
.support{
    margin-top: 212px;
    margin-bottom: 126px;
    .blurs{
        width: 100%;
        &__content{
            position: relative;
            .blur-1{
                position: absolute;
                width: 50%;
                height: calc(100vh / 3);
                border-radius: 759.739px;
                background: #A9F9FF;
                filter: blur(150px);
                z-index: 3;
            }
            .blur-2{
                position: absolute;
                width: 80%;
                height: calc(100vh / 2);
                border-radius: 1135.506px;
                background: #4966FF;
                filter: blur(150px);
                z-index: 2;
            }
            .blur-3{
                position: absolute;
                width: 110%;
                height: calc(100vh / 1.5);
                border-radius: 1741px;
                background: rgba(230, 73, 255, 0.40);
                filter: blur(200px);
                z-index: 1;
            }
        }
    }
    .any-questions{
        margin-bottom: 120px;
        position: relative;
        padding-top: 100px;
        .blurs{
            position: absolute;
            right: -65%;
            top: 20%;
        }
        h1, h2{
            position: relative;
            z-index: 5;
        }
        h2{
            margin-bottom: 32px;
            color: var(--text-gray-light);
        }
        .form{
            position: relative;
            width: 588px;
            z-index: 5;
            .form-item{
                margin-bottom: 32px;
            }
            .input-custom{
                width: 100%;
            }
            .textarea{
                &__title{
                    @include h5-mixin;
                    margin-bottom: 16px;
                }
                textarea{
                    @include text-mixin;
                    width: 100%;
                    height: 140px;
                    border: 0;
                    border-radius: 16px;
                    background: var(--bg-dark-blue);
                    resize: none;
                    padding: 16px;
                    font-family: var(--font-family);
                    z-index: 5;
                    &::placeholder{
                        text-align: left;
                        color: var(--text-gray-dark);
                    }
                    &.focused, &.active{
                        padding: 0 16px;
                        &::placeholder{
                            text-align: left;
                        }
                    }
                    &.error{
                        border: 1px solid var(--error);
                    }
                }
            }
            .button{
                z-index: 5;
                width: 384px;
            }
        }
        .question-robot{
            z-index: 4;
            padding: 0 calc(50% - 600px);
            position: absolute;
            right: -180px;
            top: 140px;
        }
    }
}

@media (max-width: 1360px) {
    .support{
        .any-questions{
            .question-robot{
                top: 40px;
            }
        }
    }
}

@media (max-width: 920px) {
    .support{
        .any-questions{
            .form{
                width: 100%;
            }
            .question-robot{
                display: none;
            }
        }
    }
}

@media (max-width: 720px) {
    .support{
        .any-questions{
            .form{
                .input-custom{
                    min-width: auto;
                }
                .button{
                    width: 100%;
                }
            }
        }
    }
}

</style>
