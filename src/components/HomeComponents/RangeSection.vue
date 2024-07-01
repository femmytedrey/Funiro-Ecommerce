<template>
  <div class="space-y-2 lg:space-y-4 pt-9 md:pt-14 pb-6">
    <div
      class="space-y-3 text-center pb-6 lg:pb-9 px-3 sm:px-12 md:px-24 xl:px-56"
    >
      <p class="font-semibold text-2xl lg:text-3xl">Browse The Range</p>
      <p class="text-textGrey text-sm sm:text-lg">
        Find the perfect pieces to complement your home. Our curated collection
        offers quality and style for every taste.
      </p>
    </div>

    <div class="flex w-full scroll-container overflow-scroll px-3 pb-6">
      <div class="flex slide-animation gap-x-7">
        <div
          v-for="item in infiniteCarouselData"
          :key="item.id"
          class="flex flex-col text-center cursor-pointer hover:text-primary bg-white shadow-lg rounded-xl"
        >
          <div
            class="h-[190px] md:h-[220px] w-[290px] md:w-[320px] rounded-t-xl overflow-hidden"
          >
            <img
              :src="item.imgUrl"
              class="w-full md:w-auto h-auto md:h-full hover:scale-110 cursor-pointer transition-transform duration-400 ease-in-out"
              alt=""
            />
          </div>
          <div class="py-6 text-xl">{{ item.name }}</div>
        </div>
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
  computed: {
    infiniteCarouselData() {
      return [...this.CarouselData, ...this.CarouselData];
    },
  },
};
</script>

<style>
.scroll-container::-webkit-scrollbar {
  width: 0 !important;
}

.scroll-container {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

@media screen and (min-width: 900px) {
  .scroll-container {
    overflow: hidden;
  }
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .slide-animation {
    animation: 70s slide infinite linear; /* infinite to make it run over and over and linear to make sure there's no slow down */
    animation-fill-mode: forwards;
  }

  .scroll-container:hover .slide-animation {
    animation-play-state: paused;
  }
}
</style>
