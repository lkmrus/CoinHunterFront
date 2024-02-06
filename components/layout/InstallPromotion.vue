<template>
    <section class="install">
        <div class="install__wrapper">
            <button-custom
                class="big-h"
                :value="$t('install_app_button_text')"
                @click="$emit(`click`, $event)"
            />
            <div
                class="install__close"
                @click="$emit(`close`, $event)"
            >
                <svg-icon
                    icon="close"
                    class="button__icon"
                    stroke="#FFFFFF"
                    :width="24"
                    :height="24"
                />
            </div>
        </div>
    </section>
</template>
<script setup>
defineEmits(['close', 'click'])
</script>
<style lang="scss" scoped>
.install {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 8px;

  &__wrapper {
    display: flex;
    gap: 10px;
  }

  &__close {
    align-self: center;
    opacity: .3;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  &__close:hover {
    opacity: 1;
  }
}
</style>
