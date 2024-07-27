<template>
  <div class="py-40 gap-y-12 flex flex-col justify-center items-center font-semibold text-2xl ">
    <p class="text-center">Hey {{ authUser.user.firstName}}, Welcome to your Dashboard</p>
    <button class="bg-primary px-8 py-2 text-white rounded-xl" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from "../components/Store/auth.store.js";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const authUser = useAuthStore();
    const router = useRouter()

    const handleLogout = async () => {
      await authUser.logout();
      router.push({name: 'Login'})
    };

    return {
      handleLogout,
      authUser,
    };
  },
};
</script>

<style></style>
