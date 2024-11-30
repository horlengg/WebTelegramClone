import { UserHistoryType } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('useChatStore',()=>{
    const currentChatroomDetail = ref<UserHistoryType>()
    const listChatHistory = ref<UserHistoryType[]>()

    return {
        currentChatroomDetail,
        listChatHistory
    }
});
