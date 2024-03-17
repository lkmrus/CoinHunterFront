<template>
  <div class="popup-notification">
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
    <div class="popup-notification__content">
      <div class="icon">
        <svg-icon
          v-if="type == 'success'"
          icon="approve-circle"
          fill="#12B76A"
        />
        <svg-icon
          v-if="type == 'error'"
          icon="error"
          fill="#F04438"
        />
      </div>
      <h4 class="title">
        {{ title }}
      </h4>
      <div class="description">
        {{ description }}
      </div>
      <nuxt-link
        v-if="bName"
        class="button"
        :to="bLink"
      >
        <button-custom
          class="big-h"
          :value="bName"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // Default Input Props
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  bName: { type: String, default: null },
  bLink: { type: String, default: '/payment' }
})
</script>

<style lang="scss" scoped>
.popup-notification{
    display: none;
    overflow: auto;
    opacity: 0;
    transition: 0.2s;
    position: fixed;
    background: var(--bg-color);
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    z-index: 500;
    align-items: center;
    justify-content: center;
    .blurs{
        width: 100%;
        position: absolute;
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
    .blurs-1{
        top: 40%;
        right: -60%;
    }
    .blurs-2{
        bottom: 25%;
        left: -200px;
    }
    &__content{
        position: fixed;
        height: 100vh;
        width: 100vw;
        background: rgba(3, 4, 28, 0.7);
        z-index: 800;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon{
            margin-bottom: 6px;
        }
        .title{
            text-align: center;
            margin-bottom: 20px;
        }
        .description{
            text-align: center;
            max-width: 476px;
            margin-bottom: 32px;
        }
    }
}

@media (max-width: 720px) {
    .popup-notification{
        &__content{
            .title{
                text-align: center;
                margin-bottom: 20px;
            }
            .description{
                @include text-xs-mixin;
            }
        }
    }
}
</style>
