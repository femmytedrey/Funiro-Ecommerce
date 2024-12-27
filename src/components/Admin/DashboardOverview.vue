<template>
  <div class="flex flex-col gap-y-8 pt-5 pb-10 relative px-4 lg:px-6">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in statsData"
        v-scroll-animate="'animate__zoomIn'"
        :key="stat.title"
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm">{{ stat.title }}</p>
            <h3 class="text-2xl font-bold mt-2">{{ stat.value }}</h3>
          </div>
          <div :class="stat.iconBg" class="p-4 rounded-lg">
            <i :class="[stat.icon, stat.iconColor, 'text-xl']"></i>
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <i :class="[stat.trendIcon, stat.trendColor, 'mr-2']"></i>
          <span :class="stat.trendColor" class="font-medium">{{
            stat.trend
          }}</span>
          <span class="text-gray-500 ml-2">{{ stat.comparison }}</span>
        </div>
      </div>
    </div>

    <!-- Metrics and Chart -->
    <div class="grid gap-6">
      <div
        class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden"
      >
        <div class="flex justify-between mb-6">
          <div>
            <h2 class="text-lg lg:text-xl font-bold">Revenue Overview</h2>
          </div>
          <span class="text-sm text-gray-500">Last 6 months</span>
        </div>

        <div class="w-full h-[300px] sm:h-[500px]">
          <canvas ref="revenueChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 h-fit transition-all duration-300 ease-in-out"
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

      <div class="overflow-x-auto" v-if="returnedCheckouts.length > 0">
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
        <h3 class="text-lg font-bold">No Recent Orders</h3>
        <p class="mt-2">Looks like there are no orders in this category yet.</p>
      </div>

      <div class="p-4 border-t border-gray-100 text-right">
        <button
          @click="viewAllOrders"
          class="text-blue-500 hover:text-blue-700 text-sm font-medium"
        >
          View All Orders →
        </button>
      </div>
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
import { computed, onMounted, onUpdated, watch } from "vue";
import { getStatsConfig } from "./utils/getStatsConfig";
import Chart from "chart.js/auto";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCheckoutStore } from "../Store/checkout.store";
import OrderDetails from "./OrderDetails.vue";
import { filterProduct } from "./utils/AdminUtils";

const props = defineProps({
  checkouts: {
    type: Array,
    required: true,
  },
  currentSection: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const emit = defineEmits(["update:currentSection"]);
const isModalOpen = ref(false);
const checkoutFetch = useCheckoutStore();
const selectedOption = ref(filterProduct[0]);
const returnedCheckouts = ref([]);

const filteredProduct = (option) => {
  if (option === "All Orders") {
    returnedCheckouts.value = props.checkouts.slice(0, 4);
  } else if (
    option === "Pending" &&
    (props.checkouts.paymentStatus = "pending")
  ) {
    returnedCheckouts.value = props.checkouts
      .filter((checkout) => checkout.paymentStatus === "pending")
      .slice(0, 4);
  } else if (
    option === "Completed" &&
    (props.checkouts.paymentStatus = "completed")
  ) {
    returnedCheckouts.value = props.checkouts
      .filter((checkout) => checkout.paymentStatus === "completed")
      .slice(0, 4);
  } else if (
    option === "Failed" &&
    (props.checkouts.paymentStatus = "failed")
  ) {
    returnedCheckouts.value = props.checkouts
      .filter((checkout) => checkout.paymentStatus === "failed")
      .slice(0, 4);
  }
};

watch(
  () => props.checkouts,
  (newCheckouts) => {
    if (newCheckouts && newCheckouts.length) {
      filteredProduct(selectedOption.value);
    }
  }
);

let singleCheckout;

const viewAllOrders = () => {
  emit("update:currentSection", "orders");
  router.push({
    path: "/admin",
    query: { section: "orders" },
  });
};

const revenueChart = ref(null);
let chart = null;

const openModal = async (order) => {
  const response = await checkoutFetch.fetchSingleCheckout(order._id);
  singleCheckout = response.checkout;
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const getMonthLabels = () => {
  const months = [];
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i);
    months.push(d.toLocaleString("default", { month: "short" }));
  }
  return months;
};

const monthlySales = computed(() => {
  const salesByMonth = new Array(6).fill(0);

  props.checkouts.forEach((order) => {
    if (!order?.cart?.updatedAt || !order?.cart?.total) return;
    if (order.paymentStatus === "completed") {
      const orderDate = new Date(order.cart?.updatedAt);
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();

      const today = new Date();
      const monthDiff =
        (today.getFullYear() - year) * 12 + (today.getMonth() - month);

      if (monthDiff >= 0 && monthDiff < 6) {
        const index = 5 - monthDiff;
        salesByMonth[index] += order.cart.total;
      }
    }
  });
  return salesByMonth;
});

const initCharts = async () => {
  const ctx = revenueChart.value.getContext("2d");
  if (!ctx) return;

  const totalRevenue = await monthlySales.value.reduce(
    (sum, value) => sum + value,
    0
  );

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: getMonthLabels(),
      datasets: [
        {
          label: "Revenue",
          data: monthlySales.value,
          backgroundColor: "#B88E2F",
          borderColor: "#F9F1E7",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Total Revenue: $${totalRevenue.toLocaleString()}`,
          align: "start",
          padding: {
            bottom: 30,
          },
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
};

watch(
  monthlySales,
  (newValue) => {
    if (chart) {
      chart.data.datasets[0].data = newValue;
      chart.update();
    }
  },
  { deep: true }
);

onMounted(() => {
  initCharts();
});

const calculateTotalRevenue = computed(() => {
  return props.checkouts
    .filter((checkout) => checkout.paymentStatus === "completed")
    .reduce((total, checkout) => total + (checkout.cart?.total || 0), 0)
    .toLocaleString();
});

const getInitials = (details) => {
  return `${details.firstName[0]}${details.lastName[0]}`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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

const statsData = computed(() =>
  getStatsConfig(props.checkouts, calculateTotalRevenue.value)
);
</script>
