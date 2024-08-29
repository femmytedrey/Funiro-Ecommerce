<template>
  <div class="px-7 md:px-20 2xl:px-52">
    <!-- Product Grid -->
    <div
      v-if="isPaginationLoading"
      class="grid grid-cols-2 sm:grid-cols-2 midBreak:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-4 md:gap-y-7 cursor-pointer pb-10"
    >
      <!-- Skeleton Loader -->
      <div
        v-for="n in skeletonCount"
        :key="n"
        class="h-[210px] mobile:h-[320px] midBreak:h-[260px] nextMidBreak:h-[280px] md:h-[320px] mlg:h-[350px] midBreak:w-[200px] nextMidBreak:w-[220px] md:w-[230px] mlg:w-[260px] bg-gray-200 animate-pulse"
      >
        <div class="w-full h-[70%] bg-gray-300"></div>
        <div class="p-4 space-y-1 md:space-y-2">
          <div class="w-3/4 h-4 bg-gray-300"></div>
          <div class="w-1/2 h-4 bg-gray-300"></div>
          <div class="w-1/3 h-4 bg-gray-300"></div>
        </div>
      </div>
    </div>

    <div v-else>
      <div
        class="grid grid-cols-2 sm:grid-cols-2 midBreak:grid-cols-3 xl:grid-cols-4  gap-x-4 md:gap-x-7 gap-y-4 md:gap-y-7 cursor-pointer pb-10"
      >
        <div
          v-for="(product, index) in paginatedProduct"
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
          <div class="h-[70%] w-full overflow-hidden">
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

      <!-- Pagination Controls -->
      <div class="flex justify-center gap-x-3 my-8" v-if="totalPages > 1">
        <button
          @click="prevPage"
          :disabled="currentPage === 1 || isPaginationLoading"
          :class="
            currentPage === 1 || isPaginationLoading
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
          :disabled="currentPage === totalPages || isPaginationLoading"
          :class="
            currentPage === totalPages || isPaginationLoading
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer font-medium hover:text-primary '
          "
          class="px-4 py-2"
        >
          Next
        </button>
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
    const cartStore = useCartStore();
    const authStore = useAuthStore();

    const isPaginationLoading = ref(false);
    const isHover = ref(null);
    const skeletonCount = ref(4);

    const addToCart = async (productId, quantity) => {
      if (!authStore.isAuthenticated) {
        alert("Please log in to add items to cart");
        router.push("/auth/login");
        return;
      }
      try {
        await cartStore.addToCart(productId, quantity);
        console.log("Product added successfully");
      } catch (error) {
        console.log(cartStore.error);
      }
    };

    onMounted(() => {
      const page = parseInt(route.query.page) || 1;
      fetchProducts(page);
      if (productsStore.currentPage > 1) {
        gotoPage(1);
      }
    });

    const fetchProducts = async (page) => {
      isPaginationLoading.value = true;
      await productsStore.fetchProducts(page, props.itemsPerPage);
      isPaginationLoading.value = false;
    };

    const currentPage = computed(() => productsStore.currentPage);

    const paginatedProduct = computed(() =>
      productsStore.paginatedProduct(props.itemsPerPage)
    );

    const totalPages = computed(() =>
      productsStore.totalPages(props.itemsPerPage)
    );

    const updateRoute = (page) => {
      router.push({ query: { page } });
      window.scrollTo({ top: 0 });
    };

    const nextPage = async () => {
      if (currentPage.value < totalPages.value) {
        const nextPageNumber = currentPage.value + 1;
        updateRoute(nextPageNumber);
        isPaginationLoading.value = true;
        await fetchProducts(nextPageNumber);
        productsStore.nextPage(props.itemsPerPage);
      }
    };

    const prevPage = async () => {
      if (currentPage.value > 1) {
        const prevPageNumber = currentPage.value - 1;

        // Update route first
        updateRoute(prevPageNumber);

        // Show loading state immediately on the previous page
        isPaginationLoading.value = true;

        // Fetch the previous page's data
        await fetchProducts(prevPageNumber);

        // Move to the previous page after loading
        productsStore.prevPage(props.itemsPerPage);
      }
    };

    const gotoPage = async (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        updateRoute(pageNumber);
        isPaginationLoading.value = true;
        await fetchProducts(pageNumber);
      }
    };

    // Define pages to be shown
    const visiblePages = computed(() => {
      const pages = [];
      const total = totalPages.value;

      const start = Math.max(
        1,
        currentPage.value - Math.floor(props.maxVisiblePages / 2)
      );
      const end = Math.min(total, start + props.maxVisiblePages - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    });

    watch(
      () => route.query.page,
      (newPage) => {
        productsStore.currentPage = parseInt(newPage) || 1;
      }
    );

    return {
      isPaginationLoading,
      isHover,
      skeletonCount,
      addToCart,
      currentPage,
      paginatedProduct,
      totalPages,
      nextPage,
      prevPage,
      gotoPage,
      visiblePages,
    };
  },
};
</script>

<style scoped>
.skeleton {
  background-color: #e0e0e0;
  width: 100%;
  height: 210px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .skeleton {
    height: 320px;
  }
}

@media (min-width: 1024px) {
  .skeleton {
    height: 350px;
  }
}

.skeleton::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 25%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.2) 75%
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.skeleton-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.skeleton-content div {
  background-color: #d0d0d0;
  height: 20px;
  width: 80%;
  margin: 5px 0;
  border-radius: 4px;
}

.skeleton-content div.small {
  width: 60%;
  height: 15px;
}
</style>
