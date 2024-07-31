<template>
  <div class="fixed sm:relative bg-white w-full z-[100]">
    <nav
      class="py-5 px-5 md:px-20 flex justify-between items-center shadow relative"
    >
      <div class="flex items-center gap-x-3">
        <!-- hamburger menu -->
        <div class="inline-block lg:hidden text-2xl cursor-pointer">
          <i class="fa-solid fa-bars" @click="toggleMenu"></i>
        </div>
        <router-link
          :to="{ name: 'Home' }"
          class="flex gap-x-2 items-center cursor-pointer"
        >
          <img src="../../assets/logo.png" alt="logo" class="w-10" />
          <p class="text-3xl font-semibold">Funiro</p>
        </router-link>
      </div>

      <div
        :class="isMenuOpen ? 'block' : 'hidden'"
        class="z-40 h-screen top-0 left-0 bg-black/30 lg:hidden w-full fixed"
        @click="toggleMenu"
      ></div>

      <div
        :class="
          isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        "
        class="fixed z-50  lg:pt-0 left-0 top-0 w-[70%] lg:w-auto h-full lg:h-auto lg:relative transition-transform duration-300 bg-white flex-col flex lg:flex-row justify-between"
      >
        <div>
          <div :class="[`flex justify-between pr-7 `, isMobile ? 'pt-6 ps-5':'']">
            <div
              class="flex lg:hidden gap-x-2 items-center cursor-pointer pb-5"
            >
              <img src="../../assets/logo.png" alt="logo" class="w-10" />
              <p class="text-3xl font-semibold">Funiro</p>
            </div>
            <!-- hamburger menu -->
            <div
              class="inline-block lg:hidden text-2xl cursor-pointer rounded-full"
            >
              <i class="fa-solid fa-times" @click="toggleMenu"></i>
            </div>
          </div>
          <div
            class="flex flex-col lg:flex-row gap-x-8 text-primaryText font-medium"
          >
            <router-link
              :to="{ name: 'Home' }"
              @click="toggleMenu"
              :class="[
                'flex items-center gap-x-3 lg:inline-block lg:pl-0 p-4 transition ease-in-out duration-300 hover:bg-gray-100 lg:hover:bg-transparent lg:pb-0 hover:text-primary ps-5',
                isActiveRoute('Home')
                  ? `text-primary font-bold ${
                      isMobile ? 'bg-primaryLight' : ''
                    }`
                  : '',
              ]"
            >
              <i class="fa-solid fa-house-chimney text-2xl" v-if="isMobile"></i>
              <p>Home</p>
            </router-link>
            <router-link
              :to="{ name: 'Shop' }"
              @click="toggleMenu"
              :class="[
                'flex items-center gap-x-3 lg:inline-block lg:pl-0 p-4 transition ease-in-out duration-300 hover:bg-gray-100 lg:hover:bg-transparent lg:pb-0 hover:text-primary ps-5',
                isActiveRoute('Shop')
                  ? `text-primary font-bold ${
                      isMobile ? 'bg-primaryLight' : ''
                    }`
                  : '',
              ]"
            >
              <i class="fa-brands fa-shopify text-2xl" v-if="isMobile"></i>
              <p>Shop</p>
            </router-link>
            <router-link
              :to="{ name: 'About' }"
              @click="toggleMenu"
              :class="[
                'flex items-center gap-x-3 lg:inline-block lg:pl-0 p-4 transition ease-in-out duration-300 hover:bg-gray-100 lg:hover:bg-transparent lg:pb-0 hover:text-primary ps-5',
                isActiveRoute('About')
                  ? `text-primary font-bold ${
                      isMobile ? 'bg-primaryLight' : ''
                    }`
                  : '',
              ]"
            >
              <i class="fa-solid fa-address-card text-2xl" v-if="isMobile"></i>
              <p>About</p>
            </router-link>
            <router-link
              :to="{ name: 'Contact' }"
              @click="toggleMenu"
              :class="[
                'flex items-center gap-x-3 lg:inline-block lg:pl-0 p-4 transition ease-in-out duration-300 hover:bg-gray-100 lg:hover:bg-transparent lg:pb-0 hover:text-primary ps-5',
                isActiveRoute('Contact')
                  ? `text-primary font-bold ${
                      isMobile ? 'bg-primaryLight' : ''
                    }`
                  : '',
              ]"
            >
              <i class="fa-solid fa-address-book text-2xl" v-if="isMobile"></i>
              <p>Contact</p>
            </router-link>
          </div>
        </div>
        <div
          v-if="!isAuthenticated"
          class="lg:hidden pb-5 pr-5 flex flex-col gap-3 ms-5"
        >
          <router-link
            :to="{ name: 'Login' }"
            class="border px-6 py-2 border-primaryText rounded-3xl hover:bg-black transition-all duration-100 hover:text-white items-center flex gap-3"
          >
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
            Login
          </router-link>
          <router-link
            :to="{ name: 'Register' }"
            class="bg-primary hover:bg-[#9f761a] text-white px-6 py-2 rounded-3xl items-center flex gap-3"
          >
            <i class="fa-solid fa-user-plus"></i>
            Sign Up
          </router-link>
        </div>

        <div
          v-if="isAuthenticated"
          class="lg:hidden pb-5 pr-5 flex flex-col gap-3 ms-5"
        >
          <button
            class="border px-6 py-2 border-primaryText text-center rounded-3xl hover:bg-black transition-all duration-100 hover:text-white"
          >
            Support
          </button>
        </div>
      </div>
      <div class="flex gap-x-5 items-center">
        <!-- <i class="fa-solid fa-user-xmark"></i> -->

        <!-- <button class="border px-6 hidden lg:inline-block py-2 border-primaryText rounded-3xl hover:bg-black transition-all duration-100 hover:text-white">Login</button> -->
        <router-link
          :to="{ name: 'Register' }"
          class="bg-primary hidden lg:inline-block hover:bg-[#9f761a] text-white px-6 py-2 rounded-3xl"
          v-if="!isAuthenticated"
        >
          Sign Up
        </router-link>

        <div class="flex items-center gap-x-4">
          <!-- profile modal -->
          <div
            v-if="isAuthenticated"
            @click="toggleProfileMenu"
            class="relative border-2 rounded-full border-gray-300 w-9 h-9 flex justify-center items-center"
          >
            <i class="fa-regular fa-user text-xl cursor-pointer"></i>
            <ProfileInfo v-if="isProfileMenuOpen" @close="toggleProfileMenu" />
          </div>

          <!-- cart icon -->
          <div class="relative cursor-pointer">
            <div
              v-if="isAuthenticated"
              class="rounded-full flex justify-center items-center h-5 w-5 p-3 bg-red-500 text-white text-xs absolute left-4 top-[-12px]"
            >
              10
            </div>
            <i class="fa-solid fa-cart-shopping text-2xl"></i>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { computed, onUpdated, ref } from "vue";
import { useAuthStore } from "../Store/auth.store";
import router from "@/router";
import { useRoute } from "vue-router";
import ProfileInfo from "./ProfileInfo.vue";

export default {
  components: {
    ProfileInfo,
  },
  setup() {
    const isMenuOpen = ref(false);
    const authStore = useAuthStore();
    const isProfileMenuOpen = ref(false);
    const isMobile = ref(window.innerWidth <= 1023);
    const route = useRoute();

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 1023;
    };

    onUpdated(() => {
      window.addEventListener("resize", checkMobile);
      checkMobile();
    });

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    const toggleProfileMenu = () => {
      isProfileMenuOpen.value = !isProfileMenuOpen.value;
    };

    const handleLogout = () => {
      authStore.logout();
      router.push({ name: "Home" });
    };

    const isActiveRoute = (name) => {
      return route.name === name;
    };

    const isAuthenticated = computed(() => authStore.isAuthenticated);

    return {
      isMenuOpen,
      authStore,
      isAuthenticated,
      isProfileMenuOpen,
      toggleMenu,
      toggleProfileMenu,
      handleLogout,
      isMobile,
      isActiveRoute,
    };
  },
};
</script>

<style scoped></style>
