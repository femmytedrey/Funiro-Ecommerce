<template>
  <div v-if="loading" class="text-3xl text-center">Loading</div>
  <div
    v-if="product && !loading"
    class="flex px-7 md:px-20 2xl:px-52 pt-28 sm:pt-10 xl:py-12 gap-x-8 xl:gap-x-12 flex-col sm:flex-row w-full pb-8"
  >
    <div
      class="flex flex-col xl:flex-row gap-x-7 gap-y-4 h-fit sm:w-[50%] w-full"
    >
      <div
        class="flex flex-row xl:flex-col justify-between order-2 xl:order-1 gap-y-3 gap-x-3 w-full xl:w-44 h-24 xl:h-full px-0 xl:px-4 py-2 xl:py-4 xl:border-transparent bg-transparent xl:bg-primary h-fit"
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
        class="rounded-2xl overflow-hidden cursor-pointer order-1 xl:order-2 h-fit shadow-lg min-h-[300px]"
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

  <div class="border-t border-b px-7 md:px-20 2xl:px-52 py-7">
    <div class="justify-center flex gap-5 pb-6 text-xs sm:text-base">
      <button
        @click="setActiveTab('description')"
        :class="activeTab === 'description' ? 'font-semibold' : 'text-gray-400'"
      >
        Description
      </button>
      <button
        @click="setActiveTab('additionalInfo')"
        :class="
          activeTab === 'additionalInfo' ? 'font-semibold' : 'text-gray-400'
        "
      >
        Additional Information
      </button>
      <button
        @click="setActiveTab('reviews')"
        :class="activeTab === 'reviews' ? 'font-semibold' : 'text-gray-400'"
      >
        Reviews[5]
      </button>
    </div>

    <div v-if="activeTab === 'description' && product">
      <div class="text-center px-0 md:px-10 text-sm text-gray-500">
        {{product.additionalDescription}}
      </div>
      <div class="flex flex-col sm:flex-row justify-center bg-primaryLight p-6 my-5 gap-6">
        <div v-for="(images, index) in product.additionalImages" :key="index" >
          <img :src="images" class="h-64 w-full object-cover" alt="index"/>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'additionalInfo'" class="text-center px-0 md:px-10 text-sm text-gray-500">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis officia error quasi iure velit, id beatae autem veniam maiores ullam, expedita molestias soluta? Aliquam dolorem, suscipit ex accusamus illum ipsam sed eaque iusto nemo obcaecati. Culpa asperiores libero amet tenetur, ducimus at quis cupiditate, qui quas enim minus aperiam corrupti.
    </div>
    <div v-if="activeTab === 'reviews'">For Reviews</div>
  </div>

  <div class="px-7 md:px-20 2xl:px-52 py-10">
    <h2 class="text-2xl font-semibold mb-7 text-center">Related Products</h2>
    <div
      class="grid grid-cols-2 sm:grid-cols-2 midBreak:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-4 md:gap-y-7 cursor-pointer"
    >
      <div
        v-for="(relatedProduct, index) in relatedProducts"
        :key="relatedProduct._id"
        @mouseenter="isHover = index"
        @mouseleave="isHover = null"
        class="h-[210px] mobile:h-[320px] midBreak:h-[260px] nextMidBreak:h-[280px] md:h-[320px] mlg:h-[350px] midBreak:w-[200px] nextMidBreak:w-[220px] md:w-[230px] mlg:w-[260px] flex flex-col bg-[#F4F5F7] shadow-lg hover:scale-100 md:hover:scale-105 transition-all duration-300 ease-in-out hover:z-50 relative overflow-hidden"
      >
        <div
          :class="isHover === index ? 'translate-y-0' : '-translate-y-full'"
          class="absolute w-full h-full bg-black/40 flex flex-col justify-center items-center gap-y-2 mobile:gap-y-5 transition-transform duration-500"
        >
          <router-link
            :to="{ name: 'ProductDetail', params: { id: relatedProduct._id } }"
            class="px-3 mobile:px-10 text-xs mobile:text-sm font-semibold text-primary hover:text-white py-2 m:py-3 bg-white hover:bg-primary transition-all duration-300 ease-in-out"
          >
            View Product
          </router-link>
          <button
            @click="addToCart(relatedProduct._id, 1)"
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
            :src="relatedProduct.images[0]"
            class="w-full h-full object-cover object-center"
            alt=""
          />
        </div>
        <div class="flex flex-col p-4 space-y-1 md:space-y-2 h-auto">
          <p class="font-semibold text-xs md:text-lg">
            {{ relatedProduct.name }}
          </p>
          <p class="text-xs md:text-sm text-textGreyLight">
            {{ relatedProduct.description.slice(0, 17) }}...
          </p>
          <div class="space-x-3">
            <p class="inline-block font-semibold text-sm md:text-lg">
              ${{ relatedProduct.price }}
            </p>
            <p
              class="inline-block text-xs text-textGreyLight line-through font-light"
            >
              ${{ relatedProduct.originalPrice }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "../Store/productStore";
import { useCartStore } from "../Store/useCartStore";
import { useAuthStore } from "../Store/auth.store";

export default {
  setup() {
    const product = ref(null);
    const productStore = useProductsStore();
    const route = useRoute();
    const router = useRouter();
    const selectedImageIndex = ref(0);
    const defaultCartItems = ref(1);
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const activeTab = ref("description");

    const relatedProducts = ref([]);
    const isHover = ref(null);

    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };

    const fetchProductData = async (productId) => {
      product.value = await productStore.fetchProduct(productId);

      if (product.value) {
        productStore.getRelatedProducts(product.value.category, productId);
        relatedProducts.value = productStore.relatedProducts;
      }
    };


    onMounted(() => {
      const productId = route.params.id;
      fetchProductData(productId);
    });

    watch(
      () => route.params.id,
      (newId) => {
        fetchProductData(newId);
      }
    );

    const addToCart = async () => {
      if (!authStore.isAuthenticated) {
        alert("Please log in to add items to cart");
        router.push("/auth/login");
        return;
      }

      try {
        const productId = route.params.id;
        await cartStore.addToCart(productId, defaultCartItems.value);
      } catch (error) {
        console.log(cartStore.error);
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
      relatedProducts,
      isHover,
      setActiveTab,
      activeTab,
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
