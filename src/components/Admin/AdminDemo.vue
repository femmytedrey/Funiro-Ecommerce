<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Mobile Menu Button -->
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Sidebar Navigation -->
    <aside
      :class="[
        'w-64 h-screen bg-white shadow-lg fixed left-0 top-0 z-40 transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="p-4 border-b flex justify-between items-center">
        <h1 class="text-xl font-bold text-primary">Funiro Admin</h1>
        <button @click="isSidebarOpen = false" class="lg:hidden p-2">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <nav class="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
        <div
          v-for="(section, index) in navigationSections"
          :key="index"
          class="mb-6"
        >
          <h2 class="text-xs uppercase text-gray-500 font-semibold mb-2">
            {{ section.title }}
          </h2>
          <div class="space-y-2">
            <button
              v-for="item in section.items"
              :key="item.id"
              @click="currentSection = item.id"
              :class="[
                'w-full flex items-center space-x-3 p-2 rounded-lg transition-colors',
                currentSection === item.id
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100',
              ]"
            >
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </button>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="lg:ml-64 transition-all duration-300">
      <!-- Top Header -->
      <header
        class="bg-white shadow-sm h-16 fixed right-0 left-0 lg:left-64 top-0 z-30"
      >
        <div class="flex justify-between items-center h-full px-4 lg:px-6">
          <div class="flex items-center ml-12 lg:ml-0">
            <input
              type="text"
              placeholder="Search..."
              class="w-40 sm:w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div class="flex items-center space-x-4">
            <button class="relative">
              <i class="fas fa-bell text-xl"></i>
              <span
                class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
              >
                3
              </span>
            </button>
            <div class="flex items-center space-x-2">
              <img
                src="admin-avatar.jpg"
                alt="Admin"
                class="w-8 h-8 rounded-full"
              />
              <span class="font-medium hidden sm:inline">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Dynamic Content Area -->
      <main class="pt-20 p-4 lg:p-6">
        <!-- Dashboard Overview -->
        <div v-if="currentSection === 'dashboard'" class="space-y-6">
          <!-- Stats Grid -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            <div
              v-for="stat in stats"
              :key="stat.title"
              class="bg-white p-4 lg:p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div class="flex justify-between">
                <div>
                  <p class="text-gray-500 text-sm lg:text-base">
                    {{ stat.title }}
                  </p>
                  <p class="text-xl lg:text-2xl font-bold mt-2">
                    {{ stat.value }}
                  </p>
                </div>
                <div :class="`${stat.bgColor} p-3 rounded-full`">
                  <i
                    :class="`${stat.icon} ${stat.iconColor} text-lg lg:text-xl`"
                  ></i>
                </div>
              </div>
              <div class="mt-4 flex items-center">
                <span
                  :class="stat.trend >= 0 ? 'text-green-500' : 'text-red-500'"
                >
                  {{ stat.trend >= 0 ? "+" : "" }}{{ stat.trend }}%
                </span>
                <span class="text-gray-500 ml-2 text-sm">vs last month</span>
              </div>
            </div>
          </div>

          <!-- Charts Section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div class="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
              <h2 class="text-lg lg:text-xl font-bold mb-4">
                Revenue Overview
              </h2>
              <div class="h-[300px]">
                <canvas id="revenueChart"></canvas>
              </div>
            </div>
            <div class="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
              <h2 class="text-lg lg:text-xl font-bold mb-4">Sales Analytics</h2>
              <div class="h-[300px]">
                <canvas id="salesChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
            <h2 class="text-lg lg:text-xl font-bold mb-4">Recent Activity</h2>
            <div class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-center justify-between border-b pb-4"
              >
                <div class="flex items-center space-x-4">
                  <div :class="`${activity.bgColor} p-2 rounded-full`">
                    <i :class="`${activity.icon} ${activity.iconColor}`"></i>
                  </div>
                  <div>
                    <p class="font-medium">{{ activity.title }}</p>
                    <p class="text-sm text-gray-500">{{ activity.time }}</p>
                  </div>
                </div>
                <button
                  class="text-primary hover:underline text-sm lg:text-base"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Management -->
        <div v-if="currentSection === 'users'" class="space-y-6">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h1 class="text-xl lg:text-2xl font-bold">User Management</h1>
            <button
              class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 w-full sm:w-auto"
            >
              Add New User
            </button>
          </div>

          <!-- Users Table -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full min-w-[800px]">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500"
                    >
                      User
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500"
                    >
                      Email
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500"
                    >
                      Role
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="user in users" :key="user.id">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <img
                          :src="user.avatar"
                          alt=""
                          class="w-8 h-8 rounded-full"
                        />
                        <div class="ml-4">
                          <div class="font-medium">{{ user.name }}</div>
                          <div class="text-sm text-gray-500">
                            Joined {{ user.joinDate }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">{{ user.email }}</td>
                    <td class="px-6 py-4">
                      <span
                        :class="getRoleBadgeClass(user.role)"
                        class="px-2 py-1 rounded-full text-xs"
                      >
                        {{ user.role }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        :class="getStatusBadgeClass(user.status)"
                        class="px-2 py-1 rounded-full text-xs"
                      >
                        {{ user.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex space-x-2">
                        <button class="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                        <button class="text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Products Management -->
        <div v-if="currentSection === 'products'" class="space-y-6">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <div
              v-for="product in products"
              :key="product.id"
              class="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="font-bold">{{ product.name }}</h3>
                <p class="text-gray-500 text-sm">{{ product.category }}</p>
                <div class="mt-4 flex justify-between items-center">
                  <p class="font-bold">${{ product.price }}</p>
                  <p class="text-sm text-gray-500">
                    Stock: {{ product.stock }}
                  </p>
                </div>
                <div class="mt-4 flex space-x-2">
                  <button
                    class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    class="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Other sections remain similar with responsive classes -->
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { useCheckoutStore } from "../Store/checkout.store";

// In your script setup section
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const checkoutStore = useCheckoutStore();
const currentSection = ref("dashboard");

const navigationSections = [
  {
    title: "Main",
    items: [
      { id: "dashboard", name: "Dashboard", icon: "fas fa-home" },
      { id: "analytics", name: "Analytics", icon: "fas fa-chart-line" },
    ],
  },
  {
    title: "Management",
    items: [
      { id: "users", name: "Users", icon: "fas fa-users" },
      { id: "products", name: "Products", icon: "fas fa-box" },
      { id: "orders", name: "Orders", icon: "fas fa-shopping-cart" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { id: "marketing", name: "Marketing", icon: "fas fa-bullhorn" },
      { id: "promotions", name: "Promotions", icon: "fas fa-percentage" },
    ],
  },
  {
    title: "Configuration",
    items: [{ id: "settings", name: "Settings", icon: "fas fa-cog" }],
  },
];

const stats = ref([
  {
    title: "Total Revenue",
    value: "$45,231",
    icon: "fas fa-dollar-sign",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    trend: 12,
  },
  {
    title: "Total Orders",
    value: "1,234",
    icon: "fas fa-shopping-cart",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    trend: 8,
  },
  {
    title: "Average Order Value",
    value: "$123",
    icon: "fas fa-chart-line",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    trend: -2,
  },
  {
    title: "Conversion Rate",
    value: "2.4%",
    icon: "fas fa-percentage",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    trend: 5,
  },
]);

const users = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    avatar: "path/to/avatar",
    joinDate: "2023-01-15",
  },
]);

const recentActivity = ref([
  {
    id: 1,
    title: "New order received",
    time: "5 minutes ago",
    icon: "fas fa-shopping-bag",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
]);

const getRoleBadgeClass = (role) => {
  return (
    {
      admin: "bg-purple-100 text-purple-800",
      user: "bg-blue-100 text-blue-800",
    }[role] || "bg-gray-100 text-gray-800"
  );
};

const getStatusBadgeClass = (status) => {
  return (
    {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
    }[status] || "bg-gray-100 text-gray-800"
  );
};

onMounted(() => {
  initializeCharts();
});

const initializeCharts = () => {
  // Revenue Chart
  new Chart(document.getElementById("revenueChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue",
          data: [30000, 25000, 35000, 32000, 40000, 45000],
          borderColor: "#B88E2F",
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
    },
  });

  // Sales Chart
  new Chart(document.getElementById("salesChart"), {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: "#B88E2F",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
    },
  });
};

// Products data
const products = ref([
  {
    id: 1,
    name: "Elegant Sofa",
    category: "Furniture",
    price: 999.99,
    stock: 15,
    image: "/path/to/sofa-image.jpg",
  },
  {
    id: 2,
    name: "Modern Chair",
    category: "Furniture",
    price: 299.99,
    stock: 25,
    image: "/path/to/chair-image.jpg",
  },
]);

// Orders data
const orders = ref([
  {
    id: 1,
    customer: "Jane Smith",
    status: "completed",
    total: 1299.99,
    date: "2024-01-20",
  },
  {
    id: 2,
    customer: "Mike Johnson",
    status: "pending",
    total: 499.99,
    date: "2024-01-19",
  },
]);

// Marketing campaigns data
const campaigns = ref([
  {
    id: 1,
    name: "Spring Collection Launch",
    status: "active",
    reach: "15,000",
    engagement: 18,
    conversion: 3.2,
  },
  {
    id: 2,
    name: "Winter Clearance",
    status: "scheduled",
    reach: "20,000",
    engagement: 22,
    conversion: 4.5,
  },
]);

// System settings data
const settings = ref({
  general: {
    storeName: "Funiro Store",
    currency: "USD",
    timezone: "UTC",
  },
  payment: {
    gateway: "Stripe",
    testMode: true,
  },
  shipping: {
    methods: [
      {
        id: 1,
        name: "Standard Shipping",
        price: 10,
        active: true,
      },
      {
        id: 2,
        name: "Express Shipping",
        price: 25,
        active: true,
      },
    ],
  },
});
</script>
