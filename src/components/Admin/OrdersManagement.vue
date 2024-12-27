<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-100 h-fit transition-all duration-300 ease-in-out px-4 lg:px-6"
  >
    <div class="p-6 border-b border-gray-100">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-3"
      >
        <h2 class="text-xl font-bold text-gray-800">Recent Orders</h2>
        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="relative flex-1 md:flex-initial">
            <input
              type="text"
              placeholder="Search orders..."
              class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <select
            v-model="selectedOption"
            :change="filteredProduct(selectedOption)"
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option
              v-for="(option, index) in filterProduct"
              :key="index"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto" v-if="returnedCheckouts?.length > 0">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr class="bg-primaryLight">
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Customer
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Order ID
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Amount
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Status
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Date
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="order in returnedCheckouts"
            :key="order._id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium"
                >
                  {{ getInitials(order.deliveryDetails) }}
                </div>
                <div class="ml-4">
                  <div class="font-medium text-gray-900">
                    {{ order.deliveryDetails.firstName }}
                    {{ order.deliveryDetails.lastName }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ order.deliveryDetails.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">#{{ order._id }}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">
              ${{ order.cart?.total }}
            </td>
            <td class="px-6 py-4">
              <span :class="getStatusBadgeClass(order.paymentStatus)">
                {{ order.paymentStatus }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ formatDate(order.createdAt) }}
            </td>
            <td class="px-6 py-4">
              <button
                @click="openModal(order)"
                class="text-blue-500 hover:text-blue-700 flex gap-x-2 items-center whitespace-nowrap"
              >
                <i class="fas fa-eye"></i> view details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else
      key="noOrders"
      class="flex flex-col items-center justify-center p-8 text-center text-gray-500"
    >
      <i class="fas fa-box-open text-gray-300 text-6xl mb-4"></i>
      <!-- Icon -->
      <h3 class="text-lg font-bold">{{ noOrderMessage }}</h3>
      <p class="mt-2">Looks like there are no orders in this category yet.</p>
    </div>

    <!-- Modal -->
    <teleport to="body">
      <OrderDetails
        :singleCheckout="singleCheckout"
        :isModalOpen="isModalOpen"
        @close="isModalOpen = false"
      />
    </teleport>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref, watch } from "vue";
import { useCheckoutStore } from "../Store/checkout.store";
import { filterProduct } from "./utils/AdminUtils";
import { formatDate } from "@/utils/formatters";
import OrderDetails from "./OrderDetails.vue";

const isModalOpen = ref(false);
const checkoutFetch = useCheckoutStore();
const selectedOption = ref(filterProduct[0]);
const returnedCheckouts = ref([]);
const checkouts = ref([]);
let singleCheckout;
const noOrderMessage = ref("");

onUpdated(() => {
  if (selectedOption.value === "All Orders") {
    noOrderMessage.value = "No recent orders";
  } else if (selectedOption.value === "Pending") {
    noOrderMessage.value = "No pending orders";
  } else if (selectedOption.value === "Completed") {
    noOrderMessage.value = "No completed orders";
  } else if (selectedOption.value === "Failed") {
    noOrderMessage.value = "No failed orders";
  }
});

const getInitials = (details) => {
  return `${details.firstName[0]}${details.lastName[0]}`;
};

const filteredProduct = (option) => {
  if (option === "All Orders") {
    returnedCheckouts.value = checkouts.value;
  } else if (option === "Pending") {
    returnedCheckouts.value = checkouts.value
      .filter((checkout) => checkout.paymentStatus === "pending")
      .slice(0, 4);
  } else if (option === "Completed") {
    returnedCheckouts.value = checkouts.value
      .filter((checkout) => checkout.paymentStatus === "completed")
      .slice(0, 4);
  } else if (option === "Failed") {
    returnedCheckouts.value = checkouts.value
      .filter((checkout) => checkout.paymentStatus === "failed")
      .slice(0, 4);
  }
};

const getStatusBadgeClass = (status) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
  const statusClasses = {
    pending: "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };
  return `${baseClasses} ${statusClasses[status]}`;
};

const openModal = async (order) => {
  const response = await checkoutFetch.fetchSingleCheckout(order._id);
  singleCheckout = response.checkout;
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

onMounted(async () => {
  await checkoutFetch.fetchCheckout();
  checkouts.value = checkoutFetch.checkouts;
  filteredProduct(selectedOption.value);
});

watch(
  () => checkouts.value,
  (newCheckouts) => {
    if (newCheckouts && newCheckouts.length) {
      filteredProduct(selectedOption.value);
    }
  }
);
</script>
