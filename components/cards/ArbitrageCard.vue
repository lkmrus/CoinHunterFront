<template>
    <div class="arbitrage-card">
        <div class="arbitrage-card__exchange arbitrage-card__item">
            <div class="exchange-name">
                <div class="exchange-name-first">
                    Binance
                </div>
                <svg-icon icon="connection" />
                <div class="exchange-name-second">
                    Bybit
                </div>
            </div>
            <div class="values">
                <h4 class="value">
                    USDT
                </h4>
                <h4 class="value">
                    BTC
                </h4>
            </div>
            <div class="additional-info">
                <svg-icon
                    icon="tg"
                    fill="#A3A3C1"
                />
                TG уведомления каждые 30 минут
            </div>
        </div>
        <div class="arbitrage-card__profit arbitrage-card__item">
            <div class="name">
                Прибыль
            </div>
            <h3 class="value">
                0
            </h3>
            <div class="additional-info">
                0$ + 0% = 0$
            </div>
        </div>
        <div class="arbitrage-card__buy-sale arbitrage-card__item">
            <div class="items">
                <div class="arbitrage-card__item">
                    <div class="name">
                        Покупка
                    </div>
                    <h3 class="value">
                        0
                    </h3>
                </div>
                <div class="arbitrage-card__item">
                    <div class="name">
                        Продажа
                    </div>
                    <h3 class="value">
                        0
                    </h3>
                </div>
            </div>
            <div class="additional-info">
                <svg-icon
                    icon="time"
                    fill="#A3A3C1"
                />
                Обновлено 22:16 03/11/2023 (GMT+3)
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.arbitrage-card{
    padding: 12px 44px;
    background-color: var(--box-color);
    border-radius: 16px;
    display: flex;
    gap: 32px;
    &__item{
        .additional-info{
            @include text-xs-mixin;
            display: flex;
            align-items: center;
            gap: 4px;
            color: var(--text-gray-purple);
        }
        .value{
            margin-bottom: 6px;
        }
        .name{
            @include text-xs-mixin;
            color: var(--text-gray-dark);
        }
    }
    &__exchange{
        width: 296px;
        .exchange-name{
            margin-bottom: 6px;
            gap: 6px;
            display: flex;
            align-items: center;
            color: var(--link);
        }
        .values{
            display: flex;
            align-items: center;
            gap: 16px;
        }
    }
    &__profit{
        background-color: var(--bg-blue);
        border-radius: 8px;
        padding: 8px 16px;
        width: 240px;
        .name{
            color: var(--text-color);
        }
        .value{
            margin-bottom: 0;
        }
        .additional-info{
            color: var(--text-white-blue);
        }
    }
    &__buy-sale{
        .items{
            display: flex;
            justify-content: space-between;
            gap: 32px;
            .arbitrage-card__item{
                width: 240px;
            }
        }
    }
}

@media (max-width: 1360px) {
    .arbitrage-card{
        &__item{
            .additional-info{
                gap: 9px;
            }
        }
        &__buy-sale{
            .items{
                .arbitrage-card__item{
                    width: 100px;
                }
            }
        }
    }
}

@media (max-width: 920px) {
    .arbitrage-card{
        padding: 12px;
        position: relative;
        flex-direction: column;
        gap: 12px;
        &__item{
            .additional-info{
                gap: 9px;
            }
        }
        &__buy-sale{
            margin-bottom: 25px;
            .items{
                justify-content: center;
                gap: 12px;
                .arbitrage-card__item{
                    width: 50%;
                }
            }
        }
        &__exchange{
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: space-between;
            .exchange-name{
                margin-bottom: 0px;
            }
            .values{
                .value{
                    margin-bottom: 0;
                }
            }
            .additional-info{
                position: absolute;
                bottom: 12px;
                left: 10px;
            }
        }
        &__profit{
            width: 100%;
        }
    }
}

@media (max-width: 350px) {
    .arbitrage-card{
        &__exchange{
            .exchange-name{
                @include text-md-mixin;
                color: var(--link);
            }
            .values{
                gap: 5px;
                .value{
                    @include text-md-mixin;
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>
