<template>
    <div class="page-layout">
        <meta
            name="cryptomus"
            content="8650a1e1"
        />
        <div class="page-layout__header">
            <hint-unit />
            <layout-header />
        </div>
        <slot />
        <layout-footer />
    </div>
</template>

<script setup>
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
