<template>
  <div class="flex flex-col gap-6">
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="(stat, index) in quickStats"
        :key="stat.title"
        class="relative overflow-hidden rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
        :class="[
          index === 0 ? 'bg-primary text-white' : '',
          index === 1 ? 'bg-[#10B981] text-white' : '',
          index === 2 ? 'bg-[#F59E0B] text-white' : '',
          index === 3 ? 'bg-[#EF4444] text-white' : '',
        ]"
      >
        <!-- Bg Pattern -->
        <div
          class="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 opacity-10"
        >
          <i :class="[stat.icon, 'text-[100px]']"></i>
        </div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
            >
              <i :class="[stat.icon, 'text-xl']"></i>
            </div>
            <h3 class="font-medium">{{ stat.title }}</h3>
          </div>

          <div class="flex items-end justify-between">
            <p class="text-4xl font-bold">{{ stat.value }}</p>
            <div
              class="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm"
            >
              <i class="fas fa-arrow-up text-xs"></i>
              {{ stat.percentage }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Metrics and Charts -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Sales Overview -->
      <div class="bg-white p-6 rounded-xl shadow-md h-[400px] flex flex-col">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <i class="fas fa-chart-line text-primary mr-2"></i>
          Sales Overview
        </h2>
        <div class="flex items-center justify-between mb-6">
          <p class="text-lg font-medium text-gray-600">Total Sales</p>
          <p class="text-2xl font-semibold text-primary">
            {{ formatCurrency(totalSales) }}
          </p>
        </div>
        <div class="flex-grow relative">
          <canvas id="salesChart" class="w-full h-full"></canvas>
        </div>
      </div>

      <!-- Analytics Card -->
      <div class="bg-white p-6 rounded-xl shadow-md h-[400px] flex flex-col">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <i class="fas fa-chart-pie text-primary mr-2"></i>
          Payment Analytics
        </h2>
        <div class="flex-grow relative flex items-center justify-center">
          <canvas id="analyticsChart" class="max-h-[300px]"></canvas>
        </div>
      </div>
    </section>

    <section class="grid gap-6 mb-10">
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
import Chart from "chart.js/auto";
import { useCheckoutStore } from "../Store/checkout.store";
import { computed } from "vue";
import { ref } from "vue";
import { formatCurrency } from "@/utils/formatters";
import { useRouter } from "vue-router";
import { nextTick } from "vue";

const checkoutStore = useCheckoutStore();
const chartPeriod = ref("week");
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
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    textColor: "text-green-600",
    bgLight: "bg-green-50",
  },
  {
    title: "Completed Orders",
    value: orderStats.value.completed,
    percentage: `${orderStats.value.completedPercentage}%`,
    icon: "fas fa-check-circle",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    textColor: "text-blue-600",
    bgLight: "bg-blue-50",
  },
  {
    title: "Pending Orders",
    value: orderStats.value.pending,
    percentage: `${orderStats.value.pendingPercentage}%`,
    icon: "fas fa-clock",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    textColor: "text-yellow-600",
    bgLight: "bg-yellow-50",
  },
  {
    title: "Failed Orders",
    value: orderStats.value.failed,
    percentage: `${orderStats.value.failedPercentage}%`,
    icon: "fas fa-times-circle",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    textColor: "text-red-600",
    bgLight: "bg-red-50",
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

// Add these computed properties
const totalSales = computed(() => {
  return checkoutStore.checkouts.reduce((total, order) => {
    return order.paymentStatus === "completed"
      ? total + (order.cart?.total || 0)
      : total;
  }, 0);
});

const monthlySales = computed(() => {
  const salesByMonth = new Array(6).fill(0);
  const today = new Date();
  const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);

  checkoutStore.checkouts.forEach((order) => {
    if (order.paymentStatus === "completed") {
      const orderDate = new Date(order.createdAt);
      if (orderDate >= sixMonthsAgo) {
        const monthIndex =
          orderDate.getMonth() -
          sixMonthsAgo.getMonth() +
          (orderDate.getFullYear() - sixMonthsAgo.getFullYear()) * 12;
        if (monthIndex >= 0 && monthIndex < 6) {
          salesByMonth[monthIndex] += order.cart?.total || 0;
        }
      }
    }
  });
  return salesByMonth;
});

const monthLabels = computed(() => {
  const months = [];
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push(month.toLocaleString("default", { month: "short" }));
  }
  return months;
});

onMounted(async () => {
  await checkoutStore.fetchCheckout();
  calculateOrderStats(checkoutStore.checkouts);

  const salesChartEl = document.getElementById("salesChart");
  const analyticsChartEl = document.getElementById("analyticsChart");

  nextTick(() => {
    const salesChart = new Chart(salesChartEl, {
    type: "line",
    data: {
      labels: monthLabels.value,
      datasets: [
        {
          label: "Sales",
          data: monthlySales.value,
          backgroundColor: "rgba(184, 142, 47, 0.2)",
          borderColor: "#B88E2F",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return formatCurrency(context.raw);
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return formatCurrency(value);
            },
          },
        },
      },
    },
  });

  const analyticsCtx =  new Chart(analyticsChartEl, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Pending", "Failed"],
      datasets: [
        {
          data: [
            orderStats.value.completed,
            orderStats.value.pending,
            orderStats.value.failed,
          ],
          backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      cutout: "70%",
    },
  });
  })
});
</script>
