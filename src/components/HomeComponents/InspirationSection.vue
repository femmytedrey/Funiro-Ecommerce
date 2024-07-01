<template>
  <div class="bg-primaryLight flex  py-10 flex-col lg:flex-row gap-y-6">
    <div class="w-[100%] px-6 lg:px-20 items-center text-center lg:w-[40%] flex flex-col justify-center">
      <p class="text-2xl lg:text-4xl font-semibold pb-2">50+ Beautiful rooms inspiration</p>
      <p class="text-sm pb-4 lg:pb-6">
        Our designer already made a lot of beautiful prototype of rooms that
        inspire you
      </p>
      <button class="w-fit py-3 bg-primary text-white px-8">
        Explore More
      </button>
    </div>
    <div class="w-[100%] lg:w-[60%] py-0 px-0 relative flex justify-center items-center">
        <div class="flex relative w-full h-full justify-center">
            <img
          :src="currentImage.imgUrl"
          class="w-full h-full md:w-[500px] lg:w-full lg-h-full overflow-hidden"
          :alt="currentImage.name"
        />
      <div class="absolute h-full w-full md:w-[500px] lg:w-full lg-h-full fade-custom">
        <p class="absolute bottom-6 text-3xl lg:text-5xl text-white right-[8%]">
          {{ currentImage.name }}
        </p>
      </div>
        </div>
    </div>
  </div>
</template>

<script>
import { InspirationData } from "../../assets/InspirationData";

export default {
  data() {
    return {
      InspirationData,
      currentId: 1,
    };
  },
  computed: {
    currentImage() {
      return this.InspirationData.find((item) => item.id === this.currentId);
    },
  },
  mounted() {
    this.startCarousel();
  },
  methods: {
    startCarousel() {
      setInterval(() => {
        this.currentId =
          this.currentId === this.InspirationData.length
            ? 1
            : this.currentId + 1;
      }, 5000);
    },
  },
};
</script>

<style>
.fade-custom {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 3%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
