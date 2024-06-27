<template>
  <div class="pt-10 pb-5">
    <div class="space-y-3 text-center pb-12 px-3">
      <p class="font-bold text-2xl lg:text-3xl">Browse The Range</p>
      <p class="text-textGrey text-base md:text-lg lg:text-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>

    <!-- this is the div for the carousel -->
    <div class="flex w-full gap-x-6 scroll-container overflow-x-scroll px-3">
      <div
        v-for="item in CarouselData"
        :key="item.id"
        class="flex flex-col text-center cursor-pointer hover:text-primary"
      >
        <div
          class="h-[220px] md:h-[250px] w-[290px] md:w-[320px] bg-gray-600 rounded-xl overflow-hidden"
        >
          <img
            :src="item.imgUrl"
            class="h-full hover:scale-110 cursor-pointer transition-transform duration-400 ease-in-out"
            alt=""
          />
        </div>
        <div class="py-6 text-xl">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { CarouselData } from "../../assets/CarouselData.js";
export default {
  data() {
    return {
      CarouselData,
    };
  },
};
</script>

<style>
.scroll-container {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
</style>
