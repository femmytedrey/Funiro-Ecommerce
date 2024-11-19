<template>
  <div
    class="bg-black text-white w-[90%] lg:w-[80%] 2xl:w-[70%] items-center md:w-[75%] justify-between gap-x-7 p-6 gap-y-4 mx-auto absolute top-[-20%] lg:top-[-15%] xl:top-[-18%] rounded-2xl left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row"
  >
    <div
      class="text-2xl lg:text-3xl font-semibold uppercase text-center md:text-left"
    >
      Stay upto date about our latest offers
    </div>
    <div class="flex flex-col gap-y-3 md:w-[65%] w-full">
      <input
        type="email"
        class="py-2 md:py-3 px-5 rounded-3xl outline-none border-none text-black"
        placeholder="Enter your email"
        v-model="email"
      />
      <p v-if="error" class="text-red-500">Invalid Email</p>
      <button
        @click="handleSubmit"
        class="bg-white hover:font-semibold text-black rounded-3xl py-2 md:py-3 transition-all duration-300 ease-in-out"
      >
        Subscribe to Newsletter
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const error = ref(false);
const handleSubmit = () => {
  if (!email.value) {
    error.value = true;
  } else {
    error.value = false;
    alert("success");
  }
  console.log(email.value);
  email.value = "";
};
</script>
