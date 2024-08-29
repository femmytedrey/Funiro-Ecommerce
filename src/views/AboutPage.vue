<template>
  <div
    class="bg px-7 md:px-20 2xl:px-52 relative py-32 mb-9 flex flex-col justify-center items-center"
  >
    <div class="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
    <div class="z-10 text-center space-y-3">
      <p class="text-4xl font-medium">About</p>
      <p class="text-xl">Learn more about our story, values, and vision</p>
    </div>
  </div>
  <dmoVue />
</template>

<script>
import dmoVue from '@/components/Store/dmo.vue';
export default {
  components: {dmoVue},
};
</script>

<style scoped>
.bg {
  background-image: url("@/assets/sofa.jpg");
  background-position: center;
  filter: grayscale(30%);
}
</style>
