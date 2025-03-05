import './assets/main.css'
import router from './router'
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';


const app=createApp(App)

app.use(router)
app.use(createPinia())
app.use(Toast,{
  autoClose: 1000, 
  position: "top-right", 
});


app.mount('#app')

