<template>
  <div class="pt-10 pb-32">
    <div>
      <p class="font-semibold text-2xl lg:text-3xl text-center pb-6">
        Our Happy Customer
      </p>
    </div>
    <div class="relative flex items-center overflow-hidden">
      <div
        class="flex overflow-x-hidden md:overflow-x-scroll w-full hidebar"
        @scroll="handleScroll"
        ref="carousel"
      >
        <div
          class="flex gap-x-4 justify-center md:justify-start w-full md:w-auto"
        >
          <div
            v-for="(review, index) in visibleReviews"
            :key="review.id"
            class="border-[1.5px] border-grey-100 w-[90%] sm:w-[380px] sm:h-[208px] flex flex-col p-5 rounded-2xl mx-auto space-y-2"
            :class="{ blur: isBlurred(index) }"
          >
            <div class="flex gap-x-1 text-[#FFC633]">
              <span
                v-for="star in 5"
                :key="star"
                class="fa"
                :class="{
                  'fa-star': star <= review.rating,
                  'fa-star-o': star > review.rating,
                }"
              ></span>
            </div>
            <div class="flex gap-2 items-center">
              <p class="font-semibold">{{ review.name }}</p>
              <i class="fa-solid fa-circle-check text-green-500"></i>
            </div>
            <div class="text-sm text-textGreyLight">"{{ review.text }}"</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Navigation Arrows -->
    <div class="flex justify-center gap-x-10 mt-4 md:hidden">
      <button @click="prevReview" class="text-xl">
        <i class="fa fa-chevron-left"></i>
      </button>
      <button @click="nextReview" class="text-xl">
        <i class="fa fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ReviewData } from "../../assets/ReviewData.js";

export default {
  data() {
    return {
      ReviewData,
      scrollPosition: 0,
      carouselWidth: 0,
      currentIndex: 0,
      isMobileView: window.innerWidth < 768,
    };
  },
  computed: {
    visibleReviews() {
      if (this.isMobileView) {
        return [this.ReviewData[this.currentIndex]];
      }
      return this.ReviewData;
    },
  },
  methods: {
    updateCarouselWidth() {
      if (this.$refs.carousel) {
        this.carouselWidth = this.$refs.carousel.clientWidth;
      }
    },
    handleScroll() {
      const carousel = this.$refs.carousel;
      if (carousel) {
        this.scrollPosition = carousel.scrollLeft;
      }
    },
    isBlurred(index) {
      const itemWidth = 380 + 16;
      if (!this.carouselWidth) return false; 

      const itemStart = index * itemWidth;
      const itemEnd = itemStart + itemWidth;

      const viewStart = this.scrollPosition;
      const viewEnd = this.scrollPosition + this.carouselWidth;

      const thirtyPercentItemWidth = itemWidth * 0.3;

      const thirtyPercentOutLeft =
        itemStart + thirtyPercentItemWidth <= viewStart;
      const thirtyPercentOutRight = itemEnd - thirtyPercentItemWidth >= viewEnd;

      return thirtyPercentOutLeft || thirtyPercentOutRight;
    },
    nextReview() {
      this.currentIndex = (this.currentIndex + 1) % this.ReviewData.length;
    },
    prevReview() {
      this.currentIndex = (this.currentIndex - 1 + this.ReviewData.length) % this.ReviewData.length;
    },
    
    checkView() {
      this.isMobileView = window.innerWidth < 768;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateCarouselWidth();
      this.handleScroll();
    });

    window.addEventListener("resize", this.updateCarouselWidth);
    window.addEventListener("resize", this.checkView);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateCarouselWidth);
    window.removeEventListener("resize", this.checkView);
  },
};
</script>

<style scoped>
.hidebar::-webkit-scrollbar {
  width: 0 !important;
}

.hidebar {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.glass-overlay {
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(2px);
}

.blur {
  filter: blur(3px);
  opacity: 0.9;
}
</style>
