<template>
  <div>
    <HomeHero />
    <component :is="RangeSection" />
    <ProductSection />
    <InspirationSection />
    <ReviewSection />
  </div>
</template>

<script>
import HomeHero from "../components/HomeComponents/HomeHero.vue";
import ProductSection from "../components/HomeComponents/ProductSection.vue";
import InspirationSection from "../components/HomeComponents/InspirationSection.vue";
import ReviewSection from "../components/HomeComponents/ReviewSection.vue";

export default {
  components: {
    HomeHero,
    ProductSection,
    InspirationSection,
    ReviewSection,
  },
  data() {
    return {
      RangeSection: null,
    };
  },
  created() {
    this.loadRangeSection();
  },
  methods: {
    async loadRangeSection() {
      try {
        const RangeSection = await import(
          "../components/HomeComponents/RangeSection.vue"
        );
        this.RangeSection = RangeSection.default;
      } catch (error) {
        console.error("Failed to load RangeSection component:", error);
      }
    },
  },
};
</script>
