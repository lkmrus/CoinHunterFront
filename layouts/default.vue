<template>
    <div class="page-layout">
        <NuxtPwaManifest />
        <meta
            name="cryptomus"
            content="8650a1e1"
        >
        <div class="page-layout__header">
            <hint-unit />
            <layout-header />
            <install-promotion
                v-if="showButton"
                @close="closePromotion"
                @click="$pwa.install()"
            />
        </div>
        <slot />
        <layout-footer />
    </div>
</template>

<script setup>
const { $isDesktop, $pwa } = useNuxtApp()

const isMobile = computed(() => !$isDesktop())
const closed = ref(false)
const showButton = computed(() => $pwa.showInstallPrompt && isMobile.value && !closed.value)

const closePromotion = () => {
  localStorage.setItem('promotionClosed', `${Date.now()}`)
  closed.value = true
}

onBeforeMount(() => {
  if (process.client) {
    const promotionClosed = localStorage.getItem('promotionClosed')

    if (!promotionClosed) {
      return
    }

    const oneDaySec = 60 * 60 * 24
    const closedAt = Number(promotionClosed)

    closed.value = Date.now() < closedAt + oneDaySec
  }
})
</script>

<style lang="scss" scoped>
.page-layout{
    &__header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 200;
    }
}
</style>
