<template>
  <div class="space-y-6 px-4 lg:px-6 pt-5 pb-10 ">
    <div
      class="flex flex-col sm:flex-row items-start gap-3 sm:items-center justify-between"
    >
      <h1 class="text-2xl text-gray-900">
        Manage Your Products
      </h1>

      <!-- Add Product Button -->
      <button
        class="bg-primary text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-primary/90 transition-colors"
      >
        Add Product
      </button>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="product in products"
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
          <p class="text-xs md:text-sm text-gray-500">{{ product.category }}</p>
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
            >
              Edit
            </button>
            <button
              class="flex-1 border border-red-500 text-red-500 py-2 rounded-lg text-xs md:text-sm hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductsStore } from '../Store/productStore';
import { ref } from 'vue';
import { formatCurrency } from '@/utils/formatters';


const productStore = useProductsStore()
const products = ref([])

onMounted(async() => {
    await productStore.fetchProduct()
    products.value = productStore.products
})
</script>
