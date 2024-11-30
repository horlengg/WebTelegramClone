<script setup lang="ts">
</script>
<template>
    <div class="app-chat_body">
        <div  class="chat-container">
            <div v-for="_ of Array.from({length : 20})" class="message-card">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam enim mollitia molestiae nisi recusandae sapiente. Voluptates reiciendis dolor libero earum facere nisi, aliquam sapiente illum at fugiat quas sed labore.
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.app-chat_body {
    padding: 20px 0;
    height: 80vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(232, 232, 232);
        border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .chat-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 65%;
        margin: 0 auto;
        .message-card {
            max-width: 40%;
            padding: 5px 20px;
            border-radius: 12px;
            &:nth-child(even){
                color: #F7F7F7;
                background-color: #212121;
            }
            &:nth-child(odd) {
                align-self: flex-end;
                background-color: #8774E1;
                color: #F7F7F7;
            }
        }
    }
}
</style>