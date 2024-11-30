<script setup lang="ts">
import { generateAvatar } from '@/composible/generate-avatar';
import { useChatStore } from '@/stores/chat-store';
import {ref, watchEffect } from 'vue';

const canvasRef = ref<HTMLCanvasElement>()
const chatStore = useChatStore()
const getImageUrl = (fileName:string) => `/src/app/assets/images/${fileName}`
watchEffect(()=>{
    if(chatStore.currentChatroomDetail && canvasRef.value){
        if(chatStore.currentChatroomDetail.groupLogo || chatStore.currentChatroomDetail.profileUrl) return
        const name = chatStore.currentChatroomDetail.groupName || chatStore.currentChatroomDetail.fullName
        generateAvatar(canvasRef.value,name!)
    }
})
</script>

<template>
    <div class="app-chat_header">
        <div class="app-chat_header-left">
            <div 
                v-if="chatStore.currentChatroomDetail?.groupLogo || chatStore.currentChatroomDetail?.profileUrl"
                :style="{backgroundImage : `url(${getImageUrl((chatStore.currentChatroomDetail?.groupLogo || chatStore.currentChatroomDetail?.profileUrl)!)})`}"
                class="chatroom-profile"
            >
            </div>
            <canvas class="chatroom-profile" width="54" height="54" ref="canvasRef" v-else></canvas>
            <div>
                <h4 class="font-bold text-[16px]">{{ chatStore.currentChatroomDetail?.groupName || chatStore.currentChatroomDetail?.fullName }}</h4>
                <p class="opacity-70 text-[12px] font-light" v-if="chatStore.currentChatroomDetail?.roomType == 'GROUP'">
                    {{ chatStore.currentChatroomDetail.members?.length }} Members
                </p>
                <p class="opacity-70 text-[12px] font-light" v-else>last seen recently</p>
            </div>
        </div>
        <div class="app-chat_header-right">
            <button class="app-chat_header-btn btn-search">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/>
                </svg>
            </button>
            <button class="app-chat_header-btn btn-more">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 13a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm0 7a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm0-14a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-chat_header {
    background-color: var(--shap-bg-color);
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    cursor: pointer;
    .app-chat_header-left {
        display: flex;
        align-items: center;
        gap: 10px;
        .chatroom-profile {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background-position: center;
            background-size: cover;
        }
    }
    .app-chat_header-right {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .app-chat_header-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        transition: background-color .3s ease;
        color: #aaaaaa;
        &:hover {
            background-color: rgba(170, 170, 170, 0.08);
        }
        font-size: 25px;
    }
}
</style>