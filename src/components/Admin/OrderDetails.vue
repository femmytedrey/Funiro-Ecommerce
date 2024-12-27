<template>
  <div
    v-if="isModalOpen"
    @click.self="closeModal"
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-[60] p-4"
  >
    <div
      class="bg-white w-full max-w-4xl rounded-2xl max-h-[90vh] flex flex-col"
    >
      <!-- Header - Fixed -->
      <div
        class="p-4 sm:p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10"
      >
        <h2 class="text-lg sm:text-xl font-bold">
          Order Details #{{ singleCheckout._id.slice(-6).toUpperCase() }}
        </h2>
        <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-full">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="p-4 sm:p-6 overflow-y-auto">
        <!-- Customer Info -->
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 class="font-semibold mb-3">Customer Information</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <p class="text-sm text-gray-600">Name</p>
              <p class="font-medium">
                {{
                  `${singleCheckout.deliveryDetails.lastName} ${singleCheckout.deliveryDetails.firstName}`
                }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-gray-600">Email</p>
              <p class="font-medium break-all">
                {{ singleCheckout.deliveryDetails.email }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-gray-600">Phone</p>
              <p class="font-medium">
                {{ singleCheckout.deliveryDetails.phone }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-gray-600">Address</p>
              <p class="font-medium">
                {{ singleCheckout.deliveryDetails.shippingAddress }}
              </p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="mb-6">
          <h3 class="font-semibold mb-3">Order Items</h3>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[600px]">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-sm">Product</th>
                  <th class="px-4 py-3 text-left text-sm">Quantity</th>
                  <th class="px-4 py-3 text-right text-sm">Price</th>
                  <th class="px-4 py-3 text-right text-sm">Total</th>
                </tr>
              </thead>
              <tbody
                class="divide-y"
                v-for="item in singleCheckout.cart?.items"
                :key="item._id"
              >
                <tr>
                  <td class="px-4 py-3">
                    <div class="flex items-center">
                      <img
                        :src="item.product.images[0]"
                        :alt="item.product.name"
                        class="w-12 h-12 rounded object-cover mr-3"
                      />
                      <span class="font-medium">{{item.product.name}}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3">{{ item.quantity }}</td>
                  <td class="px-4 py-3 text-right">{{ formatCurrency(item.price) }}</td>
                  <td class="px-4 py-3 text-right">{{ formatCurrency(item.price * item.quantity) }}</td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50">
                <tr>
                  <td colspan="3" class="px-4 py-3 text-right font-semibold">
                    Total
                  </td>
                  <td class="px-4 py-3 text-right font-semibold">{{formatCurrency(singleCheckout?.cart?.total)}}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- Order Status -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex flex-col sm:flex-row justify-between gap-4">
            <div class="space-y-2">
              <p class="text-sm text-gray-600">Payment Status</p>
              <span
                class="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 inline-block"
              >
                {{singleCheckout.paymentStatus}}
              </span>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-600">Order Date</p>
              <p class="font-medium">{{ formatDate(singleCheckout?.updatedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, formatDate } from "@/utils/formatters";
import { onMounted, onUpdated } from "vue";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  singleCheckout: {
    type: Object,
    required: true,
  },
});
// onUpdated(() => {
//   console.log("Props received:", props.singleCheckout);
//   if (props.singleCheckout) {
//     console.log("Order ID:", props.singleCheckout._id);
//   } else {
//     console.log("Checkout data not available");
//   }
// });

const emit = defineEmits(["clsoe"]);
const closeModal = () => {
  emit("close");
  document.body.style.overflow = "auto";
};
// onUpdated(() => {
//   console.log("Full checkout:", props.singleCheckout);
//   console.log("Cart items:", props.singleCheckout?.cart?.items);
// });
</script>

<style></style>
