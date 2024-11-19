<template>
  <div class="bg-gray-50 py-12 px-7 md:px-20 2xl:px-52 pt-28 sm:pt-10">
    <div class="max-w-7xl">
      <!-- Premium Page Header -->
      <div class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
            Order History
          </h1>
          <p class="mt-2 text-sm text-gray-600">
            Track and manage your purchases
          </p>
        </div>
        <div class="flex space-x-4">
          <button
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <i class="fas fa-filter mr-2"></i>
            Filter
          </button>
          <!-- <button
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            <i class="fas fa-download mr-2"></i>
            Export
          </button> -->
        </div>
      </div>

      <!-- Enhanced Orders List -->
      <div v-if="completedOrders.length > 0" class="space-y-4">
        <div
          v-for="order in completedOrders"
          :key="order._id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
        >
          <div class="p-6">
            <!-- Order Header with Actions -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <i class="fas fa-shopping-bag text-primary"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    #{{ order._id.slice(-8).toUpperCase() }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ formatDate(order.createdAt) }}
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <button
                  @click="viewOrderDetails(order._id)"
                  class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  <i class="fas fa-eye mr-2"></i>
                  View Details
                </button>
                <button
                  @click="deleteCheckout(order._id)"
                  class="inline-flex items-center p-2 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                >
                  <!-- delete -->
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <!-- Order Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-500 mb-1"
                  >Amount</span
                >
                <span class="text-lg font-semibold text-gray-900">
                  {{ formatCurrency(order.cart?.total || 0) }}
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-500 mb-1"
                  >Items</span
                >
                <span class="text-lg font-semibold text-gray-900">
                  {{ order.cart?.items?.length || 0 }} products
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-500 mb-1"
                  >Payment Status</span
                >
                <span class="inline-flex items-center">
                  <span
                    class="w-2 h-2 rounded-full mr-2"
                    :class="{
                      'bg-green-500': order.paymentStatus === 'completed',
                      'bg-yellow-500': order.paymentStatus === 'pending',
                      'bg-red-500': order.paymentStatus === 'failed',
                    }"
                  ></span>
                  <span
                    class="text-lg font-semibold capitalize"
                    :class="{
                      'text-green-700': order.paymentStatus === 'completed',
                      'text-yellow-700': order.paymentStatus === 'pending',
                      'text-red-700': order.paymentStatus === 'failed',
                    }"
                  >
                    {{ order.paymentStatus }}
                  </span>
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-500 mb-1"
                  >Delivery Status</span
                >
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  In Transit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Premium Empty State -->
      <div v-else class="bg-white rounded-xl shadow-sm p-12 text-center">
        <div
          class="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center"
        >
          <i class="fas fa-shopping-bag text-4xl text-primary"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
        <p class="text-gray-500 mb-6 max-w-sm mx-auto">
          Start your shopping journey and track all your orders in one place
        </p>
        <button
          @click="router.push('/shop')"
          class="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90"
        >
          <i class="fas fa-shopping-cart mr-2"></i>
          Start Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useCheckoutStore } from "@/components/Store/checkout.store";
import { formatCurrency } from "@/utils/formatters";

const router = useRouter();
const checkoutStore = useCheckoutStore();

onMounted(async () => {
  await checkoutStore.fetchCheckout();
});

const deleteCheckout = async (orderId) => {
  console.log(orderId)
  const result = await checkoutStore.deleteCheckout(orderId);
  if (result.success) {
    alert(result.message); 
  } else {
    alert(result.error);
  }
};


const completedOrders = computed(() => checkoutStore.completedOrders || []);
console.log(completedOrders, "we are here again");

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const viewOrderDetails = (orderId) => {
  router.push(`/orders/${orderId}`);
};
</script>
