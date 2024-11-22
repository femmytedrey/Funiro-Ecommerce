<template>
    <div class="text-primaryText mt-[4.8rem] sm:mt-0">
      <!-- Header with Gradient -->
      <header class="bg-gradient-to-r from-primary to-primary/80 py-6 text-white shadow-lg px-7 md:px-20 2xl:px-52">
        <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <h1 class="text-2xl font-semibold">Dashboard</h1>
              <div class="absolute -bottom-2 left-0 w-1/2 h-1 bg-white rounded-full"></div>
            </div>
            <span class="text-sm bg-white/20 px-3 py-1 rounded-full animate-pulse">Live</span>
          </div>
          <div class="flex items-center space-x-4 flex-wrap justify-center gap-2">
            <button @click="router.push('/shop')" 
              class="bg-white/10 text-white py-2 px-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center group">
              <i class="fas fa-store mr-2 group-hover:rotate-12 transition-transform"></i>
              Shop
            </button>
            <button @click="router.push('/orders')" 
              class="bg-white/10 text-white py-2 px-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center group">
              <i class="fas fa-shopping-bag mr-2 group-hover:rotate-12 transition-transform"></i>
              Orders
            </button>
            <button @click="handleLogout" 
              class="bg-white text-primary py-2 px-4 rounded-xl hover:bg-primaryLight transition-all duration-300 flex items-center group">
              <i class="fas fa-sign-out-alt mr-2 group-hover:translate-x-1 transition-transform"></i>
              Logout
            </button>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="container mx-auto py-10 px-4 md:px-20 2xl:px-52">
        <!-- Welcome Section with Animation -->
        <section class="mb-10 transform animate-fadeIn">
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex flex-col sm:flex-row items-center gap-6">
              <div class="relative">
                <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-user text-3xl text-primary"></i>
                </div>
                <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-check text-white text-xs"></i>
                </div>
              </div>
              <div class="text-center sm:text-left">
                <h2 class="text-3xl font-bold mb-2">Welcome back, {{ authUser.user.firstName }}! 👋</h2>
                <p class="text-lg text-gray-600">{{ getCurrentDate() }}</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Quick Stats Grid -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div v-for="(stat, index) in quickStats" :key="index"
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between mb-4">
              <div :class="`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`">
                <i :class="`${stat.icon} ${stat.iconColor}`"></i>
              </div>
              <span :class="`text-sm font-medium ${stat.textColor} ${stat.bgLight} px-2 py-1 rounded-full`">
                {{ stat.percentage }}
              </span>
            </div>
            <h3 class="text-lg font-medium text-gray-600">{{ stat.title }}</h3>
            <p class="text-2xl font-bold mt-2">{{ stat.value }}</p>
          </div>
        </section>
  
        <!-- Recent Orders and Analytics Split -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <!-- Recent Orders Card -->
          <div class="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold flex items-center">
                <i class="fas fa-clock text-primary mr-2"></i>
                Recent Orders
              </h2>
              <button @click="router.push('/orders')" 
                class="text-primary hover:text-primary/80 transition-colors flex items-center group">
                View All
                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
            
            <!-- Only show last 2 orders -->
            <div class="space-y-4">
              <div v-for="order in recentTwoOrders" :key="order._id" 
                class="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div class="flex justify-between items-center flex-wrap gap-4">
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <i class="fas fa-shopping-bag text-primary"></i>
                    </div>
                    <div>
                      <p class="font-medium">#{{ order._id.slice(-8).toUpperCase() }}</p>
                      <p class="text-sm text-gray-500">
                        {{ order.deliveryDetails.firstName }} {{ order.deliveryDetails.lastName }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span :class="getStatusClass(order.paymentStatus)" 
                      class="px-3 py-1 rounded-full text-sm font-medium">
                      {{ order.paymentStatus }}
                    </span>
                    <p class="font-semibold">{{ formatCurrency(order.cart?.total || 0) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Analytics Card -->
          <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <i class="fas fa-chart-pie text-primary mr-2"></i>
              Payment Analytics
            </h2>
            <canvas id="analyticsChart" class="w-full"></canvas>
          </div>
        </div>
  
        <!-- Sales Overview Chart -->
        <section class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 class="text-xl font-semibold flex items-center">
              <i class="fas fa-chart-line text-primary mr-2"></i>
              Sales Overview
            </h2>
            <div class="flex items-center space-x-4">
              <select v-model="chartPeriod" 
                class="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
          <canvas id="salesChart" class="w-full h-[300px]"></canvas>
        </section>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useAuthStore } from "@/components/Store/auth.store.js";
  import { useCheckoutStore } from "@/components/Store/checkout.store";
  import { useRouter } from 'vue-router';
  import Chart from 'chart.js/auto';
  import { formatCurrency, formatDate } from '@/utils/formatters';
  
  const router = useRouter();
  const authUser = useAuthStore();
  const checkoutStore = useCheckoutStore();
  const chartPeriod = ref('week');
  
  const recentTwoOrders = computed(() => {
    return checkoutStore.checkouts.slice(0, 2);
  });
  
  const quickStats = computed(() => [
    {
      title: 'Total Orders',
      value: orderStats.value.total,
      percentage: `+${orderStats.value.percentageIncrease}%`,
      icon: 'fas fa-shopping-cart',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-600',
      bgLight: 'bg-green-50'
    },
    {
      title: 'Completed Orders',
      value: orderStats.value.completed,
      percentage: `${orderStats.value.completedPercentage}%`,
      icon: 'fas fa-check-circle',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50'
    },
    {
      title: 'Pending Orders',
      value: orderStats.value.pending,
      percentage: `${orderStats.value.pendingPercentage}%`,
      icon: 'fas fa-clock',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-600',
      bgLight: 'bg-yellow-50'
    },
    {
      title: 'Failed Orders',
      value: orderStats.value.failed,
      percentage: `${orderStats.value.failedPercentage}%`,
      icon: 'fas fa-times-circle',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-600',
      bgLight: 'bg-red-50'
    }
  ]);
  
  const orderStats = ref({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    percentageIncrease: 0,
    completedPercentage: 0,
    pendingPercentage: 0,
    failedPercentage: 0
  });
  
  const handleLogout = async () => {
    await authUser.logout();
    router.push({ name: 'Login' });
  };
  
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getStatusClass = (status) => {
    const classes = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  };
  
  const calculateOrderStats = (orders) => {
    const total = orders.length;
    const completed = orders.filter(order => order.paymentStatus === 'completed').length;
    const pending = orders.filter(order => order.paymentStatus === 'pending').length;
    const failed = orders.filter(order => order.paymentStatus === 'failed').length;
  
    orderStats.value = {
      total,
      completed,
      pending,
      failed,
      percentageIncrease: 15,
      completedPercentage: Math.round((completed / total) * 100) || 0,
      pendingPercentage: Math.round((pending / total) * 100) || 0,
      failedPercentage: Math.round((failed / total) * 100) || 0
    };
  };
  
  onMounted(async () => {
    await checkoutStore.fetchCheckout();
    calculateOrderStats(checkoutStore.checkouts);
  
    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Sales',
          data: [3000, 2000, 4000, 3500, 4500, 5000, 4800],
          borderColor: '#B88E2F',
          backgroundColor: 'rgba(184, 142, 47, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  
    // Analytics Chart
    const analyticsCtx = document.getElementById('analyticsChart');
    new Chart(analyticsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending', 'Failed'],
        datasets: [{
          data: [
            orderStats.value.completed,
            orderStats.value.pending,
            orderStats.value.failed
          ],
          backgroundColor: [
            '#10B981',
            '#F59E0B',
            '#EF4444'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        cutout: '70%'
      }
    });
  });
  </script>
  
  <style scoped>
  .bg-primary {
    background-color: #B88E2F;
  }
  .bg-primaryLight {
    background-color: #F9F1E7;
  }
  .text-primaryText {
    color: #3a3a3a;
  }
  .text-textGreyLight {
    color: #898989;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  /* Responsive Tweaks */
  @media (max-width: 640px) {
    .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  
  /* Chart Responsiveness */
  canvas {
    max-height: 400px;
  }
  </style>
  