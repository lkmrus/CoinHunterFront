<template>
    <div class="arbitrage-page">
        <section class="arbitrage-page__content">
            <h2>Межбиржевой арбитраж</h2>
            <div
                class="filter"
                :class="{'inactive': !authenticated}"
            >
                <div class="filter__content">
                    <div class="filter-elements">
                        <div class="filter-cryptocouple filter-item">
                            <div class="filter-item__name">
                                Криптопара
                            </div>
                            <div class="selections">
                                <selection-custom
                                    class="selection-first"
                                    :inactive="!authenticated"
                                    :class="{'selected-tab_small': !isOpen}"
                                    :options="[
                                        { name: 'Любая'},
                                        { name: 'ETH'},
                                        { name: 'BTC'},
                                        { name: 'LTC'},
                                        { name: 'DOGE'},
                                        { name: 'SOL'},
                                        { name: 'ADA'},
                                        { name: 'LINK'},
                                        { name: 'XRP'},
                                        { name: 'EOS'},
                                        { name: 'XLM'},
                                        { name: 'BNB'},
                                        { name: 'BCH'},
                                    ]"
                                    placeholder="Любая"
                                    :active-options="[]"
                                />
                                <selection-custom
                                    class="selection-second"
                                    :inactive="!authenticated"
                                    :class="{'selected-tab_small': !isOpen}"
                                    :options="[
                                        { name: 'Любая'},
                                        { name: 'USDT'},
                                    ]"
                                    placeholder="Любая"
                                    :active-options="[]"
                                />
                            </div>
                        </div>
                        <div class="filter-cryptoexchanges filter-item">
                            <div class="filter-item__name">
                                Криптобиржи
                            </div>
                            <selection-custom
                                :class="{'selected-tab_small': !isOpen}"
                                :inactive="!authenticated"
                                :multiple-type="true"
                                :options="[
                                    { name: 'Все биржи', is_active: false},
                                    { name: 'Binance', is_active: false},
                                    { name: 'Bybit', is_active: false},
                                    { name: 'Hitbtc', is_active: false},
                                    { name: 'KuCoin', is_active: false},
                                    { name: 'Huobi', is_active: false},
                                ]"
                                placeholder="Все биржи"
                                :active-options="[]"
                            />
                        </div>
                        <div class="filter-income-and-notifications">
                            <div class="profit-no-less filter-item">
                                <div class="filter-item__name">
                                    Прибыль не менее
                                </div>
                                <input-custom
                                    :disabled="!authenticated"
                                    placeholder="0 - 100 %"
                                />
                            </div>
                            <div class="notification-frequency filter-item">
                                <div class="filter-item__name">
                                    Частота уведомлений
                                </div>
                                <selection-custom
                                    :class="{'selected-tab_small': !isOpen}"
                                    :inactive="!authenticated"
                                    :options="[
                                        { name: 'Любая'},
                                        { name: 'BTC'},
                                        { name: 'USDT'},
                                        { name: 'ETH'},
                                        { name: 'USDC'},
                                        { name: 'TRX'},
                                    ]"
                                    placeholder="Любая"
                                    :active-options="[]"
                                />
                            </div>
                        </div>
                    </div>
                    <button-custom
                        :disabled="!authenticated"
                        :value="filterButtonText.name"
                        :b-icon="filterButtonText.icon"
                    />
                </div>
                <div
                    v-if="authenticated"
                    class="filter__checkbox"
                >
                    <checkbox-custom
                        default-type
                        :checked="telegramNotifications"
                        text="Telegram уведомления"
                        @click="telegramNotifications = !telegramNotifications"
                    />
                </div>
                <div
                    v-if="authenticated"
                    class="filter__checkbox filter__checkbox_mobile"
                >
                    <checkbox-custom
                        default-type
                        :checked="telegramNotifications"
                        text="TG уведомления"
                        @click="telegramNotifications = !telegramNotifications"
                    />
                </div>
            </div>
            <div
                v-if="authenticated"
                class="cards"
            >
                <arbitrage-card />
                <arbitrage-card />
                <arbitrage-card />
                <arbitrage-card />
                <arbitrage-card />
            </div>
            <div class="arbitrage-page__text">
                <div class="content">
                    <h4>{{ pageText.heading }}</h4>
                    <p>{{ pageText.text }}</p>
                    <div
                        v-if="pageText.button_text"
                        class="button-content"
                    >
                        <button-custom
                            :value="pageText.button_text"
                            @click="goToPage(pageText.button_method.page, pageText.button_method.query)"
                        />
                    </div>
                </div>
            </div>
        </section>
        <table-unit />
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

const { authenticated } = storeToRefs(useAuthStore())

const telegramNotifications = ref(false)
const haveFilter = ref(false)
const filterButtonText = reactive({
  name: 'Добавить',
  icon: ''
})

const pageText = reactive({
  heading: 'Оформите подписку, чтобы отслеживать больше криптопар',
  text: 'До 30 пар онлайн, настройка уведомлений в Telegram, внутрибиржевой и межбиржевой арбитраж',
  button_text: 'Оформить подписку',
  button_method: { page: '/payment', query: {} }
})

watch(() => haveFilter, (newval) => {
  if (newval.value === true) {
    filterButtonText.name = 'Сброс'
    filterButtonText.icon = 'close'
  } else {
    filterButtonText.name = 'Добавить'
    filterButtonText.icon = ''
  }
}, { immediate: true, deep: true })

watchEffect(() => {
  if (authenticated.value) {
    pageText.heading = 'Оформите подписку, чтобы отслеживать больше криптопар'
    pageText.heading = 'До 30 пар онлайн, настройка уведомлений в Telegram, внутрибиржевой и межбиржевой арбитраж'
    pageText.heading = 'Оформить подписку'
    pageText.button_method = { page: '/payment', query: {} }
  } else {
    pageText.heading = 'Зарегистрируйтесь чтобы отслеживать криптопары'
    pageText.heading = 'После регистрации вам будет доступно до пяти криптопар в режиме онлайн'
    pageText.heading = 'Зарегистрироваться'
    pageText.button_method = { page: '/auth', query: { type: 'registration' } }
  }
})

const goToPage = async (page, query = {}) => {
  await navigateTo({
    path: page,
    query
  })
}

</script>

<style lang="scss">
.arbitrage-page{
    padding-top: 182px;
    padding-bottom: 120px;
    h2{
        margin-bottom: 44px;
    }
    .filter{
        margin-bottom: 34px;
        &.inactive{
            pointer-events: none;
            .filter__content{
                .filter-elements{
                    .filter-item{
                        &__name{
                            color: var(--text-gray-dark);
                        }
                    }
                }
            }
        }
        &__content{
            margin-bottom: 4px;
            display: flex;
            align-items: flex-end;
            gap: 12px;
            margin-bottom: 14px;
            .filter-elements{
                display: flex;
                gap: 2px;
                .filter-item{
                    &__name{
                        @include text-xs-mixin;
                        margin-bottom: 8px;
                    }
                    .selections{
                        display: flex;
                        gap: 2px;
                    }
                }
                .filter-cryptocouple{
                    .selection-first{
                        width: 160px;
                        .selection-custom__content{
                            border-radius: 16px 0px 0px 16px;
                        }
                    }
                    .selection-second{
                        width: 160px;
                        .selection-custom__content{
                            border-radius: 0;
                        }
                    }
                }
                .filter-cryptoexchanges{
                    .selection-custom{
                        &__content{
                            border-radius: 0;
                        }
                    }
                }
                .filter-income-and-notifications{
                    display: flex;
                    align-items: flex-end;
                    gap: 2px;
                    .notification-frequency{
                        .selection-custom{
                            width: 220px;
                            &__content{
                                border-radius: 0px 16px 16px 0px;
                            }
                        }
                    }
                    .profit-no-less{
                        .input-custom{
                            width: 160px;
                            min-width: 160px;
                            height: 44px;
                            .input{
                                @include text-md-mixin;
                                width: 100%;
                                height: 100%;
                                border-radius: 0;
                                padding: 0 12px;
                            }
                        }
                    }
                }
            }
        }
        &__checkbox{
            display: flex;
            justify-content: flex-end;
            &_mobile{
                display: none;
            }
        }
    }
    .cards{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    &__text{
        margin: 120px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .content{
            text-align: center;
            width: 570px;
            h4{
                margin-bottom: 20px;
            }
            p{
                margin-bottom: 32px;
            }
            .button-content{
                display: flex;
                place-content: center;
            }
        }
    }
}

@media (max-width: 1360px) {
    .arbitrage-page{
        .filter{
            &__content{
                .filter-elements{
                    .filter-cryptocouple{
                        .selection-first{
                            width: 120px;
                        }
                        .selection-second{
                            width: 120px;
                        }
                    }
                    .filter-cryptoexchanges{
                        .selection-custom{
                            width: 160px;
                        }
                    }
                    .filter-income-and-notifications{
                        .notification-frequency{
                            .selection-custom{
                                width: 160px;
                            }
                        }
                        .profit-no-less{
                            .input-custom{
                                width: 160px;
                                min-width: 160px;
                            }
                        }
                    }
                }
                button{
                    @include text-md-mixin;
                    width: 120px;
                }
            }
        }
    }
}

@media (max-width: 920px) {
    .arbitrage-page{
        .filter{
            margin-bottom: 135px;
            position: relative;
            &__content{
                width: 100%;
                .filter-elements{
                    width: 100%;
                    gap: 12px;
                    flex-direction: column;
                    .filter-cryptocouple{
                        .selection-first{
                            width: 50%;
                            .selection-custom__content{
                                border-radius: 16px 0px 0px 16px;
                            }
                        }
                        .selection-second{
                            width: 50%;
                            .selection-custom__content{
                                border-radius: 0px 16px 16px 0px;
                            }
                        }
                    }
                    .filter-cryptoexchanges{
                        .selection-custom{
                            width: 100%;
                            &__content{
                                border-radius: 16px;
                            }
                        }
                    }
                    .filter-income-and-notifications{
                        gap: 12px;
                        .notification-frequency{
                            width: 50%;
                            .selection-custom{
                                width: 100%;
                                &__content{
                                    border-radius: 16px;
                                }
                            }
                        }
                        .profit-no-less{
                            width: 50%;
                            .input-custom{
                                width: 100%;
                                min-width: 100%;
                                .input{
                                    border-radius: 16px;
                                }
                            }
                        }
                    }
                }
                button{
                    @include text-md-mixin;
                    position: absolute;
                    bottom: -100px;
                    width: 100%;
                }
            }
            &__checkbox{
                position: absolute;
                left: 12px;
                bottom: -40px;
                display: none;
                &_mobile{
                    display: flex;
                }
            }
        }
    }
}

@media (max-width: 720px) {
    .arbitrage-page{
        &__text{
            .content{
                width: 100%;
            }
        }
    }
}

@media (max-width: 520px) {
    .arbitrage-page{
        &__text{
            .content{
                p{
                    @include text-md-mixin;
                }
                button{
                    @include text-md-mixin;
                }
            }
        }
    }
}
</style>
