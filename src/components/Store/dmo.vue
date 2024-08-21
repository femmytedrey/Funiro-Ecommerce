<template>
  <div>
    <button @click="fetchCartItems">Fetch Cart</button>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <ul v-if="!isLoading && !error">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCartStore } from './useCartStore';

export default defineComponent({
  setup() {
    const cartStore = useCartStore();

    const fetchCartItems = async () => {
      try {
        await cartStore.fetchCart();
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    return {
      items: cartStore.items,
      isLoading: cartStore.isLoading,
      error: cartStore.error,
      fetchCartItems
    };
  },

  mounted() {
    const cartStore = useCartStore();
    cartStore.initializeCart(); // Ensure cart is initialized when component is mounted
  }
});
</script>

<style scoped>
/* Add any styles here */
</style>
