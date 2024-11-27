<template>
  <div
    class="relative overflow-hidden rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl animate-slide-in"
    :class="bgColorClass"
  >
    <!-- Bg Pattern -->
    <div
      class="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 opacity-10"
    >
      <i :class="[icon, 'text-[100px]']"></i>
    </div>

    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-4">
        <div
          class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
        >
          <i :class="[icon, 'text-xl']"></i>
        </div>
        <h3 class="font-medium">{{ title }}</h3>
      </div>

      <div class="flex items-end justify-between">
        <p class="text-4xl font-bold">{{ value }}</p>
        <div
          class="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm"
        >
          <i class="fas fa-arrow-up text-xs"></i>
          {{ percentage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: String,
    value: Number,
    percentage: String,
    icon: String,
    index: Number
})

const bgColorClass = computed(() => {
    const colors = [
        'bg-primary text-white',
        'bg-[#10B981] text-white',
        'bg-[#F59E0B] text-white',
        'bg-[#EF4444] text-white'
    ];
    return colors[props.index] || colors[0];
})
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
