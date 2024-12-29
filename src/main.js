import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/global.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createPinia } from "pinia";
import { useAuthStore } from "./components/Store/auth.store";
import { useCartStore } from "./components/Store/useCartStore";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { useCheckoutStore } from "./components/Store/checkout.store";
import { vScrollAnimate } from "./utils/animationUtils";
import "animate.css";
import { useProductsStore } from "./components/Store/productStore";

const globalOptions = {
  mode: "auto",
};

router.beforeEach(async (to, from, next) => {
  const defaultTitle = "Funiro";
  const prefix = "Funiro - ";
  if (to.name === "ProductDetail") {
    const productId = to.params.id;
    const product = await productStore.fetchProduct(productId);
    document.title = product
      ? `${prefix}${product.name}`
      : `${prefix}${to.meta.title || defaultTitle}`;
  } else {
    document.title = to.meta.title ? `${prefix}${to.meta.title}` : defaultTitle;
  }
  next();
});

const pinia = createPinia();

const authStore = useAuthStore(pinia);
authStore.initAuthState();

const cartStore = useCartStore(pinia);
cartStore.initializeCart();

const productStore = useProductsStore(pinia);
productStore.initializeProductStore();

createApp(App)
  .use(pinia)
  .use(router)
  .directive("scroll-animate", vScrollAnimate)
  .use(VueTelInput, globalOptions)
  .mount("#app");
