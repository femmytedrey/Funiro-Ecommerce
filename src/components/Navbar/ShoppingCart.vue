<template>
  <div
    class="w-[300px] xl:w-[350px] 2xl:w-[400px] bg-white overflow-y-auto h-full flex flex-col"
  >
    <div class="flex items-start px-3 pt-4">
      <h1 class="text-xl 2xl:text-2xl pb-5 border-b flex-1 border-black/20 font-medium">
        Shopping Cart
      </h1>
      <button @click="closeSidebar" class="pr-6 pl-8 text-xl">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- items' -->
    <div class="px-3 py-5 flex flex-col gap-y-3 flex-1 overflow-y-scroll">
      <div
        class="flex gap-x-3"
        v-for="item in cartStore.cart.items"
        :key="item._id"
      >
        <div class="h-14 w-14 2xl:h-20 2xl:w-20 bg-gray-300">
          <img :src="item.product.images[0]" :alt="item.product.name" />
        </div>
        <div class="flex-1 flex flex-col py-2 gap-y-1">
          <h1 class="text-sm 2xl:text-lg">{{ item.product.name }}</h1>
          <div class="flex gap-x-4 items-center">
            <p class="text-sm 2xl:text-lg">{{ item.quantity }}</p>
            <p class="text-[12px] 2xl:text-lg">X</p>
            <p class="text-[12px] 2xl:text-lg text-primary font-medium">
              {{ formatCurrency(item.product.price) }}
            </p>
          </div>
        </div>
        <div class="flex justify-center items-center cursor-pointer">
          <button
            @click="deleteItem(item.product._id)"
            class="h-6 w-6 flex justify-center items-center text-primary"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="py-3 flex flex-col gap-y-2 px-3 border-t ">
      <div class="text-sm 2xl:text-lg flex gap-x-10">
        <p>Subtotal</p>
        <p class="text-primary font-semibold">
          {{ formatCurrency(cartStore.cart.total) }}
        </p>
      </div>
      <div class="flex justify-between">
        <router-link
          class="px-5 py-1 border-black bg-white hover:bg-black text-black hover:text-white border text-sm 2xl:text-lg rounded-3xl transition-all duration-300 ease-in-out"
          :to="{ name: 'Cart' }"
          @click="closeSidebar"
        >
          Cart
        </router-link>
        <router-link
          :to="{ name: 'Checkout' }"
          class="px-5 py-1 border-black bg-white hover:bg-black text-black hover:text-white border text-sm 2xl:text-lg rounded-3xl transition-all duration-300 ease-in-out"
          @click="closeSidebar"
        >
          Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../Store/useCartStore";
export default {
  emmits: ["closeSidebar"],
  setup(props, { emit }) {
    const cartStore = useCartStore();

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    };

    const deleteItem = (productId) => {
      try {
        cartStore.deleteItem(productId);
      } catch (error) {}
    };

    const closeSidebar = () => {
      emit("closeSidebar");
    };

    return {
      cartStore,
      formatCurrency,
      closeSidebar,
      deleteItem,
    };
  },
};
</script>
