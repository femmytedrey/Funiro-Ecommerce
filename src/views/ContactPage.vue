<template>
  <div
    class="bg relative py-32 mb-9 flex flex-col justify-center items-center"
  >
    <div class="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
    <div class="z-10 text-center space-y-3">
      <p class="text-4xl font-medium">Contact</p>
      <p class="text-xl">Get in touch with us for any inquiries</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.bg {
  background-image: url("@/assets/sofa.jpg");
  background-position: center;
  filter: grayscale(30%);
}
</style>
