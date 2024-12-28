<template>
  <div class="space-y-6 px-4 lg:px-6 pt-6 mb-12">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <h1 class="text-2xl text-gray-900">User Management</h1>
      <!-- <button
        class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 w-full sm:w-auto"
      >
        Add New User
      </button> -->
    </div>

    <!-- Check if the users list is empty -->
    <div
      v-if="users.length === 0"
      class="bg-white rounded-xl shadow-sm p-6 text-center"
    >
      <div class="flex justify-center mb-4">
        <i class="fas fa-box-open text-gray-400 text-5xl"></i>
      </div>
      <p class="text-gray-500 text-lg mb-4">
        Oops! It seems the user list is empty.
      </p>
      <button
        @click="refreshUsersList"
        class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 w-full sm:w-auto mx-auto"
      >
        Refresh User List
      </button>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px]">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-sm md:text-base font-medium text-gray-500"
              >
                Names
              </th>
              <th
                class="px-6 py-3 text-left text-sm md:text-base font-medium text-gray-500"
              >
                Email
              </th>
              <!-- <th
                class="px-6 py-3 text-left text-sm md:text-base font-medium text-gray-500"
              >
                Verified
              </th> -->
              <th
                class="px-6 py-3 text-left text-sm md:text-base font-medium text-gray-500"
              >
                Role
              </th>
              <th
                class="px-6 py-3 text-left text-sm md:text-base font-medium text-gray-500"
              >
                Created At
              </th>
              <th
                class="px-6 py-3 text-left text-sm md:text-base font-medium text-gray-500"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="(user, index) in users"
              :key="index"
              :class="index % 2 === 0 ? 'bg-primaryLight' : ''"
            >
              <td class="px-6 py-3">
                <div class="flex items-center">
                  <div
                    class="p-4 rounded-full text-white font-medium text-sm"
                    :class="index % 2 === 0 ? 'bg-blue-500' : 'bg-red-500'"
                  >
                    {{ getAvatar(user.firstName, user.lastName) }}
                  </div>
                  <div class="ml-4">
                    <div class="font-medium whitespace-nowrap">
                      {{ user.firstName }} {{ user.lastName }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">{{ user.email }}</td>
              <!-- <td class="px-6 py-4">
                <span
                  :class="
                    user.isVerified
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                  class="px-2 py-1 rounded-full text-xs"
                >
                  {{ user.isVerified ? "Yes" : "No" }}
                </span>
              </td> -->
              <td class="px-6 py-4">
                <span
                  :class="
                    user.isAdmin
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  "
                  class="px-2 py-1 rounded-full text-xs"
                >
                  {{ user.isAdmin ? "Admin" : "User" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatDate(user.createdAt) }}
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
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useAuthStore } from "../Store/auth.store";
import { formatDate } from "@/utils/formatters";

const userStore = useAuthStore();
const users = ref([]);

const refreshUsersList = async () => {
  try {
    await userStore.getUsers();
    users.value = userStore.users;
  } catch (error) {
    console.log("Error fetching users:", error.message);
  }
};

onBeforeMount(async () => {
  await refreshUsersList();
});

// Function to get avatar initials
const getAvatar = (firstName, lastName) => {
  return (
    (firstName?.[0] || "").toUpperCase() + (lastName?.[0] || "").toUpperCase()
  );
};
</script>

<style scoped></style>
