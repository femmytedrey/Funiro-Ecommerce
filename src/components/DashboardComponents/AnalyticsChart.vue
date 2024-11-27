<template>
    <div class="bg-white p-6 rounded-xl shadow-md h-[400px] flex flex-col">
      <h2 class="text-xl font-semibold mb-4 flex items-center">
        <i class="fas fa-chart-pie text-primary mr-2"></i>
        Payment Analytics
      </h2>
      <div class="flex-grow relative flex items-center justify-center">
        <canvas id="analyticsChart" class="max-h-[300px]"></canvas>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
  const props = defineProps({
    orderStats: {
      type: Object,
      required: true
    }
  });
  
  let chartInstance = null;
  
  const initChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    const ctx = document.getElementById('analyticsChart');
    if (!ctx) return;
  
    chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Pending", "Failed"],
        datasets: [{
          data: [
            props.orderStats.completed,
            props.orderStats.pending,
            props.orderStats.failed,
          ],
          backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        cutout: "70%",
      }
    });
  };
  
  onMounted(() => {
    initChart();
  });
  
  watch(() => props.orderStats, () => {
    initChart();
  }, { deep: true });
  
  onBeforeUnmount(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  });
  </script>
  