<template>
  <div>
    <nav
      class="py-5 px-5 md:px-20 flex justify-between items-center shadow relative"
    >
      <div class="flex gap-x-2 items-center cursor-pointer">
        <img src="../../assets/logo.png" alt="logo" />
        <p class="text-3xl font-semibold">Funiro</p>
      </div>

      <div
        :class="isMenuOpen ? 'block' : 'hidden'"
        class="h-screen top-0 left-0 bg-black/30 w-full fixed"
        @click="toggleMenu"
      ></div>

      <div
        :class="
          isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        "
        class="fixed pt-6 lg:pt-0 left-0 top-0 w-[75%] lg:w-auto h-full lg:h-auto lg:relative transition-transform duration-300 bg-white flex-col flex lg:flex-row justify-between ps-5"
      >
        <div>
          <div class="flex lg:hidden gap-x-2 items-center cursor-pointer pb-8">
            <img src="../../assets/logo.png" alt="logo" />
            <p class="text-3xl font-semibold">Funiro</p>
          </div>
          <div
            class="flex flex-col lg:flex-row gap-x-8 text-primaryText font-medium"
          >
            <a
              class="block lg:inline-block lg:pl-0 p-4 transition ease-in-out duration-300 hover:bg-gray-100 lg:hover:bg-transparent lg:pb-0 hover:text-primary"
              href=""
              >Home</a
            >
            <a
              class="block lg:inline-block lg:pl-0 p-4 transition ease-in-out duration-300 hover:bg-gray-100 lg:hover:bg-transparent lg:pb-0 hover:text-primary"
              href=""
              >Shop</a
            >
            <a
              class="block lg:inline-block lg:pl-0 p-4 transition ease-in-out duration-300 hover:bg-gray-100 lg:hover:bg-transparent lg:pb-0 hover:text-primary"
              href=""
              >About</a
            >
            <a
              class="block lg:inline-block lg:pl-0 p-4 transition ease-in-out duration-300 hover:bg-gray-100 lg:hover:bg-transparent lg:pb-0 hover:text-primary"
              href=""
              >Contact</a
            >
          </div>
        </div>
        <div class="lg:hidden pb-5 pr-5 flex flex-col gap-3">
          <button
            class="border px-6 py-2 border-primaryText rounded-3xl hover:bg-black transition-all duration-100 hover:text-white"
          >
            Login
          </button>
          <button
            class="bg-primary hover:bg-[#9f761a] text-white px-3 py-2 rounded-3xl"
          >
            Get Started
          </button>
        </div>
      </div>
      <div class="flex gap-x-5 items-center">
        <!-- <i class="fa-solid fa-user-xmark"></i> -->

        <!-- <button class="border px-6 hidden lg:inline-block py-2 border-primaryText rounded-3xl hover:bg-black transition-all duration-100 hover:text-white">Login</button> -->
        <button
          class="bg-primary hidden lg:inline-block hover:bg-[#9f761a] text-white px-3 py-2 rounded-3xl"
        >
          Get Started
        </button>

        <div class="flex items-center gap-x-4">
          <div class="inline-block lg:hidden text-2xl cursor-pointer">
            <i
              :class="isMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'"
              @click="toggleMenu"
            ></i>
          </div>
          <div class="relative cursor-pointer">
            <div
              class="rounded-full flex justify-center items-center h-5 w-5 p-3 bg-red-500 text-white text-xs absolute left-4 top-[-12px] "
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
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      console.log("Menu is toggled");
    },
  },
};
</script>

<style lang="scss" scoped></style>
