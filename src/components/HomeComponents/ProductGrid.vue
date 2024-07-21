<template>
  <div
    class="px-7 md:px-20 grid grid-cols-1 sm:grid-cols-2 midBreak:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-5 cursor-pointer pb-5"
  >
    <div
      v-for="(product, index) in paginatedProduct"
      :key="index"
      @mouseenter="isHover = index"
      @mouseleave="isHover = null"
      class="h-[320px] midBreak:h-[260px] nextMidBreak:h-[280px] md:h-[320px] mlg:h-[350px] midBreak:w-[200px] nextMidBreak:w-[220px] md:w-[230px] mlg:w-[260px] flex flex-col bg-[#F4F5F7] relative overflow-hidden"
    >
      <div
        :class="isHover === index ? 'translate-y-0' : '-translate-y-full'"
        class="absolute w-full h-full bg-black/40 flex flex-col justify-center items-center gap-y-5 transition-transform duration-500"
      >
        <!-- view each product -->
        <router-link
          :to="{ name: 'ProductDetail', params: { id: product.id } }"
          class="px-10 text-sm font-semibold text-primary hover:text-white py-3 bg-white hover:bg-primary transition-all duration-300 ease-in-out"
        >
          View Product
        </router-link>

        <button
          class="px-10 text-sm font-semibold text-white hover:text-primary transition-all duration-300 ease-in-out"
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
          <p class="inline-block font-semibold text-lg">${{ product.price }}</p>
          <p
            class="inline-block text-sm text-textGreyLight line-through font-light"
          >
            ${{ product.originalPrice }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center gap-x-3 my-8" v-if="totalPages > 1">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      :class="
        currentPage === 1
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer font-medium hover:text-primary '
      "
      class="px-4 py-2"
    >
      Prev
    </button>

    <template v-if="totalPages > 1">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="gotoPage(page)"
        class="py-2 px-4 rounded mx-1"
        :class="
          page === currentPage
            ? 'bg-primary text-white'
            : 'bg-primaryLight text-primary'
        "
      >
        {{ page }}
      </button>
    </template>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      :class="
        currentPage === totalPages
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer font-medium hover:text-primary '
      "
      class="px-4 py-2"
    >
      Next
    </button>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ProductImageData } from "../../assets/ProductImageData";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const products = ref(ProductImageData);
    const isHover = ref(null);
    const currentPage = ref(parseInt(route.query.page) || 1);
    const itemsPerPage = ref(16);
    const maxVisiblePages = 5;

    const paginatedProduct = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return products.value.slice(start, end);
    });

    const totalPages = computed(() =>
      Math.ceil(products.value.length / itemsPerPage.value)
    );

    const updateRoute = (page) => {
      router.push({ query: { page } });
      window.scrollTo({ top: 0 });
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        updateRoute(currentPage.value);
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        updateRoute(currentPage.value);
      }
    };

    const gotoPage = (page) => {
      currentPage.value = page;
      updateRoute(page);
    };

    watch(
      () => route.query.page,
      (newPage) => {
        currentPage.value = parseInt(newPage) || 1;
      }
    );

    const visiblePages = computed(() => {
      const total = totalPages.value;
      const current = currentPage.value;

      let start = Math.max(1, current - Math.floor(maxVisiblePages / 2));
      let end = Math.min(total, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    return {
      paginatedProduct,
      isHover,
      totalPages,
      currentPage,
      nextPage,
      prevPage,
      gotoPage,
      visiblePages,
    };
  },
};
</script>
