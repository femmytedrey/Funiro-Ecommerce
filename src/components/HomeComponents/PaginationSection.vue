<template>
  <div class="flex justify-center mt-4">
    <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mx-1 bg-gray-200 rounded">
      Prev
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="['px-4 py-2 mx-1 rounded', { 'bg-primary text-white': page === currentPage, 'bg-gray-200': page !== currentPage }]"
    >
      {{ page }}
    </button>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 mx-1 bg-gray-200 rounded">
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    currentPage: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
.bg-primary {
  background-color: #007bff;
}
</style>
