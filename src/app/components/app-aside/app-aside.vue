<script setup lang="ts">
import { onMounted, ref, StyleValue, watchEffect } from 'vue';
import AsideHeader from './aside-header.vue';
import UserHistory from '../user-history.vue';
import AppService from '@/service';
import { useRoute } from 'vue-router';
import { decrypt } from '@/utils/cryptoJS ';
import { useChatStore } from '@/stores/chat-store';

const chatTapItemRefs = ref<HTMLElement[]>([])
const tapbarActiveRef = ref<HTMLElement>()
const tapIndexActive = ref(0)
const route = useRoute()
const userHistoryListRef = ref<HTMLElement>()
const chatHistoryStyle = ref<any[]>([])
const chatStore = useChatStore()
const chatTaps = [
    {
        title : "All Chats",
        key : "ALL_CHATS",
        total : 100
    },
    {
        title : "Personal",
        key : "INDIVIDUAL",
        total : 93
    },
    {
        title : "APD BANK",
        key : "APD_BANK",
        total : 7
    },
    {
        title : "School",
        key : "SCHOOL",
        total : 0
    }
]
const setActiveeTapbarStyle = ()=>{
    if(!tapbarActiveRef.value) return
    const tap = chatTapItemRefs.value[tapIndexActive.value]
    const rect = tap.getBoundingClientRect()
    tapbarActiveRef.value.style.width = `${rect.width - 40}px`
    tapbarActiveRef.value.style.left = `${tap.offsetLeft + 20}px`
    // tap.style.width = `${tap.offsetWidth}px`
}
watchEffect(()=>{
    const chatroomId = route.params.chatroomId
    if(chatroomId && typeof chatroomId === 'string'){
        console.log("chat room id = "+decrypt(chatroomId));
    }
})
const service = new AppService(1);
const onTap = (index:number)=>{
    const prevouseTapIndexActive = tapIndexActive.value
    tapIndexActive.value = index
    setActiveeTapbarStyle()
    chatTapItemRefs.value[tapIndexActive.value].scrollIntoView({
        behavior : 'smooth',
        block : 'center',
        inline : 'center'
    })
    setStyleOnChatUserHistory()

    chatHistoryStyle.value[prevouseTapIndexActive].transition = "transform .3s ease-in"
    setTimeout(()=>{
        chatHistoryStyle.value[tapIndexActive.value].transition = "" 
    },300)
    
}
const setStyleOnChatUserHistory = ()=>{
    const offsetWidth = userHistoryListRef.value?.offsetWidth!
    const calculateTranformX = (index:number)=>{
        if(index === tapIndexActive.value) return 0
        return index > tapIndexActive.value ? offsetWidth  : -offsetWidth
    }
    chatTaps.forEach((_,index)=>{
        chatHistoryStyle.value[index] = {
            position : "absolute",
            width : "calc(100% - 20px)",
            height : "80vh",
            top : "0",
            overflowY : "auto",
            transform : `translateX(${calculateTranformX(index)}px)` ,
            transition : index !== tapIndexActive.value ? "" : "transform .3s ease-in",
        } as StyleValue;
    })
}
const getChatHistory = (index:number)=>{
    if(!chatStore.listChatHistory) return []
    if(chatTaps[index].key === "ALL_CHATS" ) 
        return chatStore.listChatHistory
    if(chatTaps[index].key == "APD_BANK")
        return chatStore.listChatHistory.filter(e => e.roomType == "GROUP" && e.groupName.includes("APD"))
    if(chatTaps[index].key == "SCHOOL")
        return chatStore.listChatHistory.filter(e => e.roomType == "GROUP" && e.groupName.includes("University"))
    return chatStore.listChatHistory.filter(e => chatTaps[index].key == e.roomType)
}
watchEffect(()=>{
    if(route.params.username) {
        const usernames = (route.params.username as string).split("_")
        usernames[0] = usernames[0].slice(1)
        chatStore.currentChatroomDetail = chatStore.listChatHistory?.find(e => !e.groupName ? e.username == usernames.join(".") : e.groupName.toLowerCase() == usernames.join(" ") )
    }
})
onMounted(async()=>{
    setActiveeTapbarStyle()
    chatStore.listChatHistory = await service.getUserHistories() ?? []
    setStyleOnChatUserHistory()
})

</script>

<template>
    <div class="app-aside">
        <AsideHeader />
        <div class="app-aside_body">
            <ul class="chat-tap flex items-center mt-5">
                <li 
                    class="chat-tap_item flex items-center gap-1" 
                    v-for="(item,index) of chatTaps" 
                    ref="chatTapItemRefs"
                    :class="{'tap-active':tapIndexActive === index}"
                    :key="index"
                    @click="onTap(index)"
                >
                    <span class="title font-medium">{{ item.title }}</span>
                    <span class="count" v-if="item.total">{{ item.total }}</span>
                </li>
                <span class="active-tap-bar" ref="tapbarActiveRef"></span>
            </ul>
            <div class="user-history-list mt-5" :data-tap-id="0" ref="userHistoryListRef">
                <div class="user-history-list_item" v-for="(_,index) of chatTaps" :style="chatHistoryStyle[index]">
                    <UserHistory v-for="(item,idx) of getChatHistory(index)" :data="item" :index="idx"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.app-aside {
    min-height: 100vh;
    background-color: var(--shap-bg-color);
    width: var(--sidebar-w);
    border-right: 2px solid var(--border-color);
    .app-aside_body {
        .chat-tap {
            position: relative;
            overflow-x: auto;
            &::-webkit-scrollbar {
                display: none;
            }
            .chat-tap_item {
                padding: 10px 20px;
                text-wrap: nowrap;
                cursor: pointer;
                border-radius: 8px 8px 2px 2px;
                transition: color .3s ease-in-out;
                span {
                    opacity: .6;
                    &.title {
                        letter-spacing: 1px;
                    }
                    &.count {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: var(--primary-color);
                        color: #FFF;
                        padding: 0px 5px;
                        min-width: 20px;
                        height: 20px;
                        border-radius: 20px;
                    }
                }
                &:hover {
                    background-color: var(--light-primary-color);
                }
                &.tap-active {
                    color: var(--primary-color);
                }
            }
            .active-tap-bar {
                position: absolute;
                border: 1.5px solid var(--primary-color);
                border-radius: 20px;
                bottom: 0;
                transition: width .3s ease-in-out,left .3s ease-in-out;
            }
        }
        .user-history-list {
            position: relative;
            padding: 0 10px;
            overflow-y: auto;
            height: 80vh;
            width: 100%;
            overflow: hidden;
            .user-history-list_item {
                padding-bottom: 25px;
                &::-webkit-scrollbar {
                    display: none;
                }
            }
        }
    }
}
</style>