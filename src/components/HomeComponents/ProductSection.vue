<template>
  <div
    class="space-y-2 lg:space-y-4 pt-2 pb-6"
    v-scroll-animate="'animate__fadeInUp'"
  >
    <div class="text-center pb-3 lg:pb-6 px-3">
      <p class="font-semibold text-2xl lg:text-3xl">Our Products</p>
    </div>

    <div
      class="px-7 md:px-20 2xl:px-52 grid grid-cols-2 sm:grid-cols-2 midBreak:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-4 md:gap-y-7 cursor-pointer pb-10"
    >
      <div
        v-for="(product, index) in displayProducts"
        :key="product._id"
        @mouseenter="isHover = index"
        @mouseleave="isHover = null"
        class="h-[210px] mobile:h-[320px] midBreak:h-[260px] nextMidBreak:h-[280px] md:h-[320px] mlg:h-[350px] midBreak:w-[200px] nextMidBreak:w-[220px] md:w-[230px] mlg:w-[260px] flex flex-col bg-[#F4F5F7] shadow-lg hover:scale-100 md:hover:scale-105 transition-all duration-300 ease-in-out hover:z-50 relative overflow-hidden"
      >
        <div
          :class="isHover === index ? 'translate-y-0' : '-translate-y-full'"
          class="absolute w-full h-full bg-black/40 flex flex-col justify-center items-center gap-y-2 mobile:gap-y-5 transition-transform duration-500"
        >
          <router-link
            :to="{ name: 'ProductDetail', params: { id: product._id } }"
            class="px-3 mobile:px-10 text-xs mobile:text-sm font-semibold text-primary hover:text-white py-2 m:py-3 bg-white hover:bg-primary transition-all duration-300 ease-in-out"
          >
            View Product
          </router-link>
          <button
            @click="addToCart(product._id, 1)"
            class="px-10 text-xs mobile:text-sm font-semibold text-white hover:text-primary transition-all duration-300 ease-in-out"
          >
            Add to cart
          </button>
          <div class="text-white flex gap-x-5 text-xs md:text-base">
            <button
              class="transition-all ease-in-out duration-300 gap-x-1 hover:gap-x-2 flex"
            >
              <p><i class="fa-regular fa-share-from-square text-thin"></i></p>
              Share
            </button>
            <button
              class="transition-all ease-in-out duration-300 gap-x-1 hover:gap-x-2 flex"
            >
              <p><i class="fa-regular fa-heart text-thin"></i></p>
              Like
            </button>
          </div>
        </div>
        <div class="h-[70%] w-full bg-gray-600 overflow-hidden">
          <img
            :src="product.images[0]"
            class="w-full h-full object-cover object-center"
            alt=""
          />
        </div>
        <div class="flex flex-col p-4 space-y-1 md:space-y-2 h-auto">
          <p class="font-semibold text-xs md:text-lg">{{ product.name }}</p>
          <p class="text-xs md:text-sm text-textGreyLight">
            {{ product.description.slice(0, 17) }}...
          </p>
          <div class="space-x-3">
            <p class="inline-block font-semibold text-sm md:text-lg">
              ${{ product.price }}
            </p>
            <p
              class="inline-block text-xs text-textGreyLight line-through font-light"
            >
              ${{ product.originalPrice }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center pb-10">
      <router-link
        :to="{ name: 'Shop' }"
        class="border-[1.5px] font-semibold text-primary border-primary py-3 px-16 cursor-pointer hover:bg-primary hover:text-white hover:border-none transition-all duration-300 ease-in-out"
      >
        Show More
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useCartStore } from "../Store/useCartStore";
import { useProductsStore } from "../Store/productStore";
import { useAuthStore } from "../Store/auth.store";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isHover = ref(null);
    const showMore = ref(4);
    const productStore = useProductsStore();
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const router = useRouter();

    onMounted(() => {
      productStore.fetchProducts();
    });

    const displayProducts = computed(() =>
      productStore.displayProducts(showMore.value)
    );

    const addToCart = async (productId, quantity) => {
      if (!authStore.isAuthenticated) {
        alert("Please log in to add items to cart");
        router.push("/auth/login");
        return;
      }

      try {
        await cartStore.addToCart(productId, quantity);
        console.log("Product added to cart successfully");
      } catch (error) {
        console.log(cartStore.error);
      }
    };

    return {
      isHover,
      displayProducts,
      addToCart,
      cartStore, // Expose cartStore to the template
    };
  },
};
</script>
