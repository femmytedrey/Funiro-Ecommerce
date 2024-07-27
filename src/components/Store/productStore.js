import axios from "axios";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: JSON.parse(sessionStorage.getItem('products')) || [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts(){
        this.loading = true
        try {
            const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/products`)
            this.products = response.data
            sessionStorage.setItem('products', JSON.stringify(response.data))
        } catch (error) {
            console.log(error.message)
        }
        finally {
            this.loading = false
        }
    },

    async fetchProduct(productId){
        this.loading = true
        try {
            const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/products/${productId}`)
            return response.data
        } catch (error) {
            console.log(error.response.data)
        } finally {
            this.loading = false
        }
    }
  },
  getters: {
    displayProducts: (state) => (limit) => {
       return state.products.slice(0, limit)
    }
  }
});
