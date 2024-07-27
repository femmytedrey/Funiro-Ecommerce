<template>
  <div v-if="product && !loading" class="flex px-20 py-12 gap-x-12">
    <div class="flex gap-x-7 h-96 w-[50%]">
      <div class="flex flex-col gap-y-3 h-full px-4 py-4 w-44 bg-primary">
        <div
          v-for="(image, index) in product.images"
          :key="index"
          @click="selectImage(index)"
          :class="[
            `rounded overflow-hidden cursor-pointer -shadow-lg w-24`,
            selectedImageIndex === index ? 'border-4 border-white' : '',
          ]"
        >
          <img :src="image" :alt="`Image ${index + 1} of ${product.name}`" />
        </div>
      </div>

      <div
        class="rounded-2xl overflow-hidden cursor-pointer h-full shadow-lg bg-blue-700"
      >
        <img
          :src="product.images[selectedImageIndex]"
          :alt="product.name"
          class="w-full rounded-2xl transition-all duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </div>

    <div class="flex flex-col py-2 gap-y-3 w-[40%] justify-around">
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
        <div class="flex gap-x-4 border border-gray-400 rounded-lg px-2 py-2 w-fit " >
          <button class="cursor-pointer">+</button>
          1
          <button class="cursor-pointer px-2">-</button>
        </div>
        <button class="border hover:bg-primary hover:border-none hover:text-white transition-all duration-300 ease-in-out border-gray-500 px-2 py-2 rounded-lg">Add To Cart</button>
      </div>
    </div>
  </div>
  <div v-if="loading" class="text-3xl text-center">Loading</div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "../Store/productStore";

export default {
  setup() {
    const product = ref(null);
    const productStore = useProductsStore();
    const route = useRoute();
    const selectedImageIndex = ref(0);

    const loading = computed(() => productStore.loading);

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
      selectImage,
    };
  },
};
</script>
