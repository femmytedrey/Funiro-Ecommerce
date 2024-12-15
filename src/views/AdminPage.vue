<template>
  <div class="bg-gray-50 min-h-screen relative">
    <WelcomeAdminVue v-if="!showMainContent" />

    <AdminSidebar
      v-show="showMainContent"
      v-scroll-animate="'animate__fadeIn'"
      v-model:currentSection="currentSection"
      :isSidebarOpen="isSidebarOpen"
      @close="isSidebarOpen = false"
    />
    <div
      class="min-h-screen absolute w-full bg-black/30 z-30 lg:hidden"
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
    ></div>

    <div class="flex-1 min-h-screen">
      <button
        @click="toggleSidebar"
        class="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white shadow-lg"
      >
        <i class="fas fa-bars"></i>
      </button>

      <div
        v-show="showMainContent"
        v-scroll-animate="'animate__fadeIn'"
        class="lg:ml-64"
      >
        <div
          class="bg-white shadow-sm h-16 fixed right-0 left-0 lg:left-64 top-0 z-30"
        >
          <AdminHeader />
        </div>

        <!-- Main Content Area -->
        <main class="pt-[4rem]">
          <DashboardOverview
            :checkouts="checkouts.checkouts"
            v-if="currentSection === 'dashboard'"
            v-model:currentSection="currentSection"
          />
          <UsersManagement v-else-if="currentSection === 'users'" />
          <ProductsManagement v-else-if="currentSection === 'products'" />
          <OrdersManagement v-else-if="currentSection === 'orders'" />

          <div
            v-else
            class="flex flex-col py-20 items-center justify-center text-center"
          >
            <i class="fas fa-tools text-gray-400 text-5xl mb-4"></i>
            <h2 class="text-2xl font-semibold text-gray-700 mb-2">
              <span class="capitalize">{{ currentSection }}</span> page Under
              Development
            </h2>
            <p class="text-gray-500 mb-4">
              We are working hard to bring this page to life. Please check back
              later!
            </p>
            <button
              class="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition duration-300"
              @click="currentSection = 'dashboard'"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import WelcomeAdminVue from "@/components/Admin/WelcomeAdmin.vue";
import { ref, onMounted, watch } from "vue";
import AdminSidebar from "@/components/Admin/AdminSidebar.vue";
import AdminHeader from "@/components/Admin/AdminHeader.vue";
import UsersManagement from "@/components/Admin/UsersManagement.vue";
import DashboardOverview from "@/components/Admin/DashboardOverview.vue";
import ProductsManagement from "@/components/Admin/ProductsManagement.vue";
import OrdersManagement from "@/components/Admin/OrdersManagement.vue";
import { useRoute, useRouter } from "vue-router";
import { useCheckoutStore } from "@/components/Store/checkout.store";

const showMainContent = ref(false);
const isSidebarOpen = ref(false);
const checkouts = useCheckoutStore();
const currentSection = ref("dashboard");
const router = useRouter();
const route = useRoute();

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const setSectionFromURL = () => {
  const sectionFormUrl = route.query.section;
  if (sectionFormUrl) {
    currentSection.value = sectionFormUrl;
  }
};

const updateSectionInURL = (section) => {
  router.push({ query: { section } });
};

watch(currentSection, (newSection) => {
  updateSectionInURL(newSection);
});

watch(
  () => route.query.section,
  (newSection) => {
    // Handle any valid section change from route
    const validSections = [
      "dashboard",
      "analytics",
      "users",
      "products",
      "orders",
      "marketing",
      "promotions",
      "settings",
    ];
    currentSection.value = validSections.includes(newSection)
      ? newSection
      : "dashboard";
  }
);

onMounted(async () => {
  await checkouts.fetchAdminCheckout();
});

onMounted(() => {
  setSectionFromURL();
  setTimeout(() => {
    showMainContent.value = true;
  }, 3000);
});
</script>
