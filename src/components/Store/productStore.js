import axios from "axios";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: JSON.parse(sessionStorage.getItem("products")) || [],
    loading: false,
    error: null,
    currentPage: parseInt(sessionStorage.getItem("currentPage")) || 1,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/products`
        );
        this.products = response.data;
        sessionStorage.setItem("products", JSON.stringify(response.data));
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },

    async searchProduct(searchQuery) {
      this.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/products/search?q=${searchQuery}`);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching search results:', error.message);
      } finally {
        this.loading = false;
      }
    },    

    async fetchProduct(productId) {
      this.loading = true;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/products/${productId}`
        );
        return response.data;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },

    nextPage(itemsPerPage) {
      if (this.currentPage < this.totalPages(itemsPerPage)) {
        this.currentPage++;
        sessionStorage.setItem("currentPage", this.currentPage);
      }
    },

    prevPage(itemsPerPage) {
      if (this.currentPage > 1) {
        this.currentPage--;
        sessionStorage.setItem("currentPage", this.currentPage);
      }
    },

    gotoPage(page) {
      this.currentPage = page;
      sessionStorage.setItem("currentPage", page);
    },
  },
  getters: {
    displayProducts: (state) => (limit) => {
      return state.products.slice(0, limit);
    },
    paginatedProduct: (state) => (itemsPerPage) => {
      const start = (state.currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return state.products.slice(start, end);
    },
    totalPages: (state) => (itemsPerPage) => {
      return Math.ceil(state.products.length / itemsPerPage);
    },
    visiblePages: (state) => (maxVisiblePages, itemsPerPage) => {
      const total = Math.ceil(state.products.length / itemsPerPage);
      const current = state.currentPage;

      let start = Math.max(1, current - Math.floor(maxVisiblePages / 2));
      let end = Math.min(total, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
});
