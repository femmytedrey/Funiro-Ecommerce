<template>
  <header
    class="bg-white shadow-sm h-16 z-30"
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
        <button
          class="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white hover:shadow-md transition duration-300"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span class="font-medium hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup></script>
