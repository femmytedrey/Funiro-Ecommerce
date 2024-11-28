<template>
  <div class="relative">
    <WelcomeAdminVue v-if="!showMainContent" />

    <div
      v-show="showMainContent"
      v-scroll-animate="'animate__fadeIn'"
      class="min-h-screen"
    >
      Main Content
    </div>
  </div>
</template>

<script setup>
import WelcomeAdminVue from "@/components/Admin/WelcomeAdmin.vue";
import { ref, onMounted } from "vue";

const showMainContent = ref(false);
const loadingProgress = ref(0);

onMounted(() => {
  setTimeout(() => {
    showMainContent.value = true;
  }, 3000);
});
</script>
