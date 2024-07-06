<template>
  <button
    @click="continueWIthGoogle"
    class="w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition duration-200"
  >
    <i class="fab fa-google"></i> Continue with Google
  </button>
</template>

<script>
import { useAuthStore } from "@/components/Store/auth.store";
import { useRouter } from "vue-router";
export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const continueWIthGoogle = async () => {
      await authStore.signInWithGoogle();
      router.push({
        name: "Dashboard",
      });
    };
    return {
      continueWIthGoogle,
    };
  },
};
</script>
