<template>
  <div
    class="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 img-space px-5 space-y-5"
  >
    <div
      class="absolute min-h-screen backdrop-blur-sm w-full inset-0 z-10"
    ></div>
    <div
      class="bg-white/95 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6 z-20"
    >
      <h2 class="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6">
        Reset Your Password
      </h2>

      <form @submit.prevent="handleSend" class="space-y-4" novalidate>
        <div class="relative">
          <InputField
            label="Email"
            id="email"
            type="email"
            v-model="email"
            placeholder="example@email.com"
          />
          <p v-if="errors.email" class="text-red-600">
            {{ errors.email }}
          </p>
          <p v-if="error" class="text-red-600">Please provide your email</p>
        </div>

        <AuthButtons btnText="Send Reset Link" :shouldShake="shouldShake" />
      </form>
    </div>

    <button
      @click="goBack"
      class="text-white underline hover:text-gray-200 transition px-12 py-2 z-20"
    >
      <i class="fas fa-arrow-left mr-2"></i> Go Back
    </button>

    <div
      v-if="loading"
      class="z-30 -top-5 absolute inset-0 flex items-center justify-center bg-black/50"
    >
      <div
        class="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"
      ></div>
    </div>
  </div>
</template>

<script>
import InputField from "../../components/ReusableComponent/InputField.vue";
import AuthButtons from "../../components/ReusableComponent/AuthButtons.vue";
import { useAuthStore } from "../../components/Store/auth.store.js";
import { mapState } from "pinia";

export default {
  components: {
    InputField,
    AuthButtons,
  },
  computed: {
    ...mapState(useAuthStore, ["errors", "loading"]),
  },
  data() {
    return {
      error: false,
      email: "",
      shouldShake: false,
    };
  },
  mounted() {
    const { clearErrors, user } = useAuthStore();
    clearErrors();
    user.email = "";
  },
  methods: {
    async handleSend() {
      const authStore = useAuthStore();
      if (!this.email) {
        this.error = true;
        this.shouldShake = true;
        setTimeout(() => {
          this.shouldShake = false;
        }, 1000);
        return;
      }

      this.error = false;
      authStore.resetPassword(this.email);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.img-space {
  background-image: url("../../assets/auth-bg.jpg");
  background-size: cover;
  background-position: bottom;
}
</style>
