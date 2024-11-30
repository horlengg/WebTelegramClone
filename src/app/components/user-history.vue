<script setup lang="ts">
import { generateAvatar } from '@/composible/generate-avatar';
import { chatroomType, UserHistoryType } from '@/types';
// import { encrypt } from '@/utils/cryptoJS ';
import { activityDateFormat } from '@/utils/date-formater';
import { onMounted, ref } from 'vue';

type UserHistoryProps = {
    data : UserHistoryType,
    index : number
}
const currentUserID = 1

const props = defineProps<UserHistoryProps>();

const canvasRef = ref<HTMLCanvasElement>()
const getImageUrl = (fileName:string) => `/images/${fileName}`
const getTitle = ()=>{
    return props.data.roomType === chatroomType.GROUP ? props.data.groupName : props.data.fullName
}
const getActivityMakerTitle = ()=>{
    if(props.data.userId === currentUserID) return 'You'
    return props.data.fullName?.split(" ").pop()
}
const getUrlParam = ()=>{
    const isGroup = props.data.roomType == 'GROUP'
    return (props.data.groupName || props.data.username)?.split(isGroup ? ' ':'.').join('_').toLowerCase() ?? ''
}

onMounted(()=>{
    if(props.data.roomType === chatroomType.GROUP){
        if(!props.data.groupLogo && canvasRef.value){
            generateAvatar(canvasRef.value, props.data.groupName)
        }
    }else {
        if(!props.data.profileUrl && canvasRef.value){
            generateAvatar(canvasRef.value, props.data.fullName!)
        }
    }
})
</script>

<template>
    <router-link :to="`/k/@${getUrlParam()}`">
        <div class="user-history flex justify-between items-center cursor-pointer">
            <div class="flex items-center gap-3 flex-[.8] overflow-hidden">
                <div>
                    <template v-if="data.roomType==chatroomType.GROUP">
                        <div 
                            v-if="data.groupLogo" 
                            :style="{backgroundImage : `url(${getImageUrl(data.groupLogo)})`}"
                            class="user-profile-img"
                        >
                        </div>
                        <canvas class="user-profile" width="54" height="54" ref="canvasRef" v-else></canvas>
                    </template>
                    <template v-else>
                        <div 
                            v-if="data.profileUrl" 
                            :style="{backgroundImage : `url(${getImageUrl(data.profileUrl)})`}"
                            class="user-profile-img"
                        >
                        </div>
                        <canvas class="user-profile" width="54" height="54" ref="canvasRef" v-else></canvas>
                    </template>
                </div>
                <div class="w-full overflow-hidden">
                    <h4 class="font-bold " style="letter-spacing: .5px;">{{ getTitle() }}</h4>
                    <div v-if="data.lastMessage" class="flex items-center gap-1"> 
                        <span class="text-nowrap overflow-ellipsis overflow-hidden " v-if="data.roomType == chatroomType.GROUP">
                            <span class="font-medium">{{ getActivityMakerTitle() }}</span> : <span class="opacity-70 ">{{ data.lastMessage.messageText }}</span> 
                        </span> 
                        <span class="opacity-70" v-else>
                            {{ data.lastMessage.files.length ? 'Sent you a file message!.' : data.lastMessage.messageText }}
                        </span>
                    </div>
                    <div v-else >
                        <template v-if="data.roomType == chatroomType.GROUP">
                            <span v-if="data.fullName">
                                <span class="font-medium">{{ getActivityMakerTitle() }}</span> 
                                <span class="opacity-70">Join group via invite link</span>
                            </span>
                            <span v-else-if="data.owner">
                                <span class="font-medium">{{ data.owner.id === currentUserID ? 'You' : data.owner.fullName?.split(" ").pop() }}</span> 
                                <span class="opacity-70"> change group chat logo</span>
                            </span>
                        </template>
                        <template v-else>
                            <span class="font-medium">{{ getActivityMakerTitle() }} </span>
                            <span class="opacity-70"> joined Telegram</span>
                        </template>
                    </div>
                </div>
            </div>
            <div class="flex flex-col flex-[.2] items-end">
                <span class="text-xs opacity-70">{{ activityDateFormat(data.activityDate) }}</span>
                <span class="unread-msg-count font-medium text-xs mt-2" v-if="data.unseenActivityCount>0">{{ data.unseenActivityCount }}</span>
            </div>
        </div>
    </router-link>
</template>

<style scoped lang="scss">
.user-history {
    padding: 10px;
    border-radius: 12px;
    &:hover {
        background-color: var(--user-history-hover-bg);
    }
    .user-profile {
        border-radius: 50%;
    }
    .user-profile-img {
        width: 54px;
        height: 54px;
        background-position: center;
        background-size: cover;
        border-radius: 50%;
    }
    .unread-msg-count {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 22px;
        // height: 20px;
        padding: 2px 7px;
        width: fit-content;
        background-color: var(--primary-color);
    }
}
a.router-link-active {
    .user-history {
        background-color: var(--primary-color);
        .unread-msg-count {
            background-color: #FFF;
            color: var(--primary-color);
        }
    }
}
</style>