<script setup lang="ts">
import { computed, onMounted, ref, StyleValue, watchEffect } from "vue";
import listEmo from "emoji.json"

type Emoji = {
    name: string,
    char: string,
    category: string,
    group: string,
    subgroup: string,
    codes: string
}

const props = defineProps<{
    target : HTMLElement | undefined
}>()

const vShow = defineModel({ type: Boolean, default: false })
const emojiList = ref<Array<{ group: string, emojis: Emoji[] }>>([])
const style = ref<StyleValue>()
const emojiBoxRef = ref<HTMLElement>()
const searchEmojiText = ref("")
const searchEmojiCategory = ref({
    category : "",
    name : ""
})
const emits = defineEmits<{
    (e: "selected", value: string): void
}>()

const getEmojis = computed(()=>{
    if(searchEmojiText.value)
        return emojiList.value.flatMap(e => e.emojis).filter(e => e.name.includes(searchEmojiText.value.toLowerCase()))
    const {category,name} = searchEmojiCategory.value
    return emojiList.value.flatMap(e => e.emojis).filter(e => name ? e.category.includes(category) && e.name.includes(name) : e.category.includes(category) )
})
const filterCategory = (category:string,name?:string)=>{
    console.log("search emoji by : "+category);
    searchEmojiText.value = ''
    searchEmojiCategory.value.category = category
    if(name) searchEmojiCategory.value.name = name
    else searchEmojiCategory.value.name = ''
}
const handleClickShowEmojiBox = async(e:Event)=>{
    e.stopPropagation();
    if(vShow.value) return vShow.value = false
    vShow.value = true
    const rect = props.target?.getBoundingClientRect()!
    const b = Math.floor(innerHeight - rect.top) + 20
    style.value = {
        "position" : "absolute",
        left : `${Math.floor(rect.left)}px`,
        bottom : `${(b)}px`,
        "z-index" : 1000
    }
    document.addEventListener("click",handleClickDocument)
}
const handleClickDocument = (e:MouseEvent)=>{
    const el = e.target as HTMLElement
    if(emojiBoxRef.value?.contains(el) || emojiBoxRef.value?.isEqualNode(el)) return
    vShow.value = false
    searchEmojiCategory.value.category = ''
    searchEmojiCategory.value.name = ''
    searchEmojiText.value = ''
    document.removeEventListener("click",handleClickDocument)
}
watchEffect(()=>{
    if(props.target){
        props.target.addEventListener("click",handleClickShowEmojiBox)
        return () => {
            props.target?.removeEventListener("click", handleClickShowEmojiBox);
        };
    }
})

onMounted(() => {
    listEmo.forEach(e => {
        const emojiIndex = emojiList.value.findIndex(t => t.group == e.group)
        if (emojiIndex === -1) emojiList.value.push({ group: e.group, emojis: [e] })
        else emojiList.value[emojiIndex].emojis.push(e)
    })
})
</script>
<template>
    <Teleport to="body">
        <Transition name="emojipickerbox">
            <div class="emoji-picker" :style="style" v-if="vShow" ref="emojiBoxRef">
                <div class="emoji-picker_row">
                    <span class="btn-emoji" @click="filterCategory('face')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <g fill="none">
                                <path
                                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                <path fill="currentColor"
                                    d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m2.8 9.857a1 1 0 1 1 1.4 1.428A5.98 5.98 0 0 1 12 17a5.98 5.98 0 0 1-4.2-1.715a1 1 0 0 1 1.4-1.428A3.98 3.98 0 0 0 12 15c1.09 0 2.077-.435 2.8-1.143M8.5 8a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m7 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" />
                            </g>
                        </svg>
                    </span>
                    <span class="btn-emoji" @click="filterCategory('light')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 22q-.65 0-1.175-.312T10 20.85q-.825 0-1.412-.587T8 18.85V15.3q-1.475-.975-2.363-2.575T4.75 9.25q0-3.025 2.113-5.137T12 2t5.138 2.113T19.25 9.25q0 1.925-.888 3.5T16 15.3v3.55q0 .825-.587 1.413T14 20.85q-.3.525-.825.838T12 22m-2-3.15h4v-.9h-4zm0-1.9h4V16h-4zM12.75 14v-2.7l2.2-2.2l-1.05-1.05l-1.9 1.9l-1.9-1.9L9.05 9.1l2.2 2.2V14z" />
                        </svg>
                    </span>
                    <span class="btn-emoji" @click="filterCategory('flag')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                d="M24.04 42.5c10.215 0 18.46-8.285 18.46-18.54c0-10.215-8.245-18.46-18.46-18.46C13.785 5.5 5.5 13.745 5.5 23.96c0 10.255 8.285 18.54 18.54 18.54m16.012-27.75H7.96m32.195 18.275H7.857M5.6 24h36.8M24.04 5.5v37" />
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                d="M24.02 42.5c5.108 0 9.23-8.285 9.23-18.54c0-10.215-4.122-18.46-9.23-18.46c-5.128 0-9.27 8.245-9.27 18.46c0 10.255 4.142 18.54 9.27 18.54" />
                        </svg>
                    </span>
                </div>
                <div class="emoji-picker_row">
                    <div class="search-emoji-wrapper">
                        <div class="flex items-center gap-[6px] w-[150px]">
                            <span class="search-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
                                </svg>
                            </span>
                            <input type="search" placeholder="Search Emoji" v-model="searchEmojiText">
                        </div>
                        <div class="search-emoji-category overflow-x-auto w-[180px] flex items-center gap-1">
                            <div>
                                <span 
                                    class="emoji-category-btn" 
                                    @click="filterCategory('heart')" 
                                    :class="{'active':searchEmojiCategory.category=='heart'}"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3" />
                                    </svg>
                                </span>
                            </div>
                            <div>
                                <span 
                                    class="emoji-category-btn" 
                                    @click="filterCategory('hand-fingers-closed','up')"
                                    :class="{'active':searchEmojiCategory.category=='hand-fingers-closed' && searchEmojiCategory.name=='up' }"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="m20.975 12.185l-.739-.128zm-.705 4.08l-.74-.128zM6.938 20.477l-.747.065zm-.812-9.393l.747-.064zm7.869-5.863l.74.122zm-.663 4.045l.74.121zm-6.634.411l-.49-.568zm1.439-1.24l.49.569zm2.381-3.653l-.726-.189zm.476-1.834l.726.188zm1.674-.886l-.23.714zm.145.047l.229-.714zM9.862 6.463l.662.353zm4.043-3.215l-.726.188zm-2.23-1.116l-.326-.675zM3.971 21.471l-.748.064zM3 10.234l.747-.064a.75.75 0 0 0-1.497.064zm17.236 1.823l-.705 4.08l1.478.256l.705-4.08zm-6.991 9.193H8.596v1.5h4.649zm-5.56-.837l-.812-9.393l-1.495.129l.813 9.393zm11.846-4.276c-.507 2.93-3.15 5.113-6.286 5.113v1.5c3.826 0 7.126-2.669 7.764-6.357zM13.255 5.1l-.663 4.045l1.48.242l.663-4.044zm-6.067 5.146l1.438-1.24l-.979-1.136L6.21 9.11zm4.056-5.274l.476-1.834l-1.452-.376l-.476 1.833zm1.194-2.194l.145.047l.459-1.428l-.145-.047zm-1.915 4.038a8.4 8.4 0 0 0 .721-1.844l-1.452-.377A7 7 0 0 1 9.2 6.11zm2.06-3.991a.89.89 0 0 1 .596.61l1.452-.376a2.38 2.38 0 0 0-1.589-1.662zm-.863.313a.52.52 0 0 1 .28-.33l-.651-1.351c-.532.256-.932.73-1.081 1.305zm.28-.33a.6.6 0 0 1 .438-.03l.459-1.428a2.1 2.1 0 0 0-1.548.107zm2.154 8.176h5.18v-1.5h-5.18zM4.719 21.406L3.747 10.17l-1.494.129l.971 11.236zm-.969.107V10.234h-1.5v11.279zm-.526.022a.263.263 0 0 1 .263-.285v1.5c.726 0 1.294-.622 1.232-1.344zM14.735 5.343a5.5 5.5 0 0 0-.104-2.284l-1.452.377a4 4 0 0 1 .076 1.664zM8.596 21.25a.916.916 0 0 1-.911-.837l-1.494.129a2.416 2.416 0 0 0 2.405 2.208zm.03-12.244c.68-.586 1.413-1.283 1.898-2.19L9.2 6.109c-.346.649-.897 1.196-1.553 1.76zm13.088 3.307a2.416 2.416 0 0 0-2.38-2.829v1.5c.567 0 1 .512.902 1.073zM3.487 21.25c.146 0 .263.118.263.263h-1.5c0 .682.553 1.237 1.237 1.237zm9.105-12.105a1.583 1.583 0 0 0 1.562 1.84v-1.5a.083.083 0 0 1-.082-.098zm-5.72 1.875a.92.92 0 0 1 .316-.774l-.98-1.137a2.42 2.42 0 0 0-.83 2.04z" />
                                    </svg>
                                </span>
                            </div>
                            <div>
                                <span 
                                    class="emoji-category-btn" 
                                    @click="filterCategory('hand-fingers-closed','down')"
                                    :class="{'active':searchEmojiCategory.category=='hand-fingers-closed' && searchEmojiCategory.name=='down' }"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="m20.975 11.815l-.739.128zm-.705-4.08l-.74.128zM6.938 3.523l-.747-.065zm-.812 9.393l.747.064zm7.869 5.863l.74-.122zm-.663-4.045l.74-.121zm-6.634-.412l-.49.569zm1.439 1.24l.49-.568zm2.381 3.654l-.726.189zm.476 1.834l.726-.188zm1.674.886l-.23-.714zm.145-.047l.229.714zm-2.951-4.352l.662-.353zm4.043 3.216l-.726-.189zm-2.23 1.115l-.326.675zM3.971 2.529l-.748-.064zM3 13.766l.747.064a.75.75 0 0 1-1.497-.064zm17.236-1.823l-.705-4.08l1.478-.256l.705 4.08zM13.245 2.75H8.596v-1.5h4.649zm-5.56.838l-.812 9.392l-1.495-.129l.813-9.393zm11.846 4.275c-.507-2.93-3.15-5.113-6.286-5.113v-1.5c3.826 0 7.126 2.669 7.764 6.357zM13.255 18.9l-.663-4.045l1.48-.242l.663 4.044zm-6.067-5.146l1.438 1.24l-.979 1.137l-1.438-1.24zm4.056 5.274l.476 1.834l-1.452.376l-.476-1.833zm1.194 2.194l.145-.047l.459 1.428l-.145.047zm-1.915-4.038c.312.584.555 1.203.721 1.844l-1.452.377A7 7 0 0 0 9.2 17.89zm2.06 3.991a.89.89 0 0 0 .596-.61l1.452.376a2.38 2.38 0 0 1-1.589 1.662zm-.863-.313a.51.51 0 0 0 .28.33l-.651 1.351a2.01 2.01 0 0 1-1.081-1.305zm.28.33a.6.6 0 0 0 .438.03l.459 1.428a2.1 2.1 0 0 1-1.548-.107zm2.154-8.176h5.18v1.5h-5.18zM4.719 2.594L3.747 13.83l-1.494-.129l.971-11.236zm-.969-.107v11.279h-1.5V2.487zm-.526-.022a.263.263 0 0 0 .263.285v-1.5c.726 0 1.294.622 1.232 1.344zm11.511 16.192c.125.76.09 1.538-.104 2.284l-1.452-.377c.14-.543.167-1.11.076-1.664zM8.596 2.75a.916.916 0 0 0-.911.838l-1.494-.13A2.416 2.416 0 0 1 8.596 1.25zm.03 12.244c.68.586 1.413 1.283 1.898 2.19l-1.324.707c-.346-.649-.897-1.196-1.553-1.76zm13.088-3.307a2.416 2.416 0 0 1-2.38 2.829v-1.5a.916.916 0 0 0 .902-1.073zM3.487 2.75a.263.263 0 0 0 .263-.263h-1.5c0-.682.553-1.237 1.237-1.237zm9.105 12.105a1.583 1.583 0 0 1 1.562-1.84v1.5c-.05 0-.09.046-.082.098zm-5.72-1.875a.92.92 0 0 0 .316.774l-.98 1.137a2.42 2.42 0 0 1-.83-2.04z" />
                                    </svg>
                                </span>
                            </div>
                            <div>
                                <span 
                                    class="emoji-category-btn" 
                                    @click="filterCategory('face')"
                                    :class="{'active':searchEmojiCategory.category=='face'}"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <g fill="none">
                                            <path
                                                d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                            <path fill="currentColor"
                                                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m2.8 9.857a1 1 0 1 1 1.4 1.428A5.98 5.98 0 0 1 12 17a5.98 5.98 0 0 1-4.2-1.715a1 1 0 0 1 1.4-1.428A3.98 3.98 0 0 0 12 15c1.09 0 2.077-.435 2.8-1.143M8.5 8a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m7 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div>
                                <span 
                                    class="emoji-category-btn" 
                                    @click="filterCategory('face')"
                                    :class="{'active':searchEmojiCategory.category=='face'}"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                                        <path fill="currentColor"
                                            d="M8.5 8.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m4 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2m.303 2.5c-1.274 0-2.52.377-3.58 1.084a.5.5 0 0 0 .554.832A5.45 5.45 0 0 1 12.803 13h.797a.5.5 0 0 0 0-1zM2 10a8 8 0 1 1 16 0a8 8 0 0 1-16 0m8-7a7 7 0 1 0 0 14a7 7 0 0 0 0-14" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="emoji-list-wrapper">
                    <template v-for="(gr,index) of emojiList" :key="gr.group + index" v-if="!searchEmojiText && !searchEmojiCategory">
                        <p class="text-center my-2 font-semibold" style="letter-spacing: 1px;">{{ gr.group }}</p>
                        <ul class="emoji-picker-list" >
                            <li class="emoji-picker-list_item"
                                v-for="(emo,idx) of gr.emojis"
                                :key="emo.codes + idx"
                                @click="emits('selected', emo.char)"
                            >
                                <span>
                                    {{ emo.char }}
                                </span>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <ul class="emoji-picker-list" >
                            <li class="emoji-picker-list_item"
                                v-for="(emo,idx) of getEmojis"
                                :key="emo.codes + idx"
                                @click="emits('selected', emo.char)"
                            >
                                <span v-html="emo.char">
                                </span>
                            </li>
                        </ul>
                    </template>
                    <span  
                        v-if="(searchEmojiText || searchEmojiCategory) && !getEmojis.length"
                        class="no-emoji-found"
                    >
                        No Emoji found
                    </span>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss">
.emoji-picker {
    border-radius: 20px;
    background-color: var(--shap-bg-color);
    overflow: hidden;
    height: fit-content;
    .emoji-list-wrapper {
        padding: 10px;
        margin: 10px 0;
        width: 382px;
        overflow-x: hidden;
        height: 371px;
        overflow-y: auto;
        position: relative;
        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgb(198, 198, 198);
            border-radius: 20px;
        }

        .emoji-picker-list {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            .emoji-picker-list_item {
                font-size: 25px;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;

                &:hover {
                    background-color: rgba(170, 170, 170, 0.08);
                }
            }
        }

    }

    .btn-emoji {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        cursor: pointer;
        &:hover {
            background-color: rgba(170, 170, 170, 0.08);
        }
    }

    .emoji-picker_row {
        padding: 5px 10px;
        display: flex;
        align-items: center;
        gap: 5px;
        overflow: hidden;

        .search-emoji-wrapper {
            background-color: rgba(255, 255, 255, .06);
            width: 100%;
            height: 38px;
            padding: 0 15px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;

            input {
                height: 100%
            }

            .search-icon svg {
                font-size: 25px;
                color: #aaaaaa;
            }

            .emoji-category-btn {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                &.active,
                &:hover {
                    background-color: rgba(170, 170, 170, 0.08);
                }

                svg {
                    font-size: 20px;
                    color: #aaaaaa;
                }
            }

            .search-emoji-category::-webkit-scrollbar {
                display: none
            }
        }
    }
}
.no-emoji-found {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-weight: 600;
    opacity: .6;
    letter-spacing: 1px;
}
.emojipickerbox-enter-active {
    animation: __emojipickerbox_enter .2s ease-in-out forwards;
}
.emojipickerbox-leave-active {
    animation: __emojipickerbox_leave .2s ease-in-out forwards;
}
@keyframes __emojipickerbox_enter {
    0% {
        opacity: 0;
        max-height: 200px;
    }
    100% {
        opacity: 1;
        max-height: 500px;
    }
}
@keyframes __emojipickerbox_leave {
    0% {
        opacity: 1;
        max-height: 500px;
    }
    100% {
        max-height: 200px;
        opacity: 0;
    }
}

</style>