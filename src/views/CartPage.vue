<template>
  <div
    class="bg px-7 md:px-20 2xl:px-52 relative py-28 mb-11 flex flex-col justify-center items-center"
  >
    <div class="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
    <div class="z-10 text-center space-y-3">
      <p class="text-4xl font-medium">Cart</p>
      <p class="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  </div>

  <div class="flex flex-col md:flex-row w-full px-7 md:px-20 2xl:px-52 gap-6">
    <!-- Product Table -->
    <div class="flex-1 overflow-x-auto">
      <div
        class="grid grid-cols-6 gap-x-4 bg-primaryLight font-semibold min-w-[600px]"
      >
        <div class="py-3 text-base 2xl:text-xl"></div>
        <div class="py-3 text-base 2xl:text-xl">Product</div>
        <div class="py-3 text-base 2xl:text-xl">Price</div>
        <div class="py-3 text-base 2xl:text-xl">Quantity</div>
        <div class="py-3 text-base 2xl:text-xl">Subtotal</div>
        <div class="py-3 text-base 2xl:text-xl"></div>
      </div>
      <div class="py-4 text-base 2xl:text-xl">
        <!-- Product Row -->
        <div
          class="grid grid-cols-6 gap-x-4 items-center py-3 border-b border-gray-200 min-w-[600px]"
          v-for="item in cartStore.cart.items"
          :key="item._id"
        >
          <div class="h-16 w-16 rounded-lg bg-black">
            <img :src="item.product.images[0]" :alt="item.product.name" />
          </div>
          <div class="flex-1">{{ item.product.name }}</div>
          <div>{{ formatCurrency(item.product.price) }}</div>
          <div class="pl-4">{{ item.quantity }}</div>

          <!-- subtotal in this div: just pick price multiply by quantity for each product-->
          <div>{{ formatCurrency(item.quantity * item.product.price) }}</div>

          <div class="flex justify-center">
            <button class="text-red-500" @click="deleteItem(item.product._id)">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Totals -->
    <div
      class="w-full md:w-1/3 bg-primaryLight px-7 xl:px-12 py-6 text-center max-h-[290px]"
    >
      <h1 class="text-2xl pb-9 font-semibold">Cart Totals</h1>
      <div class="text-sm 2xl:text-lg flex flex-col gap-y-5">
        <div class="flex justify-between text-base 2xl:text-lg">
          <p>Subtotal</p>
          <p>{{ formatCurrency(cartStore.cart.total) }}</p>
        </div>
        <div class="flex justify-between">
          <p>Total</p>
          <p class="font-semibold text-primary">
            {{ formatCurrency(cartStore.cart.total) }}
          </p>
        </div>
      </div>

      <router-link :to="{ name: 'Checkout' }">
        <button
          class="border text-sm py-3 px-8 border-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out rounded-xl mt-9"
        >
          Check Out
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/components/Store/useCartStore";
import { onMounted } from "vue";
import { formatCurrency } from "@/utils/formatters";
export default {
  setup() {
    const cartStore = useCartStore();

    const fetchCart = async () => {
      try {
        await cartStore.fetchCart();
      } catch (error) {}
    };

    const deleteItem = (productId) => {
      try {
        cartStore.deleteItem(productId);
      } catch (error) {}
    };

    onMounted(() => {
      fetchCart();
    });

    return {
      cartStore,
      formatCurrency,
      deleteItem,
    };
  },
};
</script>

<style scoped>
.bg {
  background-image: url("@/assets/sofa.jpg");
  background-position: center;
  filter: grayscale(30%);
}
</style>
