<script setup lang="ts">
import ChatHeader from './chat-header.vue';
import ChatBody from './chat-body.vue';
import { nextTick, ref } from 'vue';
import FileUpload from '../FileUpload.vue';
import EmojiPicker from '../emoji-picker.vue';

const messageBoxWrapperRef = ref<HTMLElement>()
const maxRows = 10;
const messageText = ref("")
const btnShowFileOptionRef = ref<HTMLElement>()
const buttonShowEmojiBoxRef = ref<HTMLElement>()
const resizeTextarea = async (e: Event) => {
    
    const textarea = e.target as HTMLTextAreaElement;
    const trimmedValue = textarea.value.trim();

    // if(((e as any).data) == ' ' && trimmedValue == '') {
    //     textarea.value = ''
    //     return
    // }
    if(!trimmedValue) {
        textarea.value = ''
    }
    
    // Reset the height to recalculate
    textarea.style.height = 'auto';

    // Calculate the new height
    const scrollHeight = textarea.scrollHeight;

    // Line height is important to control resizing
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight || '20', 10);
    const maxHeight = lineHeight * maxRows;

    // Apply height, clamping to the max height
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;

    // Adjust overflow when exceeding max height
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';

    // Update the parent wrapper height
    await nextTick(); // Ensure DOM updates before measuring
    if (messageBoxWrapperRef.value) {
        messageBoxWrapperRef.value.style.height = `${textarea.offsetHeight + 20}px`; // Add padding
    }
};
const onSelectEmoji = (emoji:string)=>{
    messageText.value += emoji;
}

</script>

<template>
    <div class="app-chat">
        <ChatHeader />
        <ChatBody />
        <div class="text-message-box-wr" ref="messageBoxWrapperRef">
            <button class="msgbox-btn btn-emoji" ref="buttonShowEmojiBoxRef">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <g fill="none">
                        <path
                            d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path fill="currentColor"
                            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m2.8 9.857a1 1 0 1 1 1.4 1.428A5.98 5.98 0 0 1 12 17a5.98 5.98 0 0 1-4.2-1.715a1 1 0 0 1 1.4-1.428A3.98 3.98 0 0 0 12 15c1.09 0 2.077-.435 2.8-1.143M8.5 8a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m7 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" />
                    </g>
                </svg>
            </button>
            <textarea 
                rows="1" 
                name="messageBox" 
                id="message-box" 
                class="text-message-box" 
                placeholder="Message"
                v-model="messageText" 
                @input="resizeTextarea"
            ></textarea>
            <button class="msgbox-btn file-attachment" ref="btnShowFileOptionRef">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M8.25 18q-2.6 0-4.425-1.825T2 11.75t1.825-4.425T8.25 5.5h9.25q1.875 0 3.188 1.313T22 10t-1.312 3.188T17.5 14.5H8.75q-1.15 0-1.95-.8T6 11.75t.8-1.95T8.75 9H18v2H8.75q-.325 0-.537.213T8 11.75t.213.538t.537.212h8.75q1.05-.025 1.775-.737T20 10t-.725-1.775T17.5 7.5H8.25q-1.775-.025-3.012 1.225T4 11.75q0 1.75 1.238 2.975T8.25 16H18v2z" />
                </svg>
            </button>
            <button class="btn-sent">
                <svg class="send-msg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"
                    v-if="messageText">
                    <path fill="currentColor"
                        d="m27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L6.69 15H18v2H6.69L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78" />
                </svg>
                <svg class="voice" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"
                    v-else>
                    <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                        <rect width="14" height="27" x="17" y="4" fill="currentColor" rx="7" />
                        <path stroke-linecap="round" d="M9 23c0 8.284 6.716 15 15 15s15-6.716 15-15M24 38v6" />
                    </g>
                </svg>
            </button>
        </div>
    </div>
    <FileUpload :target="btnShowFileOptionRef"/>
    <EmojiPicker @selected="onSelectEmoji" :target="buttonShowEmojiBoxRef" />
</template>

<style scoped lang="scss">
.app-chat {
    width: calc(100% - var(--sidebar-w));
    // display: flex;
    // flex-direction: column;
    height: 100vh;
    position: relative;
    background-color: #000000;

    .text-message-box-wr {
        position: absolute;
        display: flex;
        justify-content: center;
        min-height: 54px;
        /* Initial height */
        height: fit-content;
        /* Allow dynamic height */
        background-color: var(--shap-bg-color);
        width: 65%;
        margin: 0 auto;
        border-radius: 1rem;
        align-items: center;
        padding: 0 0 0 50px;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        transition: height 0.2s ease;

        /* Smooth resizing */
        .text-message-box {
            outline: none;
            padding: 0 20px 0 10px;
            width: 100%;
            background-color: transparent;
            resize: none;

            &::-webkit-scrollbar {
                display: none;
            }

            &::placeholder {
                font-weight: 500;
                letter-spacing: .5px;
            }
        }

        .msgbox-btn {
            position: absolute;
            color: #aaaaaa;
            font-size: 25px;
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            bottom: 10px;

            &:hover {
                background-color: rgba(170, 170, 170, 0.08);
            }

            &.btn-emoji {
                left: 15px;
            }

            &.file-attachment {
                right: 15px;
                font-weight: 600;

                svg {
                    transform: rotate(-45deg);
                }
            }
        }

        .btn-sent {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            position: absolute;
            right: -60px;
            background-color: var(--primary-color);
            color: #FFF;
            font-size: 22px;

            .send-msg {
                font-size: 30px;
                margin-left: 4px;
            }

            svg {
                animation: __zoomIn .3s ease forwards;
            }
        }
    }
}

@keyframes __zoomIn {
    0% {
        transform: scale(.5);
    }

    100% {
        transform: scale(1);
    }
}
</style>