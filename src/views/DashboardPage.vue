<template>
  <div class="text-primaryText mt-[4.8rem] sm:mt-0">
    <!-- Header -->
    <header class="bg-primary py-4 text-white shadow-md px-7 md:px-20">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <button @click="handleLogout" class="bg-white text-primary py-2 px-4 rounded-xl hover:bg-primaryLight transition">
          Logout
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto py-10 px-7 md:px-20"> 
      <!-- Welcome Section -->
      <section class="mb-10">
        <p class="text-3xl font-semibold">Welcome back, {{ authUser.user.firstName }}!</p>
        <p class="text-lg text-textGreyLight">Here’s an overview of your store’s performance and recent activity.</p>
      </section>

      <!-- Metrics and Charts -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Sales Overview -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">Sales Overview</h2>
          <div class="flex items-center justify-between mb-4">
            <p class="text-lg font-medium">Total Sales</p>
            <p class="text-2xl font-semibold">$12,345.67</p>
          </div>
          <canvas id="salesChart" class="w-full h-48"></canvas>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">Recent Orders</h2>
          <ul class="space-y-4">
            <li class="flex justify-between items-center border-b border-gray-200 pb-2">
              <p>Order #1234</p>
              <p class="font-semibold">$150.00</p>
            </li>
            <li class="flex justify-between items-center border-b border-gray-200 pb-2">
              <p>Order #1235</p>
              <p class="font-semibold">$200.00</p>
            </li>
            <!-- Add more orders here -->
          </ul>
        </div>

        <!-- Product Performance -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">Product Performance</h2>
          <div class="flex items-center justify-between mb-4">
            <p class="text-lg font-medium">Top Seller</p>
            <p class="text-2xl font-semibold">Elegant Sofa</p>
          </div>
          <canvas id="productChart" class="w-full h-48"></canvas>
        </div>
      </section>

      <!-- Notifications -->
      <section class="mt-10">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">Notifications</h2>
          <ul class="space-y-4">
            <li class="flex items-center border-b border-gray-200 pb-2">
              <div class="w-2.5 h-2.5 bg-green-500 rounded-full mr-3"></div>
              <p class="text-textGreyLight">New order placed: #1236</p>
            </li>
            <li class="flex items-center border-b border-gray-200 pb-2">
              <div class="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3"></div>
              <p class="text-textGreyLight">Inventory updated for 'Elegant Sofa'</p>
            </li>
            <!-- Add more notifications here -->
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from "@/components/Store/auth.store.js";
import { onMounted } from 'vue';
import Chart from 'chart.js/auto'; // Ensure Chart.js is installed
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authUser = useAuthStore();
    const router = useRouter()

    const handleLogout = async () => {
      await authUser.logout();
      router.push({name: 'Login'})
    };

    onMounted(() => {
      // Initialize charts
      const salesChart = new Chart(document.getElementById('salesChart'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Sales',
            data: [3000, 2000, 4000, 3500, 4500, 5000],
            backgroundColor: 'rgba(184, 142, 47, 0.2)',
            borderColor: '#B88E2F',
            borderWidth: 2,
          }]
        }
      });

      const productChart = new Chart(document.getElementById('productChart'), {
        type: 'bar',
        data: {
          labels: ['Product A', 'Product B', 'Product C', 'Product D'],
          datasets: [{
            label: 'Sales Volume',
            data: [500, 600, 400, 300],
            backgroundColor: '#B88E2F',
          }]
        }
      });
    });

    return {
      handleLogout,
      authUser,
    };
  },
};
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
</style>
