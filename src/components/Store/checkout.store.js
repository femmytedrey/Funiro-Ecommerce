import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth.store";
import { auth } from "../FirebaseSetup/Firebase";

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    checkouts: [],
    isLoading: false,
    error: null,
    lastFetchedToken: null,
    validationErrors: null,
  }),
  getters: {
    hasValidationErrors: (state) => !!state.validationErrors,
    getValidationErrors: (state) => state.validationErrors || {},
    completedOrders: (state) =>
      state.checkouts.filter(
        (checkout) => checkout.paymentStatus === "completed"
      ),
    pendingOrders: (state) =>
      state.checkouts.filter(
        (checkout) => checkout.paymentStatus === "pending"
      ),
    // cancelledOrders: (state) => state.checkouts.filter(checkout => checkout.paymentStatus === "cancelled"),
    failedOrders: (state) =>
      state.checkouts.filter((checkout) => checkout.paymentStatus === "failed"),
  },
  actions: {
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

    async getUser() {
      const authStore = useAuthStore();
      const user = authStore.user;
      return user;
    },

    async fetchCheckout() {
      this.isLoading = true;
      this.error = null;
      try {
        const idToken = await this.getIdToken();
        if (this.lastFetchedToken !== idToken) {
          this.lastFetchedToken = idToken;

          const response = await axios.get(
            `${process.env.VUE_APP_BASE_URL}/checkout`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
          this.checkouts = response?.data?.checkouts;
        }
      } catch (error) {
        this.error = error.response?.data?.error;
        this.checkouts = [];
      } finally {
        this.isLoading = false;
      }
    },

    async fetchSingleCheckout(checkoutId) {
      this.isLoading = true;
      this.error = null;

      try {
        const idToken = await this.getIdToken();
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/checkout/${checkoutId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        return { success: true, checkout: response.data.checkout };
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch checkout";
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    async createCheckout(deliveryDetails, paymentMethod) {
      this.isLoading = true;
      this.error = null;
      this.validationErrors = null;

      try {
        const idToken = await this.getIdToken();
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/checkout`,
          { deliveryDetails, paymentMethod },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        const newCheckout = response.data.checkout;
        this.checkouts.unshift(newCheckout);
        return { success: true, checkout: newCheckout };
      } catch (error) {
        if (error.response?.status === 422) {
          this.validationErrors = error.response.data.errors;
          return { success: false, validationErrors: this.validationErrors };
        }

        this.error = error.response?.data?.error;
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    async createCheckoutSession(checkoutId) {
      this.isLoading = true;
      this.error = null;

      try {
        const idToken = await this.getIdToken();
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/checkout/create-checkout-session`,
          { checkoutId },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        return { success: true, url: response.data.url };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Failed to create payment session";
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },

    async deleteCheckout(checkoutId) {
      try {
        const idToken = await this.getIdToken();
        const response = await axios.delete(
          `${process.env.VUE_APP_BASE_URL}/checkout/${checkoutId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (response.status === 200) {
          // Remove the deleted checkout from the store
          this.checkouts = this.checkouts.filter(
            (checkout) => checkout._id !== checkoutId
          );

          return {
            success: true,
            message: response.data.message,
            deletedCheckoutId: response.data.deletedCheckoutId,
            deletedCartId: response.data.deletedCartId,
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.error || "Failed to delete checkout",
        };
      }
    },

    async getCheckoutSession(sessionId) {
      this.isLoading = true;
      this.error = null;

      try {
        const idToken = await this.getIdToken();
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/checkout/session/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        return { success: true, checkoutId: response.data.checkoutId };
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch session";
        return { success: false, error: this.error };
      } finally {
        this.isLoading = false;
      }
    },
  },
});
