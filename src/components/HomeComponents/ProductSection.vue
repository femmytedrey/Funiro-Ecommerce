<template>
  <div class="space-y-2 lg:space-y-4 pt-2 pb-6">
    <div class="text-center pb-3 lg:pb-6 px-3">
      <p class="font-semibold text-2xl lg:text-3xl">Our Products</p>
    </div>

    <div
      class="px-7 md:px-20 grid grid-cols-1 sm:grid-cols-2 midBreak:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-5 cursor-pointer pb-5"
    >
      <div
        v-for="(product, index) in displayProducts"
        :key="index"
        @mouseenter="isHover = index"
        @mouseleave="isHover = null"
        class="h-[320px] midBreak:h-[260px] nextMidBreak:h-[280px] md:h-[320px] mlg:h-[350px] midBreak:w-[200px] nextMidBreak:w-[220px] md:w-[230px] mlg:w-[260px] flex flex-col bg-[#F4F5F7] relative overflow-hidden"
      >
        <div
          :class="isHover === index ? 'translate-y-0' : '-translate-y-full'"
          class="absolute w-full h-full bg-black/40 flex flex-col justify-center items-center gap-y-5 transition-transform duration-500"
        >
          <button
            class="px-10 text-sm font-semibold text-primary hover:text-white py-3 bg-white hover:bg-primary transition-all duration-300 ease-in-out"
          >
            Add to cart
          </button>
          <div class="text-white flex gap-x-5">
            <button
              class="transition-all ease-in-out duration-300 gap-x-1 hover:gap-x-2 flex"
            >
              <p><i class="fa-regular fa-share-from-square text-thin"></i></p>
              Share
            </button>
            <!-- <div>Compare</div> -->
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
            :src="product.imgUrl"
            class="w-full h-full object-cover object-center"
            alt=""
          />
        </div>
        <div class="flex flex-col p-4 space-y-2">
          <p class="font-semibold text-lg">{{ product.name }}</p>
          <p class="text-sm text-textGreyLight">{{ product.description }}</p>
          <div class="space-x-3">
            <p class="inline-block font-semibold text-lg">
              ${{ product.price }}
            </p>
            <p
              class="inline-block text-sm text-textGreyLight line-through font-light"
            >
              ${{ product.originalPrice }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center pb-10">
      <button
        v-if="showMore < ProductImageData.length"
        @click="loadMore"
        class="border-[1.5px] font-semibold text-primary border-primary py-3 px-16 cursor-pointer hover:bg-primary hover:text-white hover:border-none transition-all duration-300 ease-in-out"
      >
        Show More
      </button>
    </div>
  </div>
</template>

<script>
import { ProductImageData } from "../../assets/ProductImageData";
export default {
  data() {
    return {
      ProductImageData,
      isHover: null,
      showMore: 4,
    };
  },
  methods: {
    loadMore() {
      this.showMore = this.showMore + 4;
    },
  },
  computed: {
    displayProducts() {
      return this.ProductImageData.slice(0, this.showMore);
    },
  },
};
</script>
