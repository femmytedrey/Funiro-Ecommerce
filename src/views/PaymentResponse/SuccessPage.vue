<template>
  <div>
    <!-- Hero Section with Background -->
    <div class="bg-primary/10 py-16 relative overflow-hidden pt-32 sm:pt-20">
      <div
        class="max-w-7xl mx-auto px-7 md:px-20 2xl:px-52 text-center relative"
      >
        <!-- Success Animation -->
        <div class="mb-5 transform animate-bounce">
          <div
            class="w-16 h-16 md:w-20 md:h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
          Order Confirmed!
        </h1>
        <p class="mt-3 text-xl text-gray-600">
          Your order has been successfully placed.
        </p>
      </div>
    </div>

    <!-- Order Details Section -->
    <div class="max-w-7xl mx-auto px-7 md:px-20 2xl:px-52 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Order Summary -->
        <div
          class="bg-white p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-6">
            <i
              class="fas fa-file-invoice-dollar text-primary text-2xl mr-3"
            ></i>
            <h2 class="text-2xl font-semibold">Order Summary</h2>
          </div>
          <div class="space-y-2 md:space-y-3">
            <div
              class="flex justify-between flex-col md:flex-row items-start gap-y-2 md:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span class="text-gray-600 flex items-center">
                <i class="fas fa-hashtag text-primary/70 mr-2"></i>
                Order ID
              </span>
              <span class="font-medium">#{{ orderId }}</span>
            </div>
            <div
              class="flex justify-between flex-col md:flex-row items-start gap-y-2 md:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span class="text-gray-600 flex items-center">
                <i class="fas fa-money-bill-wave text-primary/70 mr-2"></i>
                Total Amount
              </span>
              <span class="font-medium">{{ formatCurrency(orderAmount) }}</span>
            </div>
            <div
              class="flex justify-between flex-col md:flex-row items-start gap-y-2 md:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span class="text-gray-600 flex items-center">
                <i class="fas fa-check-circle text-primary/70 mr-2"></i>
                Payment Status
              </span>
              <span class="text-green-600 font-medium flex items-center">
                <i class="fas fa-circle text-xs mr-2 animate-pulse"></i>
                {{ paymentStatus }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column: Shipping Details -->
        <div
          class="bg-white p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center mb-6">
            <i class="fas fa-shipping-fast text-primary text-2xl mr-3"></i>
            <h2 class="text-2xl font-semibold">Shipping Details</h2>
          </div>
          <div class="space-y-2 md:space-y-3">
            <div
              class="flex justify-between flex-col md:flex-row items-start gap-y-2 md:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span class="text-gray-600 flex items-center">
                <i class="fas fa-map-marker-alt text-primary/70 mr-2"></i>
                Delivery Address
              </span>
              <span class="font-medium text-left md:text-right max-w-full md:max-w-60">{{ shippingAddress }}</span>
            </div>
            <div
              class="flex justify-between flex-col md:flex-row items-start gap-y-2 md:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span class="text-gray-600 flex items-center">
                <i class="fas fa-clock text-primary/70 mr-2"></i>
                Estimated Delivery
              </span>
              <span class="font-medium">3-5 Business Days</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-12 flex justify-center gap-4 flex-col sm:flex-row">
        <button
          @click="viewOrderDetails"
          class="group px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center"
        >
          <i
            class="fas fa-file-alt mr-2 group-hover:rotate-12 transition-transform"
          ></i>
          View Order Details
        </button>
        <button
          @click="continueShopping"
          class="group px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
        >
          <i
            class="fas fa-shopping-cart mr-2 group-hover:rotate-12 transition-transform"
          ></i>
          Continue Shopping
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
const shippingAddress = ref("");
const paymentStatus = ref("");

const viewOrderDetails = () => {
  router.push(`/orders/${orderId.value}`);
};

const continueShopping = () => {
  router.push("/shop");
};

onMounted(async () => {
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  const directOrderId = new URLSearchParams(window.location.search).get(
    "orderId"
  );
  console.log(directOrderId, "is this one");

  if (sessionId) {
    const { success, checkoutId } = await checkoutStore.getCheckoutSession(
      sessionId
    );

    if (success && checkoutId) {
      const checkoutResponse = await checkoutStore.fetchSingleCheckout(
        checkoutId
      );

      if (checkoutResponse.success && checkoutResponse.checkout) {
        const checkout = checkoutResponse.checkout;
        orderId.value = checkout._id;
        orderAmount.value = checkout.cart.total;
        shippingAddress.value = `${checkout.deliveryDetails.shippingAddress}, ${checkout.deliveryDetails.city}, ${checkout.deliveryDetails.state}, ${checkout.deliveryDetails.country}`;
        paymentStatus.value = checkout.paymentStatus;
      }
    }
  } else if (directOrderId) {
    await populateOrderDetails(directOrderId);
  }
});

const populateOrderDetails = async (checkoutId) => {
  const checkoutResponse = await checkoutStore.fetchSingleCheckout(checkoutId);

  if (checkoutResponse.success && checkoutResponse.checkout) {
    const checkout = checkoutResponse.checkout;
    console.log(checkout);
    orderId.value = checkout._id;
    orderAmount.value = checkout.cart.total;
    shippingAddress.value = `${checkout.deliveryDetails.shippingAddress}, ${checkout.deliveryDetails.city}, ${checkout.deliveryDetails.state}, ${checkout.deliveryDetails.country}`;
    paymentStatus.value = checkout.paymentStatus;
  }
};
</script>

<style scoped></style>
