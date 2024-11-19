<template>
  <div
    class="bg relative py-28 mb-20 flex flex-col justify-center items-center"
  >
    <div class="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>

    <div class="z-10 text-center space-y-3">
      <p class="text-4xl font-medium">Search Results</p>
      <p class="text-xl">Showing results for "{{ searchQuery }}"</p>
    </div>
  </div>
  <ResultComponent :searchQuery="searchQuery" />
  <!-- <ResultComponent :searchQuery="searchQuery" /> -->
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import ResultComponent from "../components/SearchPageComponents/ResultComponent.vue";

export default {
  components: {
    ResultComponent,
  },
  setup() {
    const route = useRoute();
    const searchQuery = computed(() => route.query.q || "");

    return {
      searchQuery,
    };
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
