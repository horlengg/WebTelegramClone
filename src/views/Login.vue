<script setup lang="ts">
import { onMounted, ref, StyleValue } from 'vue';
import http from "axios"
import { HttpResponse } from '@/types/http';
import getTotalOffsetTop from '@/utils/get-offsettop';
import { useRouter } from 'vue-router';

type CountryDetail = {
    flagUrl : string,
    countryName : string,
    countryCode : string,
}

const country = ref("Cambodia")
const phoneNumber = ref("+885 ")
const listCountry = ref<CountryDetail[]>([])
const optionListStyle = ref<StyleValue>()
const isShowCountryList = ref(false)
const countrySelectorRef = ref<HTMLElement>()
    const router = useRouter()

const changePhoneNumber = (_: Event) => {
}
const fetchCountryList = async()=>{
    const data = await http.get<HttpResponse<CountryDetail[]>>("/db/countries.json")
    if(data.data.status === 200){
        listCountry.value = [...data.data.data,...data.data.data]
    }
}
const setOptionListStyle = (element:HTMLElement)=>{
    const rect = element.getBoundingClientRect();
    const toInteger = (value:number) => Math.floor(value)
    const top = getTotalOffsetTop(element)
    optionListStyle.value = {
        width : `${toInteger(rect.width)}px`,
        top : `${toInteger(top + rect.height) + 5}px`,
        left : `${toInteger(rect.left)}px`,
        position : "absolute",
        zIndex : "9999",
        backgroundColor : "#212121",
        maxHeight : '250px'
    }
    isShowCountryList.value = true
}
const handleClickDocument = ()=>{
    console.log("handleClickDocument");
    document.removeEventListener("mousedown",handleClickDocument)
    isShowCountryList.value = false
}
const setEventRemoveOptionList = ()=>{
    if(!isShowCountryList.value) return
    document.addEventListener("mousedown",handleClickDocument)
}
const focusOnCountryBox = (event:FocusEvent)=>{
    const elementSource = event.target as HTMLElement
    if(!elementSource) throw new Error("elementSource is None!.");
    setOptionListStyle(elementSource)
    setEventRemoveOptionList()
}
const handleSelectCountry = (_country:CountryDetail)=>{
    country.value = _country.countryName
    phoneNumber.value = _country.countryCode + " "
}
const clickOnArrowDownIcon = ()=>{
    if(!isShowCountryList.value) countrySelectorRef.value?.focus()
}
const signIn = ()=>{
    router.push("/k")
}
onMounted(()=>{
    fetchCountryList()
    if(countrySelectorRef.value){
        countrySelectorRef.value.addEventListener("focus",focusOnCountryBox)
    }
})


</script>

<template>
    <div class="app-login">
        <div class="w-[360px] flex flex-col items-center">
            <div class="app-telegram-logo">
            </div>
            <h4 class="brand-title">Telegram</h4>
            <p class="brand-description text-center">
                Please confirm your country code and enter your phone number.
            </p>
            <div class="w-full">
                <div class="input-box selector">
                    <input type="text" id="country" class="input-field" v-model="country" required ref="countrySelectorRef">
                    <label for="country" class="input-label">Country</label>
                    <span class="arrow-down-icon" :class="{'active':isShowCountryList}" @click="clickOnArrowDownIcon"> </span>
                </div>
                <div class="input-box">
                    <input type="text" id="phone-number" class="input-field" v-model="phoneNumber" required
                        @input="changePhoneNumber">
                    <label for="phone-number" class="input-label">Your phone number</label>
                </div>
                <div class="mt-8">
                    <label for="keepmein" class="select-none input-checkbox">
                        <input type="checkbox" id="keepmein" hidden>
                        <span class="checker">
                        </span>
                        <span>Keep me signed in</span>
                    </label>
                </div>
                <button class="app-btn-next mt-10 hover:opacity-80" v-ripple @click="signIn">Next</button>
            </div>
        </div>
        <Transition name="option">
            <div class="country-options" :style="optionListStyle" v-if="isShowCountryList">
                <ul class="option-list">
                    <li 
                        class="option-item cursor-pointer flex items-center justify-between hover:bg-[rgb(0,0,0,0.4)]" 
                        v-for="item of listCountry"
                        @click="handleSelectCountry(item)"
                    >
                        <div class="flex gap-3 items-center">
                            <span class="flag-logo inline-block" :style="{ backgroundImage: `url(${item.flagUrl})` }"></span>
                            <span>{{ item.countryName }}</span>
                        </div>
                        <span>{{ item.countryCode }}</span>
                    </li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.app-login {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #212121;
    color: #FFFF;
    min-height: 120vh;

    .app-telegram-logo {
        width: 120px;
        height: 120px;
        background-image: url("./src/app/assets/logo/telegram.svg");
        background-position: center;
        background-size: cover;
        margin-top: 100px;
    }

    .brand-title {
        font-size: 30px;
        font-weight: 600;
        margin-top: 20px;
    }

    .brand-description {
        margin-top: 20px;
        opacity: .7;
        font-size: 16px;
    }

    .input-box {
        margin-top: 40px;
        position: relative;
        .input-label {
            position: absolute;
            top: 18px;
            left: 20px;
            background-color: rgb(33, 33, 33);
            font-size: .9rem;
            padding: 0 2px;
            cursor: text;
            transition: top .3s ease, font-size .3s ease, color .3s ease;
        }

        .input-field {
            min-height: 3.375rem;
            padding: 0 20px;
            border-radius: 12px;
            border: 1px solid rgb(91, 91, 90);
            color: #FFF;
            width: 100%;
            font-size: 16px;

            &:focus,
            &:valid {
                &+.input-label {
                    top: -8px;
                    font-size: .8rem;
                    font-weight: 400;
                    color: #c7c7c7;
                }
            }
        }

        &.selector {
            .arrow-down-icon {
                position: absolute;
                right: 20px;
                top: 16px;
                display: inline-block;
                width: 20px;
                height: 20px;
                background-image: url('/src/app/assets/icon/arrow-down.svg');
                background-position: center;
                background-size: cover;
                transition: transform .3s ease;
                &.active {
                    transform: rotate(-180deg);
                }
            }
        }
        
    }
    .app-btn-next {
        height: 3.375rem;
        background-color: rgb(135,116,225);
        width: 100%;
        transition: opacity .3s ease;
        border-radius: .75rem;
        font-size: 16px;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
    .country-options {
        border-radius: 0.75rem;
        padding: .25rem 0;
        box-shadow: 0 .25rem .5rem .125rem rgb(16,16,16,0.612);
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #a4a3a3;
            border-radius: 12px;
        }
        .option-list {
            list-style-type: none;
            .option-item {
                height: 30px;
                padding: 0 20px;
                margin-top: 1px;
                .flag-logo {
                    width: 30px;
                    height: 20px;
                    background-size: cover;
                    background-position: center;
                }
            }
        }
    }
    .input-checkbox {
        display: flex;
        align-items: center;
        gap: 15px;
        input:checked + .checker {
            background-color: rgb(135,116,225);
            background-image: url("/src/app/assets/icon/checked.svg");
            background-size: cover;
            background-position: center;
        }
        .checker {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgb(135,116,225);
            border-radius: 5px;
            cursor: pointer;
            transition: backgrouond-color .3s ease;
        }
    }
}
</style>