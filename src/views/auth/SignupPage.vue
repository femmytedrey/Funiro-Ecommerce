<template>
  <div
    class="min-h-screen flex items-center justify-center flex-col bg-gray-50 img-space px-5 space-y-5"
  >
    <div class="bg-white/90 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
      <h2 class="text-2xl font-semibold text-center">Sign Up</h2>
      <GoogleAuthBtn />
      <div class="relative">
        <hr class="border-t-1 border-gray-300" />
        <span
          class="absolute inset-x-0 top-[-10px] bg-white px-3 text-gray-500 text-sm text-center mx-auto"
          >or</span
        >
      </div>
      <form @submit.prevent="handleSignup" class="space-y-4" novalidate>
        <div class="mb-4 relative">
          <InputField
            label="First Name"
            placeholder="e.g John"
            id="fname"
            type="text"
            v-model="user.firstName"
          />
          <p v-if="errors.firstName" class="text-red-500 text-sm md:text-base">
            {{ errors.firstName }}
          </p>
        </div>

        <div class="mb-4 relative">
          <InputField
            label="Last Name"
            placeholder="e.g Doe"
            id="lname"
            type="text"
            v-model="user.lastName"
          />
          <p v-if="errors.lastName" class="text-red-500 text-sm md:text-base">
            {{ errors.lastName }}
          </p>
        </div>

        <div class="mb-4 relative">
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="example@email.com"
            v-model="user.email"
          />
          <p v-if="errors.email" class="text-red-500 text-sm md:text-base">
            {{ errors.email }}
          </p>
        </div>

        <div class="mb-4 relative">
          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="* * * * * * * * * * *"
            v-model="user.password"
          />
          <p v-if="errors.password" class="text-red-500 text-sm md:text-base">
            {{ errors.password }}
          </p>
        </div>

        <AuthButtons :btnText="loading ? 'Signing up...' : 'Sign Up'" />

        <div class="text-center">
          Already have an account?
          <router-link to="/auth/login" class="text-primary hover:underline">
            Login
          </router-link>
        </div>
      </form>
    </div>
    <button @click="goBack" class="underline text-white px-12 py-2">
      <i class="fas fa-arrow-left w-6 h-6"></i>Go Back
    </button>
  </div>
</template>

<script>
import InputField from "../../components/ReusableComponent/InputField.vue";
import AuthButtons from "../../components/ReusableComponent/AuthButtons.vue";
import { useAuthStore } from "../../components/Store/auth.store.js";
import { mapState } from "pinia";
import GoogleAuthBtn from "./GoogleAuthBtn"

export default {
  components: {
    InputField,
    AuthButtons,
    GoogleAuthBtn,
  },
  computed: {
    ...mapState(useAuthStore, ["errors", "loading", "user", "isAuthenticated"]),
  },

  methods: {
    async handleSignup() {
      const authStore = useAuthStore();
      await authStore.signup(this.user);
      if (Object.keys(authStore.errors).length === 0) {
        this.$router.push({name: "Dashboard"})
      } else{
        console.log(authStore.errors)
      }
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.img-space {
  background-image: url("../../assets/auth-bg.jpg");
  background-size: cover;
  background-position: bottom;
}
</style>
