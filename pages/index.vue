<template>
    <div class="home-page">
        <section class="service-section">
            <div class="blurs">
                <div class="blurs__content">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                </div>
            </div>
            <h1>{{ $t('index_service_title') }}</h1>
            <h2>{{ $t('index_service_subtitle') }}</h2>
            <nuxt-link to="/payment">
                <button-custom
                    class="big-h"
                    :value="$t('index_service_tariff_btn')"
                />
            </nuxt-link>
            <div class="progress">
                <div class="progress__item">
                    <p class="big-text">
                        30
                    </p>
                    <p class="description">
                        {{ $t('index_service_progress_item_1_description_1') }}
                    </p>
                </div>
                <div class="progress__item">
                    <p class="big-text">
                        10
                    </p>
                    <p class="description">
                        {{ $t('index_service_progress_item_2_description_1') }} <br>
                        {{ $t('index_service_progress_item_2_description_2') }}
                    </p>
                </div>
            </div>
            <img
                class="bitcoin"
                src="@/assets/img/bitcoin.png"
                alt="bitcoin"
            >
        </section>
        <section class="about-arbitration">
            <h1>
                {{ $t('index_arbitration_title_1') }} <br>
                {{ $t('index_arbitration_title_2') }}
            </h1>
            <h2>{{ $t('index_arbitration_subtitle') }}</h2>
            <div class="why-us">
                <div class="why-us__cripto">
                    <div class="cripto-item">
                        <div class="cripto-item__icons">
                            <div class="icon icon-ethereum">
                                <svg-icon icon="ethereum" />
                            </div>
                            <div class="icon icon-btc">
                                <svg-icon icon="btc" />
                            </div>
                        </div>
                        <div class="cripto-item__text">
                            <div class="currency">
                                ETH/<span>BTC</span>
                            </div>
                            <div class="name">
                                CoinHunterBot
                            </div>
                        </div>
                        <div class="cripto-item__success">
                            <svg-icon
                                class="line"
                                icon="success-line"
                            />
                            <div class="percentage">
                                15.8%
                            </div>
                            <div class="sum">
                                $376.87
                            </div>
                        </div>
                    </div>
                    <div class="cripto-item">
                        <div class="cripto-item__icons">
                            <div class="icon icon-btc">
                                <svg-icon icon="btc" />
                            </div>
                            <div class="icon icon-ton">
                                <svg-icon icon="ton-coin" />
                            </div>
                        </div>
                        <div class="cripto-item__text">
                            <div class="currency">
                                BTC/<span>USDT</span>
                            </div>
                            <div class="name">
                                CoinHunterBot
                            </div>
                        </div>
                        <div class="cripto-item__success">
                            <svg-icon
                                class="line"
                                icon="success-line"
                            />
                            <div class="percentage">
                                11.2%
                            </div>
                            <div class="sum">
                                $123.45
                            </div>
                        </div>
                    </div>
                </div>
                <div class="why-us__text">
                    <h4>
                        {{ $t('index_arbitration_why_us_title_1') }} <br>
                        {{ $t('index_arbitration_why_us_title_2') }}
                    </h4>
                    <p>
                        {{ $t('index_arbitration_why_us_description') }}
                    </p>
                </div>
            </div>
            <div class="key-benefits">
                <h2>{{ $t('index_arbitration_key_benefits_title') }}</h2>
                <p>
                    {{ $t('index_arbitration_key_benefits_description_1') }} <br>
                    {{ $t('index_arbitration_key_benefits_description_2') }}
                </p>
                <img
                    class="robot"
                    src="@/assets/img/robot.png"
                    alt="robot"
                >
            </div>
        </section>
        <section class="all-on-telegram">
            <div class="blurs">
                <div class="blurs__content">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                </div>
            </div>
            <h1>{{ $t('index_all_in_telegram_title') }}</h1>
            <h2>{{ $t('index_all_in_telegram_subtitle') }}</h2>
            <div class="grid">
                <div class="grid-item exchanges">
                    <div class="grid-item__name">
                        {{ $t('index_all_in_telegram_exchanges_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_all_in_telegram_exchanges_subtitle') }}
                    </div>
                    <div class="exchanges__items">
                        <svg-icon
                            v-for="exchangesitem in exchangesItems"
                            :key="`exchangesitem-${exchangesitem}`"
                            class="exchange-icon"
                            :icon="exchangesitem"
                            additional-folder="exchanges"
                        />
                    </div>
                </div>
                <div class="grid-item grid-item_blue filters">
                    <div class="grid-item__name">
                        {{ $t('index_all_in_telegram_card_1_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_all_in_telegram_card_1_subtitle_1') }} <br>
                        {{ $t('index_all_in_telegram_card_1_subtitle_2') }}
                    </div>
                    <img
                        src="@/assets/img/setting-iso.png"
                        alt="setting-iso"
                    >
                </div>
                <div class="grid-item speed">
                    <div class="grid-item__name">
                        {{ $t('index_all_in_telegram_card_2_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_all_in_telegram_card_2_subtitle_1') }}
                    </div>
                    <img
                        src="@/assets/img/speed-all-on-telegram.png"
                        alt="setting-iso"
                    >
                </div>
                <div class="grid-item adaptability">
                    <div class="grid-item__name">
                        {{ $t('index_all_in_telegram_card_3_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_all_in_telegram_card_3_subtitle_1') }} <br>
                        {{ $t('index_all_in_telegram_card_3_subtitle_2') }}
                    </div>
                    <div class="adaptability__items">
                        <img
                            src="@/assets/img/stack.png"
                            alt="stack"
                        >
                        <img
                            src="@/assets/img/stack2.png"
                            alt="stack2"
                        >
                    </div>
                </div>
                <div class="grid-item guide">
                    <div class="grid-item__name">
                        {{ $t('index_all_in_telegram_card_4_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_all_in_telegram_card_4_subtitle_1') }}
                    </div>
                    <img
                        src="@/assets/img/guide-all-on-telegram.png"
                        alt="setting-iso"
                    >
                </div>
                <div class="grid-item grid-item_blue connection">
                    <div class="grid-item__name">
                        {{ $t('index_all_in_telegram_card_5_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_all_in_telegram_card_5_subtitle_1') }} <br>
                        {{ $t('index_all_in_telegram_card_5_subtitle_2') }}
                    </div>
                </div>
            </div>
        </section>
        <section class="access-to-arbitrage">
            <div class="blurs blurs-1">
                <div class="blurs__content">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                </div>
            </div>
            <div class="blurs blurs-2">
                <div class="blurs__content">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                </div>
            </div>
            <div class="blurs blurs-3">
                <div class="blurs__content">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                </div>
            </div>
            <div class="blurs blurs-4">
                <div class="blurs__content">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                </div>
            </div>
            <h1>{{ $t('index_access_arbitrage_title') }}</h1>
            <h2>{{ $t('index_access_arbitrage_subtitle') }}</h2>
            <div class="tarifs">
                <div class="tarif start-tarif">
                    <div class="tarif__heading">
                        <div class="tarif__name">
                            {{ $t('index_access_arbitrage_tarif_1_name') }}
                        </div>
                    </div>
                    <div class="tarif__price">
                        {{ $t('index_access_arbitrage_tarif_1_price') }}
                    </div>
                    <div class="tarif__provides">
                        <div class="include-item provide-item">
                            <svg-icon icon="approve" />
                            {{ $t('index_access_arbitrage_tarif_1_provide_1_1') }}
                            <span>30</span>
                            {{ $t('index_access_arbitrage_tarif_1_provide_1_2') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon icon="approve" />
                            {{ $t('index_access_arbitrage_tarif_provide_2') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon icon="approve" />
                            {{ $t('index_access_arbitrage_tarif_provide_3') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon icon="approve" />
                            {{ $t('index_access_arbitrage_tarif_provide_4') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon icon="approve" />
                            {{ $t('index_access_arbitrage_tarif_provide_5') }}
                        </div>
                        <div class="exclude-item provide-item">
                            <svg-icon icon="exclude" />
                            {{ $t('index_access_arbitrage_tarif_provide_6') }}
                        </div>
                        <div class="exclude-item provide-item">
                            <svg-icon icon="exclude" />
                            {{ $t('index_access_arbitrage_tarif_provide_7') }}
                        </div>
                        <div class="exclude-item provide-item">
                            <svg-icon icon="exclude" />
                            {{ $t('index_access_arbitrage_tarif_provide_8') }}
                        </div>
                        <div class="exclude-item provide-item">
                            <svg-icon icon="exclude" />
                            {{ $t('index_access_arbitrage_tarif_provide_9') }}
                        </div>
                    </div>
                    <nuxt-link to="/auth?type=registration">
                        <button-custom
                            class="big-h"
                            :value="$t('index_access_arbitrage_tarif_1_button')"
                        />
                    </nuxt-link>
                </div>
                <div class="tarif premium-tarif">
                    <div class="tarif__heading">
                        <div class="tarif__name">
                            {{ $t('index_access_arbitrage_tarif_2_name') }}
                        </div>
                        <div class="tarif__badge">
                            {{ $t('index_access_arbitrage_tarif_2_badge') }}
                        </div>
                    </div>
                    <div class="tarif__price">
                        <span class="big">$20</span>
                        <span class="small"> {{ $t('index_access_arbitrage_tarif_2_price') }}</span>
                    </div>
                    <div class="tarif__provides">
                        <div class="include-item provide-item provide-item_blue">
                            <svg-icon
                                icon="approve"
                                fill="#0065FF"
                            />
                            {{ $t('index_access_arbitrage_tarif_2_provide_1') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon
                                icon="approve"
                                fill="#101127"
                            />
                            {{ $t('index_access_arbitrage_tarif_provide_2') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon
                                icon="approve"
                                fill="#101127"
                            />
                            {{ $t('index_access_arbitrage_tarif_provide_3') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon
                                icon="approve"
                                fill="#101127"
                            />
                            {{ $t('index_access_arbitrage_tarif_provide_4') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon
                                icon="approve"
                                fill="#101127"
                            />
                            {{ $t('index_access_arbitrage_tarif_provide_5') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon
                                icon="approve"
                                fill="#101127"
                            />
                            {{ $t('index_access_arbitrage_tarif_provide_6') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon
                                icon="approve"
                                fill="#101127"
                            />
                            {{ $t('index_access_arbitrage_tarif_provide_7') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon
                                icon="approve"
                                fill="#101127"
                            />
                            {{ $t('index_access_arbitrage_tarif_provide_8') }}
                        </div>
                        <div class="include-item provide-item">
                            <svg-icon
                                icon="approve"
                                fill="#101127"
                            />
                            {{ $t('index_access_arbitrage_tarif_provide_9') }}
                        </div>
                    </div>
                    <nuxt-link to="/payment">
                        <button-custom
                            dark-blue
                            class="big-h"
                            :value="$t('index_access_arbitrage_tarif_2_button')"
                        />
                    </nuxt-link>
                </div>
            </div>
        </section>
        <section class="how-bot-works">
            <div class="blurs">
                <div class="blurs__content">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                </div>
            </div>
            <h1>{{ $t('index_how_bot_works_title') }}</h1>
            <h2>{{ $t('index_how_bot_works_subtitle') }}</h2>
            <div class="grid">
                <div class="grid-item grid-item_blue security">
                    <div class="grid-item__name">
                        {{ $t('index_how_bot_works_card_1_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_how_bot_works_card_1_description_1') }} <br>
                        {{ $t('index_how_bot_works_card_1_description_2') }}
                    </div>
                </div>
                <div class="grid-item example">
                    <div class="grid-item__name">
                        {{ $t('index_how_bot_works_card_2_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_how_bot_works_card_2_description_1') }}
                        <br><br>
                        {{ $t('index_how_bot_works_card_2_description_2') }}
                    </div>
                    <img
                        src="@/assets/img/example-change.png"
                        alt="example-change"
                    >
                </div>
                <div class="grid-item opportunities">
                    <div class="grid-item__name">
                        {{ $t('index_how_bot_works_card_3_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_how_bot_works_card_3_description_1') }}
                    </div>
                </div>
                <div class="grid-item grid-item_blue advantages">
                    <div class="grid-item__name">
                        {{ $t('index_how_bot_works_card_4_title') }}
                    </div>
                    <div class="grid-item__description">
                        {{ $t('index_how_bot_works_card_4_description_1') }}
                    </div>
                    <button-custom
                        dark-blue
                        class="big-h"
                        :value="$t('index_how_bot_works_card_4_button')"
                        @click="startUsing()"
                    />
                    <img
                        class="star"
                        src="@/assets/img/star-silver.png"
                        alt="example-change"
                    >
                    <img
                        class="heart"
                        src="@/assets/img/heart-silver.png"
                        alt="example-change"
                    >
                    <img
                        class="chat"
                        src="@/assets/img/guide-all-on-telegram.png"
                        alt="example-change"
                    >
                </div>
            </div>
        </section>
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
        <section class="review-section">
            <div class="blurs">
                <div class="blurs__content">
                    <div class="blur blur-1" />
                    <div class="blur blur-2" />
                    <div class="blur blur-3" />
                </div>
            </div>
            <h1>{{ $t('index_review_title') }}</h1>
            <h2>{{ $t('index_review_subtitle') }}</h2>
            <swiper
                :modules="[SwiperAutoplay, SwiperEffectCreative]"
                :autoplay="{
                    delay: 1500,
                    disableOnInteraction: true,
                }"
                class="reviews"
                slides-per-view="auto"
                :loop="true"
                space-between="25"
            >
                <swiper-slide
                    v-for="slide in 10"
                    ref="swiperSlide"
                    :key="slide"
                >
                    <review-card />
                </swiper-slide>
            </swiper>
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
const { t } = useI18n({ useScope: 'global' })

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
    const { error } = await useFetch('/api/users/question', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: questionForm.email,
        name: questionForm.name,
        text: questionForm.question
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

const startUsing = () => {
  const token = useCookie('coinht')
  if (token.value) {
    navigateTo('/arbitrage', { replace: true })
  } else {
    navigateTo('/auth?type=registration', { replace: true })
  }
}

const notificationSettings = reactive({
  isOpen: false,
  title: t('index_notification_settings_error_title'),
  description: t('index_notification_settings_error_description')
})

const exchangesItems = reactive([
  'binance', 'bybit', 'hitbtc', 'kucoin', 'okx', 'exmo', 'huobi', 'poloniex', 'bittrex', 'bitget'
])
</script>

<style lang="scss">
.home-page{
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
    .service-section{
        margin-bottom: 120px;
        position: relative;
        h1,h2{
            position: relative;
            z-index: 5;
        }
        h2{
            margin-bottom: 32px;
            color: var(--text-gray-light);
        }
        .button{
            position: relative;
            margin-bottom: 20px;
            max-width: 384px;
            width: 100%;
            z-index: 5;
        }
        .progress{
            z-index: 5;
            position: relative;
            display: flex;
            gap: 48px;
            &__item{
                width: 360px;
                .description{
                    @include text-medium-mixin;
                    margin-top: -8px;
                }
            }
        }
        .bitcoin{
            z-index: 4;
            padding: 0 calc(50% - 600px);
            position: absolute;
            bottom: -200px;
            right: -100px;
        }
        .blurs{
            position: absolute;
            top: 30%;
            right: -50%;
        }
    }
    .about-arbitration{
        position: relative;
        margin-bottom: 120px;
        z-index: 5;
        h2{
            margin-bottom: 32px;
            color: var(--text-gray-light);
        }
        .why-us{
            margin-bottom: 60px;
            display: flex;
            align-items: center;
            gap: 24px;
            &__cripto{
                .cripto-item{
                    max-height: 94px;
                    width: fit-content;
                    display: flex;
                    align-items: center;
                    padding: 16px 12px;
                    border-radius: 16px;
                    background-color: var(--box-color);
                    &__icons{
                        margin-right: 16px;
                        .icon{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 42px;
                            height: 42px;
                            border-radius: 100%;
                            &:nth-child(1){
                                position: relative;
                                z-index: 2;
                            }
                            &:nth-child(2){
                                margin-left: 20px;
                                margin-top: -20px;
                                z-index: 1;
                            }
                        }
                        .icon-ethereum, .icon-ton{
                            background-color: #0047B3;
                        }
                        .icon-btc{
                            background-color: #6BA6FF;
                        }
                    }
                    &__text{
                        margin-right: 24px;
                        .currency{
                            @include text-medium-mixin;
                            span{
                                color: #62627E;
                            }
                        }
                        .name{
                            @include text-md-mixin;
                            color: #6BA6FF;
                        }
                    }
                    &__success{
                        .line{
                            margin-bottom: 8px;
                        }
                        .percentage{
                            @include text-md-mixin;
                            color: #12B76A;
                        }
                        .sum{
                            @include text-xs-mixin;
                            color: #62627E;
                        }
                    }
                    &:first-child{
                        margin-bottom: 16px;
                    }
                    &:last-child{
                        margin-left: 90px;
                    }
                }
            }
            &__text{
                h4{
                    margin-bottom: 20px;
                }
                p{
                    @include text-medium-mixin;
                    color: var(--text-gray-light);
                }
            }
        }
        .key-benefits{
            position: relative;
            background-color: var(--bg-blue);
            padding: 40px;
            border-radius: 32px;
            h2{
                margin-bottom: 6px;
                color: var(--text-color);
            }
            h2, p{
                position: relative;
                z-index: 2;
                max-width: 72%;
            }
            p{
                @include text-medium-mixin;
            }
            .robot{
                position: absolute;
                right: 0;
                bottom: 0;
                width: 35%;
                z-index: 1;
            }
        }
    }
    .all-on-telegram{
        margin-bottom: 100px;
        position: relative;
        .blurs{
            position: absolute;
            top: 0%;
            left: -70%;
        }
        h1, h2{
            position: relative;
            z-index: 5;
        }
        h2{
            margin-bottom: 32px;
            color: var(--text-gray-light);
        }
        .grid{
            position: relative;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(4, 1fr);
            gap: 24px;
            z-index: 5;
            .grid-item{
                position: relative;
                width: 100%;
                height: 100%;
                min-height: 420px;
                background-color: var(--box-color);
                border-radius: 32px;
                padding: 40px;
                &_blue{
                    background-color: var(--bg-blue);
                }
                &__name{
                    @include h2-mixin;
                    margin-bottom: 6px;
                }
                &__description{
                    margin-bottom: 20px;
                    @include text-medium-mixin;
                }
                &.adaptability{
                    .adaptability__items{
                        img{
                            &:first-child{
                                margin-bottom: 12px;
                            }
                            &:last-child{
                                float: right;
                            }
                        }
                    }
                }
                &.exchanges{
                    grid-column-start: 1;
                    grid-column-end: 3;
                    grid-row-start: 1;
                    grid-row-end: 2;
                    .grid-item__description{
                        max-width: 70%;
                    }
                    .exchanges__items{
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                    }
                }
                &.filters{
                    img{
                        position: absolute;
                        right: 0;
                        bottom: 0;
                    }
                }
                &.speed{
                    grid-column-start: 2;
                    grid-column-end: 2;
                    grid-row-start: 2;
                    grid-row-end: 4;
                    img{
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        object-fit: cover;
                    }
                }
                &.guide{
                    img{
                        position: absolute;
                        right: 36px;
                        bottom: 30px;
                    }
                }
            }
        }
    }
    .access-to-arbitrage{
        position: relative;
        padding-top: 80px;
        padding-bottom: 80px;
        overflow: hidden;
        h1, h2{
            position: relative;
            z-index: 5;
        }
        h2{
            margin-bottom: 32px;
            color: var(--text-gray-light);
        }
        .blurs-1{
            position: absolute;
            right: -30%;
            top: 0;
        }
        .blurs-2{
            position: absolute;
            left: -30%;
            bottom: 30%;
        }
        .blurs-3{
            position: absolute;
            left: -30%;
            top: 0;
        }
        .blurs-4{
            position: absolute;
            right: -30%;
            bottom: 30%;
        }
        .tarifs{
            display: flex;
            gap: 24px;
            .tarif{
                z-index: 5;
                padding: 40px 32px;
                border-radius: 32px;
                &__heading{
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                &__name{
                    @include h2-mixin;
                }
                &__badge{
                    @include text-md-mixin;
                    padding: 10px 12px;
                    color: #003E9C;
                    border-radius: 100px;
                    background: #D0E3FF;
                    text-wrap: nowrap;
                }
                &__price{
                    @include h1-mixin;
                    .big{
                        @include h1-mixin;
                    }
                    .small{
                        @include h2-mixin;
                    }
                }
                &__provides{
                    margin-bottom: 24px;
                    .provide-item{
                        @include text-medium-mixin;
                        display: flex;
                        align-items: flex-start;
                        display: -webkit-box;
                        &_blue{
                            color: #0065FF;
                        }
                        &:not(:last-child){
                            margin-bottom: 8px;
                        }
                        .svg{
                            margin-top: 2px;
                            align-items: baseline;
                        }
                        span{
                            text-decoration-line: line-through;
                        }
                    }
                    .exclude-item{
                        text-decoration-line: line-through;
                    }
                }
                .button{
                    width: 100%;
                }
            }
            .start-tarif{
                background: rgba(31, 32, 53, 0.60);
            }
            .premium-tarif{
                background-color: var(--bg-white);
                .tarif__name{
                    color: var(--text-dark-blue);
                }
                .tarif__price{
                    .big, .small{
                        color: #0065FF;
                    }
                }
                .tarif__provides{
                    .provide-item{
                        color: #101127;
                        &_blue{
                            color: #0065FF;
                        }
                    }
                }
            }
        }
    }
    .how-bot-works{
        position: relative;
        padding-top: 100px;
        .blurs{
            position: absolute;
            left: -30%;
            top: 25%;
        }
        h1, h2{
            position: relative;
            z-index: 5;
        }
        h2{
            margin-bottom: 32px;
            color: var(--text-gray-light);
        }
        .grid{
            position: relative;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 24px;
            z-index: 5;
            .grid-item{
                overflow: hidden;
                position: relative;
                width: 100%;
                height: 100%;
                min-height: 420px;
                background-color: var(--box-color);
                border-radius: 32px;
                padding: 40px;
                &_blue{
                    background-color: var(--bg-blue);
                }
                &__name{
                    @include h2-mixin;
                    margin-bottom: 6px;
                }
                &__description{
                    margin-bottom: 20px;
                    @include text-medium-mixin;
                }
                &.example{
                    grid-column-start: 2;
                    grid-column-end: 2;
                    grid-row-start: 1;
                    grid-row-end: 3;
                    img{
                        position: absolute;
                        bottom: 3%;
                        left: 40px;
                        width: 70%;
                        object-fit: cover;
                    }
                }
                &.advantages{
                    grid-column-start: 1;
                    grid-column-end: 3;
                    grid-row-start: 3;
                    grid-row-end: 3;
                    .grid-item__name, .grid-item__description{
                        width: 69%;
                    }
                    .button{
                        position: absolute;
                        bottom: 40px;
                        left: 40px;
                    }
                    img{
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        &.star{
                            right: -75px;
                            bottom: -75px;
                        }
                        &.heart{
                            top: 2%;
                            right: 0;
                        }
                        &.chat{
                            bottom: 3%;
                            right: 22%;
                        }
                    }
                }
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
    .review-section{
        .blurs{
            position: absolute;
            left: -65%;
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
        .reviews{
            position: relative;
            z-index: 5;
            display: flex;
            overflow: visible;
            .swiper-wrapper{
                .swiper-slide{
                    width: fit-content !important;
                }
            }
        }
    }
}

@media (max-width: 1360px) {
    .home-page{
        .service-section{
            margin-bottom: 100px;
            h2{
                margin-bottom: 28px;
            }
            .progress{
                &__item{
                    width: 280px;
                }
            }
            .bitcoin{
                padding: 0;
                width: 500px;
                height: auto;
                bottom: -140px;
                right: 0px;
            }
        }
        .about-arbitration{
            margin-bottom: 100px;
            h2{
                margin-bottom: 28px;
            }
            .why-us{
                margin-bottom: 40px;
                flex-direction: column;
                align-items: baseline;
                &__cripto{
                    display: flex;
                    .cripto-item{
                        &:first-child{
                            margin-bottom: 0px;
                        }
                        &:last-child{
                            margin-left: 40px;
                        }
                    }
                }
            }
            .key-benefits{
                h2, p{
                    max-width: 80%;
                }
            }
        }
        .all-on-telegram{
            .grid{
                .grid-item{
                    min-height: 360px;
                    &.exchanges{
                        .exchanges__items{
                            .svg{
                                height: 36px;
                                svg{
                                    height: 100%;
                                    width: fit-content;
                                }
                            }
                        }
                    }
                    &.filters{
                        img{
                            width: 80%;
                        }
                    }
                    &.adaptability{
                        .grid-item__description{
                            br{
                                display: none;
                            }
                        }
                        .adaptability__items{
                            position: absolute;
                            img{
                                width: 75%;
                                &:first-child{
                                    margin-bottom: 10px;
                                }
                                &:last-child{
                                    float: right;
                                }
                            }
                        }
                    }
                    &.speed{
                        img{
                            height: 70%;
                        }
                    }
                    &.guide{
                        img{
                            width: 160px;
                        }
                    }
                }
            }
        }
        .access-to-arbitrage{
            .tarifs{
                .tarif{
                    width: 50%;
                    padding: 20px;
                    &__badge{
                        padding: 0;
                        background-color: transparent;
                    }
                    &__provides{
                        .provide-item{
                            width: 95%;
                        }
                    }
                }
            }
        }
        .how-bot-works{
            .grid{
                .grid-item{
                    &.example{
                        img{
                            width: 80%;
                        }
                    }
                    &.advantages{
                        img{
                            &.star{
                                right: -75px;
                                bottom: -75px;
                            }
                            &.heart{
                                width: 250px;
                                top: 2%;
                                right: 0;
                            }
                            &.chat{
                                width: 160px;
                                bottom: 3%;
                                right: 22%;
                            }
                        }
                    }
                }
            }
        }
        .any-questions{
            .question-robot{
                top: 40px;
            }
        }
    }
}

@media (max-width: 1200px) {
    .home-page{
        .service-section{
            .bitcoin{
                width: 450px;
                bottom: -120px;
                right: -2%;
            }
        }
    }
}

@media (max-width: 920px) {
    .home-page{
        .service-section{
            margin-bottom: 80px;
            h2{
                margin-bottom: 24px;
            }
            .bitcoin{
                display: none;
            }
            .button{
                max-width: 230px;
            }
        }
        .about-arbitration{
            .key-benefits{
                h2, p{
                    max-width: 100%;
                }
                .robot{
                    width: 150px;
                    top: -40px;
                    right: 10px;
                    bottom: auto;
                }
            }
        }
        .all-on-telegram{
            .grid{
                gap: 16px;
                .grid-item{
                    min-height: 300px;
                    padding: 20px;
                    &.exchanges{
                        .exchanges__items{
                            gap: 12px;
                            .svg{
                                height: 28px;
                                svg{
                                    height: 100%;
                                    width: fit-content;
                                }
                            }
                        }
                    }
                    &.adaptability{
                        .adaptability__items{
                            img{
                                &:first-child{
                                    margin-bottom: 12px;
                                }
                                &:last-child{
                                    position: absolute;
                                    right: 20px;
                                }
                            }
                        }
                    }
                    &.guide{
                        img{
                            width: 120px;
                            right: 15px;
                            bottom: 15px;
                        }
                    }
                }
            }
        }
        .access-to-arbitrage{
            .tarifs{
                flex-direction: column;
                .tarif{
                    width: 100%;
                    padding: 30px;
                    border-radius: 24px;
                    &__heading{
                        justify-content: space-between;
                    }
                }
            }
        }
        .how-bot-works{
            .grid{
                .grid-item{
                    &.example{
                        img{
                            width: 80%;
                        }
                    }
                    &.advantages{
                        img{
                            &.star{
                                right: -75px;
                                bottom: -75px;
                            }
                            &.heart{
                                width: 200px;
                                top: 15%;
                                right: 0;
                            }
                            &.chat{
                                width: 140px;
                                bottom: 6%;
                                right: 25%;
                            }
                        }
                    }
                }
            }
        }
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
    .home-page{
        .service-section{
            h1,h2{
                width: 75%;
            }
            .progress{
                &__item{
                    width: 240px;
                    .description{
                        margin-top: -2px;
                    }
                }
            }
            .button{
                max-width: 210px;
            }
        }
        .about-arbitration{
            .why-us{
                margin-bottom: 80px;
                &__cripto{
                    display: flex;
                    flex-direction: column;
                    .cripto-item{
                        box-shadow: -2px -2px 6px 0px rgba(3, 4, 28, 0.40);
                        &:first-child{
                            margin-bottom: 0;
                        }
                        &:last-child{
                            margin-top: -40px;
                            margin-left: 30px;
                        }
                    }
                }
            }
            .key-benefits{
                padding: 20px;
                h2{
                    max-width: 55%;
                }
                .robot{
                    width: 200px;
                    top: -85px;
                    right: 30px;
                }
            }
        }
        .how-bot-works{
            .grid{
                display: flex;
                flex-direction: column;
                .grid-item{
                    min-height: fit-content;
                    padding: 20px;
                    &.example{
                        min-height: 600px;
                        img{
                            left: 0;
                            right: 0;
                            bottom: 40px;
                            margin-left: auto;
                            margin-right: auto;
                            width: 370px;
                        }
                    }
                    &.advantages{
                        min-height: 320px;
                        img{
                            &.star{
                                width: 140px;
                                right: -30px;
                                bottom: -30px;
                            }
                            &.heart{
                                width: 160px;
                                top: 10%;
                                right: 0;
                            }
                            &.chat{
                                width: 100px;
                                bottom: 10%;
                                right: 20%;
                            }
                        }
                        .button{
                            left: 20px;
                            bottom: 20px;
                        }
                    }
                }
            }
        }
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

@media (max-width: 520px) {
    .home-page{
        .service-section{
            margin-bottom: 60px;
            h1,h2{
                width: 100%;
            }
            .progress{
                &__item{
                    width: 150px;
                    .description{
                        margin-top: -2px;
                    }
                }
            }
        }
        .about-arbitration{
            margin-bottom: 360px;
            .why-us{
                margin-bottom: 80px;
                &__cripto{
                    display: flex;
                    flex-direction: column;
                }
            }
            .key-benefits{
                position: absolute;
                left: 0;
                width: 100%;
                border-radius: 0;
                padding: 16px;
                .robot{
                    width: 120px;
                    top: -25px;
                    right: 10px;
                }
            }
        }
        .all-on-telegram{
            .grid{
                display: flex;
                flex-direction: column;
                .grid-item{
                    min-height: 215px;
                    gap: 12px;
                    &.speed{
                        height: 550px;
                    }
                    &.filters{
                        img{
                            width: 150px;
                        }
                    }
                    &.adaptability{
                        min-height: 280px;
                    }
                    &.guide{
                        img{
                            width: 90px;
                        }
                    }
                }
            }
        }
        .access-to-arbitrage{
            .tarifs{
                flex-direction: column;
                .tarif{
                    border-radius: 16px;
                    width: 100%;
                    padding: 12px;
                    &__provides{
                        .provide-item{
                            width: 95%;
                        }
                    }
                }
            }
        }
        .how-bot-works{
            .grid{
                .grid-item{
                    padding: 12px;
                    &.example{
                        img{
                            left: 0;
                            right: 0;
                            bottom: 20px;
                            margin-left: auto;
                            margin-right: auto;
                            width: 80%;
                        }
                    }
                    &.advantages{
                        .grid-item__name, .grid-item__description{
                            width: 100%;
                        }
                        img{
                            &.star{
                                width: 80px;
                                right: 0px;
                                bottom: 0px;
                            }
                            &.heart{
                                width: 100px;
                                top: auto;
                                bottom: 23%;
                                right: 10px;
                            }
                            &.chat{
                                width: 60px;
                                bottom: 10%;
                                right: 26%;
                            }
                        }
                        .button{
                            z-index: 2;
                            left: 12px;
                            bottom: 12px;
                        }
                    }
                }
            }
        }
    }
}

</style>
