import { createApp } from 'vue'
import App from './App.vue'

import router from "./utils/router"
import GStore from "./utils/store";

createApp(App)
.provide("state", GStore)
.use(router)
.mount('#app')