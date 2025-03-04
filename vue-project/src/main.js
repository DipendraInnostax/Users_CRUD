import './assets/main.css'
import router from './router'
import "vue3-toastify/dist/index.css";
import Vue3Toastify from "vue3-toastify";


import { createApp } from 'vue'
import App from './App.vue'


const app=createApp(App)

app.use(router)
app.use(Vue3Toastify, {
    autoClose: 1500, // Set global auto-close duration
    position: "top-right", // Define default position
  });
app.mount('#app')

