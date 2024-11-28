<template>
  <div
    class="bg px-7 md:px-20 2xl:px-52 relative py-24 mb-20 flex flex-col justify-center items-center"
  >
    <div class="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>

    <div
      class="z-10 text-center space-y-3"
      v-scroll-animate="'animate__fadeInUp'"
    >
      <p class="text-3xl mmd:text-4xl font-bold">Shop</p>
      <p class="text-lg mmd:text-xl text-primaryText animate__slower" v-scroll-animate="'animate__fadeInUp'">
        Explore our new trends
      </p>
    </div>
  </div>
  <ProductGrid />
</template>

<script>
import ProductGrid from "../components/ShopComponents/ProductGrid.vue";
export default {
  components: {
    ProductGrid,
  },
};
</script>

<style scoped>
.bg {
  background-image: url("@/assets/sofa.jpg");
  background-position: center;
  filter: grayscale(30%);
}
</style>
