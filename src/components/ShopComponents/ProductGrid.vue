<template>
  <div
    class="px-7 md:px-20 grid grid-cols-2 sm:grid-cols-2 midBreak:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-4 md:gap-y-7 cursor-pointer pb-10"
  >
    <div
      v-for="(product, index) in paginatedProduct"
      :key="product._id"
      @mouseenter="isHover = index"
      @mouseleave="isHover = null"
      class="h-[210px] mobile:h-[320px] midBreak:h-[260px] nextMidBreak:h-[280px] md:h-[320px] mlg:h-[350px] midBreak:w-[200px] nextMidBreak:w-[220px] md:w-[230px] mlg:w-[260px] flex flex-col bg-[#F4F5F7] shadow-lg hover:scale-100 md:hover:scale-110 transition-all duration-300 ease-in-out hover:z-50 relative overflow-hidden"
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
          :src="product.images[0]"
          class="w-full h-full object-cover object-center"
          alt=""
        />
      </div>
      <div class="flex flex-col p-4 space-y-1 md:space-y-2 h-auto">
        <p class="font-semibold text-xs md:text-lg">{{ product.name }}</p>
        <p class="text-xs md:text-sm text-textGreyLight">
          {{ product.description }}
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
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "../Store/productStore";

export default {
  props: {
    itemsPerPage: {
      type: Number,
      default: 16,
    },
    maxVisiblePages: {
      type: Number,
      default: 4,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const productsStore = useProductsStore();

    const isHover = ref(null);

    onMounted(() => {
      productsStore.fetchProducts();
    });

    const currentPage = computed(() => productsStore.currentPage);

    const paginatedProduct = computed(() => productsStore.paginatedProduct(props.itemsPerPage))

    const totalPages = computed(() =>
      productsStore.totalPages(props.itemsPerPage)
    );

    const updateRoute = (page) => {
      router.push({ query: { page } });
      window.scrollTo({ top: 0 });
    };

    const nextPage = () => {
      productsStore.nextPage(props.itemsPerPage)
      updateRoute(productsStore.currentPage)
    };

    const prevPage = () => {
      productsStore.prevPage(props.itemsPerPage)
      updateRoute(productsStore.currentPage)
    };

    const gotoPage = (page) => {
      productsStore.gotoPage(page)
      updateRoute(page);
    };

    watch(
      () => route.query.page,
      (newPage) => {
        productsStore.currentPage = parseInt(newPage) || 1;
      }
    );

    const visiblePages = computed(() => productsStore.visiblePages(props.maxVisiblePages, props.itemsPerPage));

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
