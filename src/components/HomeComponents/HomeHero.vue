<template>
  <div class="bg-cover h-[550px] import-img px-7 md:px-20 2xl:px-52 pt-20 sm:pt-0 overflow-hidden">
    <div
      class="w-full h-full flex justify-center md:justify-end items-center px-8 lg:pe-16"
    >
      <div
        class="w-[100%] md:w-[65%] lg:w-[50%] xl:w-[45%] h-fit bg-[#fff3e3]/90 p-7 pt-10 pr-10" v-scroll-animate="'animate__fadeInRight'"
      >
        <p class="font-semibold text-xs pb-2">New Arrival</p>
        <p
          class="text-3xl md:text-4xl text-primary font-bold leading-[36px] md:leading-[45px] lg:leading[56px] pb-3"
        >
          Discover Our New Collection
        </p>
        <p class="text-sm md:text-base">
          Explore the latest trends in home furnishings. Elevate your living
          space with our elegant and stylish new arrivals.
        </p>
        <button
          class="px-14 text-white font-semibold text-sm mt-6 md:mt-8 xl:mt-11 py-4 bg-primary"
        >
          BUY NOW
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.import-img {
  background-image: url("../../assets/hero.png");
  background-position: center;
}
</style>
