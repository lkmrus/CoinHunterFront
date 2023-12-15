<template>
    <div class="payment-page">
        <div class="blurs">
            <div class="blurs__content">
                <div class="blur blur-1" />
                <div class="blur blur-2" />
                <div class="blur blur-3" />
            </div>
        </div>
        <div class="payment-page__info">
            <div class="title">
                <svg-icon
                    width="56"
                    height="56"
                    icon="usdt"
                />
                <h2>Оплата подписки</h2>
            </div>
            <h2 class="subtitle">
                $20 USDT TRC20
            </h2>
        </div>
        <div class="payment-page__description">
            Видео-инструкция по оплате в USDT с любой биржи или кошелька в пару кликов
        </div>
        <div class="payment-page__player">
            <iframe
                width="550"
                height="304"
                :src="`https://www.youtube.com/embed/d49zddgOF_c?si=o7GrM4pqHT_k-cj9`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            />
        </div>
        <div class="payment-page__button">
            <button-custom
                class="big-h"
                value="Оплатить"
                b-icon="usdt"
                b-icon-size="24"
                @click="switchPopup()"
            />
        </div>
        <div class="payment-page__vpn">
            При оплате может понадобиться VPN
        </div>
        <img
            class="bitcoin"
            src="@/assets/img/bitcoin.png"
            alt="bitcoin"
        >
        <popup-notification
            id="popup-notification"
            type="success"
            title="Ваш заказ успешно оплачен"
            description="Ваша премиум подписка на месяц активна! Спасибо за ваше доверие! 😊"
            b-name="Перейти в мой кабинет"
            b-link="/account"
        />
    </div>
</template>

<script setup>

const switchPopup = () => {
  const popup = document.getElementById('popup-notification')
  if (popup) {
    popup.style.display = 'flex'
    setTimeout(() => {
      popup.style.opacity = '1'
    }, 200)
  }
}
</script>

<style lang="scss">
.payment-page{
    min-height: 970px;
    overflow: hidden;
    position: relative;
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
    &__info{
        margin-top: 182px;
        .title{
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .subtitle{
            color: var(--link);
        }
    }
    &__description{
        max-width: 548px;
    }
    &__button{
        button{
            width: 384px;
        }
        .pay{
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }
    &__vpn{
        @include text-xs-mixin;
        color: var(--text-gray-dark)
    }
    .bitcoin{
        z-index: 4;
        position: absolute;
        width: 696px;
        height: 789px;
        top: 100px;
        right: 0px;
    }
}

footer{
    display: none;
}

@media (max-width: 1360px) {
    .payment-page {
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
    .payment-page {
        .blurs{
            top: 40%;
            right: -75%;
        }
        .bitcoin{
            top: 20%;
            right: -50px;
            width: 500px;
            height: auto;
        }
    }
}

@media (max-width: 1060px) {
    .payment-page{
        .blurs{
            display: none;
        }
        .bitcoin{
            display: none;
        }
    }
}

@media (max-width: 920px) {
    .payment-page{
        padding: 0 calc(50% - 322px);
    }
}

@media (max-width: 720px) {
    .payment-page{
        padding: 0 16px;
        &__player{
            width: 100%;
            iframe{
                width: 100%;
            }
        }
        &__button{
            width: 100%;
            button{
                width: 100%;
            }
        }
    }
}
</style>
