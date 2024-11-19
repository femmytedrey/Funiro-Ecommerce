import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/global.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createPinia } from "pinia";
import { useAuthStore } from "./components/Store/auth.store";
import { useCartStore } from "./components/Store/useCartStore";
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import { useCheckoutStore } from "./components/Store/checkout.store";

const globalOptions = {
  mode: 'auto',
};

createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueTelInput, globalOptions)
  .mount("#app");

const authStore = useAuthStore();
authStore.initAuthState();

const cartStore = useCartStore();
cartStore.initializeCart();
