<template>
  <div
    class="px-7 md:px-20 2xl:px-52 flex flex-col space-y-6 border-t-[1.5px] relative mt-32 pt-28 md:pt-24 justify-center"
  >
    <NewsLetter />
    <div>
      <div class="flex flex-col md:flex-row gap-x-6 gap-y-6 md pb-4">
        <div class="w-full md:w-[40%] space-y-7">
          <router-link to="/" class="flex gap-x-2 items-center cursor-pointer">
            <img src="../../assets/logo.png" alt="logo" class="w-12" />
            <p class="text-2xl font-semibold">Funiro</p>
          </router-link>
          <p class="text-textGreyLight text-sm">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
        </div>

        <div class="flex gap-x-20 flex-1">
          <div class="space-y-7 text-sm">
            <p class="text-textGreyLight">Links</p>
            <div class="flex flex-col space-y-7">
              <router-link to="#" class="hover:text-primary ease-in-out"
                >Home</router-link
              >
              <router-link to="#" class="hover:text-primary ease-in-out"
                >Shop</router-link
              >
              <router-link to="#" class="hover:text-primary ease-in-out"
                >About</router-link
              >
              <router-link to="#" class="hover:text-primary ease-in-out"
                >Contact</router-link
              >
            </div>
          </div>
          <div class="space-y-7 text-sm">
            <p class="text-textGreyLight">Help</p>
            <div class="flex flex-col space-y-7">
              <router-link
                to="#"
                class="hover:text-primary transition-all duration-300 ease-in-out"
                >Payment Options</router-link
              >
              <router-link
                to="#"
                class="hover:text-primary transition-all duration-300 ease-in-out"
                >Returns</router-link
              >
              <router-link
                to="#"
                class="hover:text-primary transition-all duration-300 ease-in-out"
                >Privacy Policies</router-link
              >
              <router-link
                to="#"
                class="hover:text-primary transition-all duration-300 ease-in-out"
                >Terms & Conditions</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-center border-t-[1.5px] py-6 md:py-8 text-sm md:text-lg text-greyLight"
    >
      2024 furino. All rights reserved
    </div>
  </div>
</template>

<script setup>
import NewsLetter from "./NewsLetter.vue";
</script>
