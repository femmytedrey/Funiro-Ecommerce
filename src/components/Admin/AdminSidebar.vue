<template>
  <aside
    :class="[
      'w-64 h-screen bg-white shadow-lg fixed left-0 top-0 z-50 transition-transform duration-300',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <div
      class="h-16 px-3 lg:px-4 border-b flex justify-between items-center cursor-pointer"
    >
      <router-link :to="{ name: 'Home' }" class="flex gap-x-2 items-center">
        <img :src="logo" alt="logo" class="w-8" />
        <h1 class="text-xl font-bold">Funiro Admin</h1>
      </router-link>
      <button @click="closeSidebar" class="lg:hidden p-2">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <!-- <nav class="p-4 overflow-y-auto h-[calc(100vh-4rem)]"> -->
    <nav class="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
      <div
        v-for="(section, index) in navigationSections"
        :key="index"
        class="mb-6"
      >
        <h2 class="text-xs uppercase text-gray-500 font-semibold mb-2">
          {{ section.title }}
        </h2>
        <div class="space-y-2">
          <button
            v-for="item in section.items"
            :key="item.id"
            @click="updateCurrentSection(item.id)"
            :aria-label="item.id"
            :class="[
              'w-full flex items-center space-x-3 p-2 rounded-lg transition-colors',
              currentSection === item.id
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100',
            ]"
          >
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, defineEmits } from "vue";

import logoPath from "@/assets/logo.png";
import { navigationSections } from "./utils/AdminUtils";

defineProps(["isSidebarOpen", "currentSection"]);

const updateCurrentSection = (section) => {
  emit("update:currentSection", section);
  closeSidebar();
};

const emit = defineEmits(["close", "update:currentSection"]);
const closeSidebar = () => {
  emit("close");
};

const logo = logoPath;
</script>

<style scoped>
nav::-webkit-scrollbar {
  width: 8px;
}

nav::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

nav::-webkit-scrollbar-thumb {
  background: #e5e7eb; /* Matches Tailwind's bg-gray-200 */
  border-radius: 4px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* For Firefox */
nav {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb #f1f1f1;
}
</style>
