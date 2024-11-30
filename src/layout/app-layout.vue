<script setup lang="ts">
import AppChat from '@app/components/chat/chat.vue';
import AppAside from '@app/components/app-aside/app-aside.vue';
</script>

<template>
    <div class="app-layout">
        <AppAside />
        <AppChat />
        <!-- <div class="app-container">
            <router-view></router-view>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.app-layout {
    display: flex;
}
</style>