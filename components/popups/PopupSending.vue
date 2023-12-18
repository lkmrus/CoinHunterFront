<template>
    <div class="popup-sending">
        <div class="popup-sending__content">
            <div
                class="close"
                @click="emit('close')"
            >
                <svg-icon
                    icon="close-popup"
                    fill="#A3A3C1"
                />
            </div>
            <div class="icon">
                <svg-icon
                    icon="approve-circle"
                    fill="#12B76A"
                />
            </div>
            <h4 class="title">
                {{ title }}
            </h4>
            <div class="description">
                {{ description }}
            </div>
            <div
                class="button"
            >
                <button-custom
                    value="Вернуться в CoinHunter"
                    @click="emit('close')"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['close'])

defineProps({
  // Default Input Props
  title: { type: String, required: true },
  description: { type: String, default: null }
})
</script>

<style lang="scss" scoped>
.popup-sending{
    display: none;
    overflow: auto;
    opacity: 0;
    transition: 0.2s;
    position: fixed;
    background-color: rgba(3, 4, 28, 0.8);
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    z-index: 500;
    align-items: center;
    justify-content: center;
    &__content{
        margin: 0 16px;
        position: relative;
        height: auto;
        width: 613px;
        padding: 32px;
        border-radius: 16px;
        background: var(--box-color);
        z-index: 800;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .close{
            cursor: pointer;
            position: absolute;
            top: 24px;
            right: 24px;
        }
        .icon{
            margin-bottom: 6px;
        }
        .title{
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
    .popup-sending{
        &__content{
            .title{
                text-align: center;
                margin-bottom: 20px;
            }
            .description{
                @include text-xs-mixin;
            }
            .button{
                button{
                    @include text-md-mixin;
                }
            }
        }
    }
}
</style>
