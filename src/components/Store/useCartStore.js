import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth.store";
import { auth } from "../FirebaseSetup/Firebase";
import Cookies from "js-cookie";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: {},
    isLoading: false,
    error: null,
    lastFetchedToken: null,
  }),

  getters: {
    itemCount: (state) =>
      state.cart.items
        ? state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0,
    //totalPrice: (state) => state.items.total || 0,
  },

  actions: {
    //getuSerToken
    async getIdToken() {
      return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          unsubscribe();
          if (user) {
            try {
              const idToken = await user.getIdToken(true);
              resolve(idToken);
            } catch (error) {
              reject(new Error("Failed to get IdToken"));
            }
          } else {
            reject(new Error("User is not authorized"));
          }
        }, reject);
      });
    },

    //fetch cart
    async fetchCart() {
      this.isLoading = true;
      this.error = null;

      try {
        const idToken = await this.getIdToken();

        if (this.lastFetchedToken !== idToken) {
          this.lastFetchedToken = idToken;

          const response = await axios.get(
            `${process.env.VUE_APP_BASE_URL}/carts`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          this.cart = response?.data?.cart || {};
          //   sessionStorage.setItem("cart", JSON.stringify(this.cart));
        }
      } catch (error) {
        this.error = error.response?.data?.error;
        this.cart = {};
      } finally {
        this.isLoading = false;
      }
    },

    //add to cart
    async addToCart(productId, quantity) {
      this.isLoading = true;
      this.error = null;

      try {
        const idToken = await this.getIdToken();

        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/carts`,
          { productId, quantity },
          { headers: { Authorization: `Bearer ${idToken}` } }
        );

        this.cart = response?.data?.cart;
        //sessionStorage.setItem("cart", JSON.stringify(this.cart));
      } catch (error) {
        this.error = error.response?.data?.error;
        throw new Error(error.response?.data?.error);
      } finally {
        this.isLoading = false;
      }
    },

    //delete an item from cart
    async deleteItem(productId) {
      this.isLoading = false;
      this.error = null;

      try {
        const idToken = await this.getIdToken();
        const response = await axios.delete(
          `${process.env.VUE_APP_BASE_URL}/carts/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        this.cart = response?.data?.cart;
      } catch (error) {
        this.error = error.response?.data?.error;
        throw new Error(error.response?.data?.error);
      }
    },

    clearCart() {
      this.cart = {};
      //sessionStorage.removeItem("cart");
      this.lastFetchedToken = null;
    },

    async initializeCart() {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        //this.loadFromLocalStorage();
        await this.fetchCart();
      } else {
        this.clearCart();
      }
    },
  },
});
