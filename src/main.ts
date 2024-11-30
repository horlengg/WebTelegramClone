import { createApp } from 'vue'
import './style.scss'
import '@app/styles/index.scss'
import App from './App.vue'
import router from './app/app.router'
import ripple from './directives/ripple'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia();
app.use(router)
app.use(pinia)
app.directive('ripple',ripple)
app.mount('#app')
