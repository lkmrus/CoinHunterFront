<template>
    <div class="page-layout">
        <NuxtPwaManifest />
        <meta
            name="cryptomus"
            content="8650a1e1"
        />
        <div class="page-layout__header">
            <hint-unit />
            <layout-header />
            <install-promotion
                v-if="showButton"
                @close="closePromotion"
                @click="installApp"
            />
        </div>
        <slot />
        <layout-footer />
    </div>
</template>

<script setup>
let installPrompt
const canInstall = ref(false)
const installed = ref(false)
const showButton = computed(() => canInstall.value && !installed.value)

const closePromotion = () => {
  canInstall.value = false
  localStorage.setItem('promotionClosed', `${Date.now()}`)
}

const installApp = () => {
  if (!installPrompt) {
    return
  }

  installPrompt.prompt()
}

const handleInstallPrompt = (event) => {
  event.preventDefault()
  installPrompt = event
}

const handleAppInstalled = () => {
  installed.value = true
}

onBeforeMount(async () => {
  if (process.client) {
    if ('getInstalledRelatedApps' in navigator) {
      const apps = await navigator.getInstalledRelatedApps()
      const isInstalled = apps.includes('trade.hunter-coin')
      const promotionClosed = localStorage.getItem('promotionClosed')
      const oneDaySec = 60 * 60 * 24

      canInstall.value = true

      if (promotionClosed) {
        const closedAt = Number(promotionClosed)

        canInstall.value = closedAt + oneDaySec <= Date.now()
      }

      installed.value = isInstalled
    }

    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    installPrompt = null
    window.removeEventListener('appinstalled', handleAppInstalled)
    window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
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
