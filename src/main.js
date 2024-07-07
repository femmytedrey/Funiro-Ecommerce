import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/global.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createPinia } from "pinia";
import { useAuthStore } from "./components/Store/auth.store";

createApp(App).use(createPinia()).use(router).mount("#app");
const authStore = useAuthStore();
authStore.initAuthState();

console.log('Environment Variables:', process.env)
console.log('Firebase API Key:', process.env.VUE_APP_FIREBASE_API_KEY)
console.log('Firebase Auth Domain:', process.env.VUE_APP_FIREBASE_AUTH_DOMAIN)
