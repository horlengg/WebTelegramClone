import { createRouter,createWebHistory } from "vue-router";

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/k',
            name : 'Home',
            component : () => import('@/views/Home.vue')
        },
        {
            path : '/k/:username',
            name : 'Chat',
            component : () => import('@/views/Home.vue')
        },
        {
            path : '/',
            name : 'Login',
            component : () => import('@/views/Login.vue'),
            meta : {
                isCleanLaout : true
            }
        },
    ]
})

export default router;