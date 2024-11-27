<template>
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
  </template>
  
  <script setup>
  import { onMounted, computed, onBeforeUnmount, watch } from 'vue';
  import Chart from 'chart.js/auto';
  import { formatCurrency } from '@/utils/formatters';
  
  const props = defineProps({
    checkouts: {
      type: Array,
      required: true
    }
  });
  
  const totalSales = computed(() => {
    return props.checkouts.reduce((total, order) => {
      return order.paymentStatus === "completed"
        ? total + (order.cart?.total || 0)
        : total;
    }, 0);
  });
  
  const monthlySales = computed(() => {
    const salesByMonth = new Array(6).fill(0);
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
  
    props.checkouts.forEach((order) => {
      if (order.paymentStatus === "completed") {
        const orderDate = new Date(order.createdAt);
        if (orderDate >= sixMonthsAgo) {
          const monthIndex =
            orderDate.getMonth() -
            sixMonthsAgo.getMonth() +
            (orderDate.getFullYear() - sixMonthsAgo.getFullYear()) * 12;
            console.log(monthIndex, "this is month index")
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
  
  let chartInstance = null;
  
  const initChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
  
    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthLabels.value,
        datasets: [{
          label: "Sales",
          data: monthlySales.value,
          backgroundColor: "rgba(184, 142, 47, 0.2)",
          borderColor: "#B88E2F",
          borderWidth: 2,
          tension: 0.4,
        }]
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
      }
    });
  };
  
  onMounted(() => {
    initChart();
  });
  
  watch(() => props.checkouts, () => {
    initChart();
  }, { deep: true });
  
  onBeforeUnmount(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  });
  </script>
  