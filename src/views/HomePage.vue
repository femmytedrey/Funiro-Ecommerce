<template>
  <div>
    <HomeHero />
    <RangeSection />
    <ProductSection />
  </div>
</template>

<script>
import HomeHero from "../components/HomeComponents/HomeHero.vue";
import RangeSection from "../components/HomeComponents/RangeSection.vue";
import ProductSection from "../components/HomeComponents/ProductSection.vue";
export default {
  components: {
    HomeHero,
    RangeSection,
    ProductSection,
  },
};
</script>
