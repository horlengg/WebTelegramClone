<script setup lang="ts">
import DefaultLayout from './layout/default-layout.vue';
import AppLayout from './layout/app-layout.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const isAppLayout = ()=> !route.meta.isCleanLaout

</script>

<template>
    <AppLayout v-if="isAppLayout()"/>
    <DefaultLayout v-else/>
</template>