<template>
  <div class="flex flex-col gap-6">
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        v-for="(stat, index) in quickStats"
        :key="stat.title"
        v-bind="stat"
        :index="index"
      />
    </section>

    <!-- Metrics and Charts -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 " v-scroll-animate="'animate__slideInLeft'" >
      <!-- Sales Overview -->
      <SalesChart :checkouts="checkoutStore.checkouts" />
      <!-- Analytics Card -->
      <AnalyticsChart :order-stats="orderStats" />
    </section>

    <section v-scroll-animate="'animate__slideInUp'" class="grid gap-6 mb-10 animate__fast">
      <div
        class="lg:col-span-2 bg-white rounded-xl shadow-md p-6 transition-shadow"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold flex items-center">
            <i class="fas fa-clock text-primary mr-2"></i>
            Recent Orders
          </h2>
          <button
            @click="router.push('/orders')"
            class="text-primary hover:text-primary/80 transition-colors flex items-center group"
          >
            View All
            <i
              class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
            ></i>
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="order in recentTwoOrders"
            :key="order._id"
            class="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
          >
            <div class="flex justify-between items-center flex-wrap gap-4">
              <div class="flex items-center space-x-4">
                <div
                  class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <i class="fas fa-shopping-bag text-primary"></i>
                </div>
                <div>
                  <p class="font-medium">
                    #{{ order._id.slice(-8).toUpperCase() }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ order.deliveryDetails.firstName }}
                    {{ order.deliveryDetails.lastName }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <span
                  :class="getStatusClass(order.paymentStatus)"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ order.paymentStatus }}
                </span>
                <p class="font-semibold">
                  {{ formatCurrency(order.cart?.total || 0) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCheckoutStore } from "../Store/checkout.store";
import { computed } from "vue";
import { ref } from "vue";
import { formatCurrency } from "@/utils/formatters";
import { useRouter } from "vue-router";
import StatCard from "./StatCard.vue";
import SalesChart from "./SalesChart.vue";
import AnalyticsChart from "./AnalyticsChart.vue";

const checkoutStore = useCheckoutStore();
const router = useRouter();

const recentTwoOrders = computed(() => {
  return checkoutStore.checkouts.slice(0, 2);
});

const orderStats = ref({
  total: 0,
  completed: 0,
  pending: 0,
  failed: 0,
  percentageIncrease: 0,
  completedPercentage: 0,
  pendingPercentage: 0,
  failedPercentage: 0,
});

const quickStats = computed(() => [
  {
    title: "Total Orders",
    value: orderStats.value.total,
    percentage: `+${orderStats.value.percentageIncrease}%`,
    icon: "fas fa-shopping-cart",
  },
  {
    title: "Completed Orders",
    value: orderStats.value.completed,
    percentage: `${orderStats.value.completedPercentage}%`,
    icon: "fas fa-check-circle",
  },
  {
    title: "Pending Orders",
    value: orderStats.value.pending,
    percentage: `${orderStats.value.pendingPercentage}%`,
    icon: "fas fa-clock",
  },
  {
    title: "Failed Orders",
    value: orderStats.value.failed,
    percentage: `${orderStats.value.failedPercentage}%`,
    icon: "fas fa-times-circle",
  },
]);

const getStatusClass = (status) => {
  const classes = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const calculateOrderStats = (orders) => {
  const total = orders.length;
  const completed = orders.filter(
    (order) => order.paymentStatus === "completed"
  ).length;
  const pending = orders.filter(
    (order) => order.paymentStatus === "pending"
  ).length;
  const failed = orders.filter(
    (order) => order.paymentStatus === "failed"
  ).length;

  orderStats.value = {
    total,
    completed,
    pending,
    failed,
    percentageIncrease: 15,
    completedPercentage: Math.round((completed / total) * 100) || 0,
    pendingPercentage: Math.round((pending / total) * 100) || 0,
    failedPercentage: Math.round((failed / total) * 100) || 0,
  };
};

onMounted(async () => {
  await checkoutStore.fetchCheckout();
  calculateOrderStats(checkoutStore.checkouts);

  
});
</script>
