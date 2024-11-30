<script setup lang="ts">
</script>

<template>
    <div class="app-aside_header flex items-center gap-2 w-full">
        <div class="flex-[.1]">
            <button class="btn-nav">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"/>
                </svg>
            </button>
        </div>
        <div class="search-box flex-1">
            <input type="search" placeholder="Search" class="search-field">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/>
            </svg>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-aside_header {
    padding: 8px 20px;
    .btn-nav {
        width: 42px;
        height: 42px;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            background-color: var(--btn-nav-hover-color);
        }
        font-size: 25px;
    }
    .search-box {
        position: relative;
        .search-field {
            width: 100%;
            height: 42px;
            background-color: var(--search-field-bg);
            padding: 0 20px 0 45px;
            border-radius: 22px;
            border-width: 1px;
            border-style: solid;
            border-color: var(--input-search-border-color);
            box-shadow : none;
            transition: border-color .3s ease-in-out,box-shadow .3s ease-in-out,background-color .3s ease-in-out;
            &::placeholder {
                color: var(--secondary-color);
                font-size: 16px;
            }
            &:hover {
                border-color: var(--secondary-color);
            }
            &:focus {
                border-color: var(--primary-color);
                box-shadow: inset 0 0 0 .7px var(--primary-color);
                background-color: transparent;
                & + svg {
                    color: var(--primary-color);
                }
            }
        }
        svg {
            position: absolute;
            left: 12px;
            top: 10px;    
            font-size: 25px;
            color: var(--secondary-color);
            transition: color .3s ease-in-out;
        }
    }
}
</style>