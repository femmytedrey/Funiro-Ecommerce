<template>
    <div>
      <!-- Hero Section with Background -->
      <div class="bg-red-50 py-16 relative overflow-hidden pt-32 sm:pt-20">
        <div class="max-w-7xl mx-auto px-7 md:px-20 2xl:px-52 text-center relative">
          <!-- Failed Animation -->
          <div class="mb-5 transform animate-bounce">
            <div class="w-16 h-16 md:w-20 md:h-20 mx-auto bg-red-500 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
  
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            Payment Failed
          </h1>
          <p class="mt-3 text-xl text-gray-600">
            Your payment could not be processed
          </p>
        </div>
      </div>
  
      <!-- Order Details Section -->
      <div class="max-w-7xl mx-auto px-7 md:px-20 2xl:px-52 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left Column: Payment Details -->
          <div class="bg-white p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center mb-6">
              <i class="fas fa-exclamation-circle text-red-500 text-2xl mr-3"></i>
              <h2 class="text-2xl font-semibold">Payment Details</h2>
            </div>
            <div class="space-y-2 md:space-y-3">
              <div class="flex justify-between flex-col md:flex-row items-start gap-y-2 md:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span class="text-gray-600 flex items-center">
                  <i class="fas fa-hashtag text-red-500/70 mr-2"></i>
                  Order ID
                </span>
                <span class="font-medium">#{{ orderId }}</span>
              </div>
              <div class="flex justify-between flex-col md:flex-row items-start gap-y-2 md:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span class="text-gray-600 flex items-center">
                  <i class="fas fa-money-bill-wave text-red-500/70 mr-2"></i>
                  Amount
                </span>
                <span class="font-medium">{{ formatCurrency(orderAmount) }}</span>
              </div>
              <div class="flex justify-between flex-col md:flex-row items-start gap-y-2 md:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span class="text-gray-600 flex items-center">
                  <i class="fas fa-times-circle text-red-500/70 mr-2"></i>
                  Payment Status
                </span>
                <span class="text-red-600 font-medium flex items-center">
                  <i class="fas fa-circle text-xs mr-2"></i>
                  Failed
                </span>
              </div>
            </div>
          </div>
  
          <!-- Right Column: What to do next -->
          <div class="bg-white p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center mb-6">
              <i class="fas fa-info-circle text-red-500 text-2xl mr-3"></i>
              <h2 class="text-2xl font-semibold">What to do next</h2>
            </div>
            <div class="space-y-4">
              <div class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <i class="fas fa-credit-card text-red-500/70 mr-3 mt-1"></i>
                <div>
                  <h3 class="font-medium">Check your payment method</h3>
                  <p class="text-gray-600 text-sm mt-1">Ensure your card details are correct and has sufficient funds</p>
                </div>
              </div>
              <div class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <i class="fas fa-redo text-red-500/70 mr-3 mt-1"></i>
                <div>
                  <h3 class="font-medium">Try again</h3>
                  <p class="text-gray-600 text-sm mt-1">You can retry the payment or use a different payment method</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div class="mt-12 flex justify-center gap-4 flex-col sm:flex-row">
          <button 
            @click="retryPayment"
            class="group px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center">
            <i class="fas fa-redo mr-2 group-hover:rotate-12 transition-transform"></i>
            Retry Payment
          </button>
          <button 
            @click="viewOrder"
            class="group px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center">
            <i class="fas fa-eye mr-2 group-hover:rotate-12 transition-transform"></i>
            View Order
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { formatCurrency } from "@/utils/formatters";
  import { useCheckoutStore } from "@/components/Store/checkout.store";
  
  const router = useRouter();
  const checkoutStore = useCheckoutStore();
  const orderId = ref("");
  const orderAmount = ref(0);
  
  const retryPayment = async () => {
    const result = await checkoutStore.createCheckoutSession(orderId.value);
    if (result.success) {
      window.location.href = result.url;
    }
  };
  
  const viewOrder = () => {
    router.push(`/orders/${orderId.value}`);
  };
  
  onMounted(async () => {
    const checkoutId = new URLSearchParams(window.location.search).get("checkoutId");
    if (checkoutId) {
      const response = await checkoutStore.fetchSingleCheckout(checkoutId);
      if (response.success) {
        orderId.value = response.checkout._id;
        orderAmount.value = response.checkout.cart.total;
      }
    }
  });
  </script>
  