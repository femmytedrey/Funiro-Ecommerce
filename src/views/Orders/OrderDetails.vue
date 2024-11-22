<template>
    <div class="bg-gray-50  py-12 px-7 md:px-20 2xl:px-52 pt-28 sm:pt-10 ">
      <div class="max-w-7xl mx-auto">
        <!-- Enhanced Header Section -->
        <div class="mb-8 flex justify-between items-center">
          <div>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <i class="fas fa-shopping-bag text-primary"></i>
              </div>
              <h1 class="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">Order Details</h1>
            </div>
            <p class="mt-2 text-sm text-gray-600 ml-13">Order #{{ orderDetails?._id?.slice(-8).toUpperCase() }}</p>
          </div>
          <button @click="router.push('/orders')" 
            class="inline-flex items-center px-2 sm:px-4  py-2 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
            <i class="fas fa-arrow-left mr-2"></i>
            Back to Orders
          </button>
        </div>
  
        <div v-if="orderDetails" class="space-y-6">
          <!-- Order Tracker -->
          <!-- <div class="bg-white rounded-xl shadow-sm p-8">
            <div class="relative">
              <div class="h-1 bg-gray-200 absolute w-full top-1/2 -translate-y-1/2"></div>
              <div class="h-1 bg-primary absolute" :style="`width: ${getProgressWidth()}%`"></div>
              <div class="relative flex justify-between">
                <div v-for="(step, index) in orderSteps" :key="index" 
                  class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center mb-2"
                    :class="[getCurrentStep() >= index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400']">
                    <i :class="step.icon"></i>
                  </div>
                  <span class="text-sm font-medium" 
                    :class="getCurrentStep() >= index ? 'text-primary' : 'text-gray-400'">
                    {{ step.label }}
                  </span>
                  <span class="text-xs text-gray-500 mt-1">{{ step.date }}</span>
                </div>
              </div>
            </div>
          </div> -->
  
          <!-- Order Stats -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(stat, index) in getOrderStats()" :key="index"
              class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500">{{ stat.label }}</p>
                  <p class="mt-2 text-xl font-semibold" :class="stat.valueClass">{{ stat.value }}</p>
                </div>
                <div :class="`w-12 h-12 rounded-full ${stat.bgClass} flex items-center justify-center`">
                  <i :class="`${stat.icon} ${stat.iconClass}`"></i>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Delivery Details -->
          <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 class="text-xl font-semibold mb-6">Delivery Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <span class="text-sm font-medium text-gray-500">Full Name</span>
                  <p class="mt-1 text-lg font-medium">
                    {{ orderDetails.deliveryDetails.firstName }} {{ orderDetails.deliveryDetails.lastName }}
                  </p>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Email</span>
                  <p class="mt-1 text-lg font-medium">{{ orderDetails.deliveryDetails.email }}</p>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Phone</span>
                  <p class="mt-1 text-lg font-medium">{{ orderDetails.deliveryDetails.phone }}</p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <span class="text-sm font-medium text-gray-500">Shipping Address</span>
                  <p class="mt-1 text-lg font-medium">{{ orderDetails.deliveryDetails.shippingAddress }}</p>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Location</span>
                  <p class="mt-1 text-lg font-medium">
                    {{ orderDetails.deliveryDetails.city }}, {{ orderDetails.deliveryDetails.state }}, 
                    {{ orderDetails.deliveryDetails.country }}
                  </p>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Additional Information</span>
                  <p class="mt-1 text-lg font-medium">{{ orderDetails.deliveryDetails.additionalInformation }}</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Order Items -->
          <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 class="text-xl font-semibold mb-6">Order Items</h2>
            <div class="space-y-4">
              <div v-for="item in orderDetails.cart.items" :key="item._id" 
                class="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div class="flex items-center space-x-4">
                  <img :src="item.product.images[0]" :alt="item.product.name" 
                    class="w-16 h-16 object-cover rounded-lg">
                  <div>
                    <h3 class="font-medium">{{ item.product.name }}</h3>
                    <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
                  </div>
                </div>
                <span class="font-medium">{{ formatCurrency(item.price) }}</span>
              </div>
            </div>
            
            <!-- Order Total -->
            <div class="mt-6 pt-6 border-t">
              <div class="flex justify-end items-center space-x-4">
                <span class="text-lg font-medium text-gray-500">Total Amount:</span>
                <span class="text-xl sm:text-2xl font-bold text-primary">
                  {{ formatCurrency(orderDetails.cart.total) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCheckoutStore } from "@/components/Store/checkout.store";
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { formatCurrency } from "@/utils/formatters";
  
  const route = useRoute();
  const router = useRouter();
  const checkout = useCheckoutStore();
  const orderDetails = ref(null);
  const orderId = route.params.id;
  
  const orderSteps = [
    {
      label: 'Order Placed',
      icon: 'fas fa-shopping-cart',
      date: new Date().toLocaleDateString()
    },
    {
      label: 'Processing',
      icon: 'fas fa-cog',
      date: new Date(Date.now() + 86400000).toLocaleDateString()
    },
    {
      label: 'In Transit',
      icon: 'fas fa-truck',
      date: new Date(Date.now() + 172800000).toLocaleDateString()
    },
    {
      label: 'Delivered',
      icon: 'fas fa-check',
      date: new Date(Date.now() + 259200000).toLocaleDateString()
    }
  ];
  
  const getCurrentStep = () => {
    return orderDetails.value?.paymentStatus === 'completed' ? 2 : 1;
  };
  
  const getProgressWidth = () => {
    return (getCurrentStep() / (orderSteps.length - 1)) * 100;
  };
  
  const getOrderStats = () => [
    {
      label: 'Order Status',
      value: 'In Transit',
      icon: 'fas fa-truck',
      bgClass: 'bg-blue-100',
      iconClass: 'text-blue-500',
      valueClass: 'text-blue-600'
    },
    {
      label: 'Payment Status',
      value: orderDetails.value?.paymentStatus,
      icon: 'fas fa-check-circle',
      bgClass: 'bg-green-100',
      iconClass: 'text-green-500',
      valueClass: 'text-green-600'
    },
    {
      label: 'Total Items',
      value: `${orderDetails.value?.cart.items.length} Items`,
      icon: 'fas fa-box',
      bgClass: 'bg-purple-100',
      iconClass: 'text-purple-500',
      valueClass: 'text-gray-900'
    },
    {
      label: 'Total Amount',
      value: formatCurrency(orderDetails.value?.cart.total),
      icon: 'fas fa-wallet',
      bgClass: 'bg-primary/10',
      iconClass: 'text-primary',
      valueClass: 'text-primary'
    }
  ];
  
  onMounted(async () => {
    const response = await checkout.fetchSingleCheckout(orderId);
    if (response.success) {
      orderDetails.value = response.checkout;
    }
  });
  </script>
  