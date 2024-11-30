<script setup lang="ts">
import {ref, StyleValue, watchEffect } from 'vue';

const props = defineProps<{
    target : HTMLElement | undefined
}>()
const isShowOption = defineModel({type : Boolean,default : false})
const optionStyle = ref<StyleValue>()
const optionRef = ref<HTMLElement>()
const clickdocument = ()=>{
    if(!isShowOption.value) return
    console.log("clickdocument");
    isShowOption.value = false
    document.removeEventListener("click",clickdocument)
}
const setStyleOptionElement = async(e:Event)=>{
    e.stopPropagation();
    if(isShowOption.value) {
        isShowOption.value = false
        return;
    }
    if(!props.target) return
    const messageBox = document.querySelector("#message-box")
    if(!messageBox) throw new Error("No message box element found")
    
    const rect = messageBox.getBoundingClientRect()
    isShowOption.value = true
    optionStyle.value = {
        position : "absolute",
        right : `${innerWidth - (rect.left + rect.width)}px`,
        bottom : `${innerHeight -(rect.top - rect.height)}px`,
        "z-index" : "1000"
    }
    document.addEventListener("click",clickdocument)
}
watchEffect(()=>{
    if(props.target){
        // Define the event handler function
        const handleClick = setStyleOptionElement;
        // Add the event listener
        props.target.addEventListener("click", handleClick);
        // Cleanup function to remove the event listener
        return () => {
            props.target?.removeEventListener("click", handleClick);
        };
    }
})

</script>
<template>
    <Teleport to="body">
        <Transition name="option">
            <div class="upload-option-wr" ref="optionRef" style="width: 200px" :style="optionStyle" v-if="isShowOption">
                <ul class="upload-option">
                    <li class="upload-option_item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.33 17.657c.11-.366.17-.755.17-1.157v-9a4 4 0 0 0-4-4h-9a4 4 0 0 0-4 4v9.07m16.83 1.087l-.088-.104l-2.466-2.976a2 2 0 0 0-3.073-.008l-1.312 1.566l-.214.261m7.153 1.26a4 4 0 0 1-3.713 2.842m0 0l-.117.002h-9a4 4 0 0 1-4-3.93m13.117 3.928l-.093-.106l-3.347-3.996m-9.676.175l.177-.201l3.206-3.827a2 2 0 0 1 3.066 0l3.227 3.853"/><circle cx="15.091" cy="8.909" r="1.5" fill="currentColor"/></g>
                        </svg>
                        <span>Photo or Video</span>
                    </li>
                    <li class="upload-option_item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14.186 2.753v3.596c0 .487.194.955.54 1.3a1.85 1.85 0 0 0 1.306.539h4.125"/><path d="M20.25 8.568v8.568a4.25 4.25 0 0 1-1.362 2.97a4.28 4.28 0 0 1-3.072 1.14h-7.59a4.3 4.3 0 0 1-3.1-1.124a4.26 4.26 0 0 1-1.376-2.986V6.862a4.25 4.25 0 0 1 1.362-2.97a4.28 4.28 0 0 1 3.072-1.14h5.714a3.5 3.5 0 0 1 2.361.905l2.96 2.722a2.97 2.97 0 0 1 1.031 2.189M7.647 7.647h3.265M7.647 12h8.706m-8.706 4.353h8.706"/></g>
                        </svg>
                        <span>Document</span>
                    </li>
                </ul>
            </div>
        </Transition>
    </Teleport>
    <!-- <div class="file-uploader">
    </div> -->
</template>

<style lang="scss">
.upload-option-wr {
    background-color: var(--shap-bg-color);
    padding: 10px;
    border-radius: 15px;
    .upload-option_item {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 5px;
        svg {
            font-size: 20px;
        }
        &:hover {
            background-color: rgba(170, 170, 170, 0.08);
        }
    }
}
.option-enter-active {
    animation: __option_enter .3s ease forwards;
}
.option-leave-active {
    animation: __option_leave .3s ease forwards;
}
@keyframes __option_enter {
    0% {
        opacity: 0;
        transform: scale(.9);
    }
    100%{
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes __option_leave {
    0%{
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(.9);
    }
}
</style>