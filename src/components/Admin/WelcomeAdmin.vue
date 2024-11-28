<template>
  <div
    class="fixed px-2 inset-0 bg-white z-50 flex flex-col justify-center items-center space-y-8"
  >
    <div
      class="flex gap-x-4 items-center"
      v-scroll-animate="'animate__lightSpeedInRight'"
    >
      <img src="../../assets/logo.png" alt="logo" class="w-16" />
      <p class="text-4xl 2xl:text-6xl font-bold">Funiro</p>
    </div>

    <div class="text-center" v-scroll-animate="'animate__fadeIn'">
      <h1 class="text-2xl font-medium text-gray-600 mb-2">
        Welcome to Admin Dashboard
      </h1>
      <p class="text-gray-400">Preparing your workspace...</p>
    </div>

    <div class="w-24 h-1 bg-gray-100 rounded-full overflow-hidden mt-6">
      <div
        class="h-full bg-primary transition-all duration-1000"
        :style="{ width: `${loadingProgress}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

let loadingProgress = ref(0);

onMounted(() => {
  const progressInterval = setInterval(() => {
    loadingProgress.value += 25;
    if (loadingProgress.value >= 100) {
      clearInterval(progressInterval);
    }
  }, 500);
});
</script>
