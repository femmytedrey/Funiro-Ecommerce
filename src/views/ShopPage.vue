<template>
  <div class="py-40 flex justify-center items-center font-semibold text-2xl">
    Welcome to Shop
  </div>
  <ProductGrid />
</template>

<script>
import ProductGrid from "../components/HomeComponents/ProductGrid.vue";
export default {
  components: {
    ProductGrid,
  },
};
</script>
