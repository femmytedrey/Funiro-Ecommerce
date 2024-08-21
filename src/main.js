import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/global.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createPinia } from "pinia";
import { useAuthStore } from "./components/Store/auth.store";
import { useCartStore } from "./components/Store/useCartStore";

createApp(App).use(createPinia()).use(router).mount("#app");
const authStore = useAuthStore();
authStore.initAuthState();
const cartStore = useCartStore()
cartStore.initializeCart()

