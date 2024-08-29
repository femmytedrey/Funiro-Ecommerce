<template>
  <div
    v-if="product && !loading"
    class="flex px-7 md:px-20 2xl:px-52 pt-28 sm:pt-10 xl:py-12 gap-x-8 xl:gap-x-12 flex-col sm:flex-row w-full"
  >
    <div
      class="flex flex-col xl:flex-row gap-x-7 gap-y-4 h-fit sm:w-[50%] w-full"
    >
      <div
        class="flex flex-row xl:flex-col justify-between order-2 xl:order-1 gap-y-3 gap-x-3 w-full xl:w-44 h-24 xl:h-full px-0 xl:px-4 py-2 xl:py-4 xl:border-transparent bg-transparent xl:bg-primary"
      >
        <div
          v-for="(image, index) in product.images"
          :key="index"
          @click="selectImage(index)"
          :class="[
            `rounded overflow-hidden cursor-pointer -shadow-lg w-full xl:w-24 h-fit `,
            selectedImageIndex === index
              ? 'border-2 xl:border-4  border-primary xl:border-white '
              : '',
          ]"
        >
          <img
            :src="image"
            :alt="`Image ${index + 1} of ${product.name}`"
            class="object-contain"
          />
        </div>
      </div>

      <div
        class="rounded-2xl overflow-hidden cursor-pointer order-1 xl:order-2 h-fit shadow-lg"
      >
        <!-- main-image -->
        <img
          :src="product.images[selectedImageIndex]"
          :alt="product.name"
          class="object-contain rounded-2xl transition-all duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </div>

    <div class="flex flex-col py-2 gap-y-3 w-full justify-around sm:w-[40%]">
      <div class="flex flex-col gap-y-2">
        <p class="text-3xl">{{ product.name }}</p>
        <div class="flex gap-x-5 items-center">
          <p class="text-xl text-gray-500 font-medium">$ {{ product.price }}</p>
          <p class="line-through text-lg text-gray-400">
            $ {{ product.originalPrice }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-y-3">
        <p class="text-sm text-gray-400">ratings | Number of reviews</p>
        <p class="text-xs">{{ product.additionalDescription }}</p>
      </div>
      <div class="space-y-2">
        <div>
          <p class="pb-1 font-medium text-gray-500">Size</p>
          <p class="text-sm text-gray-400">{{ product.size }}</p>
        </div>
        <div>
          <p class="pb-1 font-medium text-gray-500">Category</p>
          <p class="text-sm text-gray-400">{{ product.category }}</p>
        </div>
      </div>

      <!-- add to cart -->
      <div class="flex gap-x-3">
        <div
          class="flex gap-x-4 border border-gray-400 rounded-lg px-2 py-2 w-fit"
        >
          <button class="cursor-pointer" @click="subtractItem">-</button>
          <input
            type="number"
            v-model="defaultCartItems"
            class="outline-none w-8"
            min="1"
          />
          <button class="cursor-pointer px-2" @click="addItem">+</button>
        </div>
        <button
        @click="addToCart"
          class="border hover:bg-primary hover:border-none hover:text-white transition-all duration-300 ease-in-out border-gray-500 px-2 py-2 rounded-lg flex-1 sm:flex-none"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </div>
  <div v-if="loading" class="text-3xl text-center">Loading</div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "../Store/productStore";
import { useCartStore } from "../Store/useCartStore";
import { useAuthStore } from "../Store/auth.store";

export default {
  setup() {
    const product = ref(null);
    const productStore = useProductsStore();
    const route = useRoute();
    const router = useRouter()
    const selectedImageIndex = ref(0);
    const defaultCartItems = ref(1);
    const cartStore = useCartStore();
    const authStore = useAuthStore();

    const addToCart = async () => {
      if (!authStore.isAuthenticated) {
        alert("Please log in to add items to cart");
        router.push("/auth/login");
        return;
      }

      try {
        const productId = route.params.id
        await cartStore.addToCart(productId, defaultCartItems.value)
      } catch (error) {
        console.log(cartStore.error)
      }
    };

    const loading = computed(() => productStore.loading);

    const subtractItem = () => {
      if (defaultCartItems.value > 1) {
        defaultCartItems.value--;
      }
    };

    const addItem = () => {
      defaultCartItems.value++;
    };

    onMounted(async () => {
      const productId = route.params.id;
      product.value = await productStore.fetchProduct(productId);
    });

    const selectImage = (index) => {
      selectedImageIndex.value = index;
    };

    return {
      product,
      loading,
      selectedImageIndex,
      defaultCartItems,
      selectImage,
      subtractItem,
      addItem,
      addToCart,
    };
  },
};
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
