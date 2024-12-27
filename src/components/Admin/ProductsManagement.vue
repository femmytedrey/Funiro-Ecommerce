<template>
  <div class="space-y-6 px-4 lg:px-6 pt-5 pb-10">
    <div
      class="flex flex-col sm:flex-row items-start gap-3 sm:items-center justify-between"
    >
      <h1 class="text-2xl text-gray-900">Manage Your Products</h1>

      <button
        @click="isModalOpen = true"
        class="bg-primary text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-primary/90 transition-colors"
      >
        Add Product
      </button>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 xl:grid-cols-4">
      <template v-if="loading">
        <div
          v-for="n in 8"
          :key="n"
          class="bg-gray-200 rounded-xl shadow-lg overflow-hidden animate-pulse"
        >
          <div class="w-full h-40 md:h-48 bg-gray-300"></div>
          <div class="p-3 md:p-4">
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="product in products.slice(0, view)"
          :key="product.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            :src="product.images[0]"
            :alt="product.name"
            class="w-full h-40 md:h-48 object-cover"
          />
          <div class="p-3 md:p-4">
            <h3
              class="text-sm md:text-lg font-semibold text-gray-900 hidden md:block"
            >
              {{ product.name }}
            </h3>
            <h3
              class="text-sm md:text-lg font-semibold text-gray-900 block md:hidden"
            >
              {{
                product.name.length > 17
                  ? `${product.name.slice(0, 17)}...`
                  : product.name
              }}
            </h3>
            <p class="text-xs md:text-sm text-gray-500">
              {{ product.category }}
            </p>
            <div class="mt-2 md:mt-4 flex justify-between items-center">
              <p class="text-sm md:text-xl font-bold text-primary">
                {{ formatCurrency(product.price) }}
              </p>
              <p class="text-xs md:text-sm text-gray-500 line-through">
                {{ formatCurrency(product.originalPrice) }}
              </p>
            </div>

            <!-- Buttons -->
            <div
              class="mt-3 md:mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2"
            >
              <button
                class="flex-1 bg-primary text-white py-2 rounded-lg text-xs md:text-sm hover:bg-primary/90 transition-colors"
                @click="editProduct(product)"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(product._id)"
                class="flex-1 border border-red-500 text-red-500 py-2 rounded-lg text-xs md:text-sm hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </template>

      <template v-if="loadmore">
        <div
          v-for="n in 8"
          :key="n"
          class="bg-gray-200 rounded-xl shadow-lg overflow-hidden animate-pulse"
        >
          <div class="w-full h-40 md:h-48 bg-gray-300"></div>
          <div class="p-3 md:p-4">
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </template>
    </div>
    <div class="flex justify-center">
      <button
        @click="increaseView"
        class="py-3 px-12 mt-8 rounded-xl border border-primary transition-all duration-200 hover:border-2 hover:font-medium"
      >
        Load more
      </button>
    </div>

    <!--Add and Edit Modal -->
    <teleport to="body">
      <AddProduct
        :isModalOpen="isModalOpen"
        @close="closeModal"
        :isEditing="isEditing"
        :product="selectedProduct"
      />
    </teleport>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useProductsStore } from "../Store/productStore";
import { ref } from "vue";
import { formatCurrency } from "@/utils/formatters";
import AddProduct from "./AddProduct.vue";

const isModalOpen = ref(false);
const isEditing = ref(false);

const productStore = useProductsStore();
const products = ref([]);
const loading = ref(true);
const loadmore = ref(false);
const view = ref(12);
const selectedProduct = ref(null);

const editProduct = async (product) => {
  isModalOpen.value = true;
  isEditing.value = true;
  selectedProduct.value = await product;
};

const closeModal = () => {
  isModalOpen.value = false;
  isEditing.value = false;
  selectedProduct.value = null;
};

const increaseView = () => {
  if (view.value < products.value.length) {
    loadmore.value = true;
    setTimeout(() => {
      view.value += 8;
      loadmore.value = false;
    }, 2000);
  } else {
    alert("No more product to load");
  }
};
const deleteProduct = async (id) => {
  try {
    await productStore.deleteProduct(id);
    await productStore.fetchProducts();
    products.value = productStore.products;
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

watch(
  () => productStore.loading,
  async (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      products.value = productStore.products;
    }
  }
);



onMounted(async () => {
  try {
    await productStore.fetchProducts();
    products.value = productStore.products;
  } finally {
    loading.value = false;
  }
});
</script>
