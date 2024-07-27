<template>
  <div
    class="absolute w-44 bg-white border-[1.5px] -right-10 top-11 rounded-xl transition-all duration-300 ease-in-out flex flex-col pb-1"
    @mouseleave="closeModal"
  >
    <div class="px-5 py-3 text-center text-sm cursor-default">
      <p class="text-gray-500">{{ user.firstName }} {{ user.lastName }}</p>
      <p class="font-semibold">{{ formattedEmail }}</p>
    </div>
    <div class="flex flex-col text-sm font-semibold">
      <router-link
        :to="{ name: 'Dashboard' }"
        class="w-full text-left px-5 py-2 border-t border-b hover:bg-slate-100/60"
      >
        Dashboard
      </router-link>
      <button @click="handleLogout" class="w-full text-left px-5 py-2 flex gap-x-2 items-center">
        <i class="fa-solid fa-arrow-left"></i> Logout
      </button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../Store/auth.store";

export default defineComponent({
  emits: ["close"],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const router = useRouter();


    const closeModal = () => {
      emit("close");
    };

    const user = computed(() => authStore.user);

    const formattedEmail = computed(() => {
      const email = authStore.user.email;
      const [localPart, domainPart] = email.split("@");
      return localPart + "@" + domainPart.substring(0, 2) + "...";
      // return localPart + '@' + domainPart.subString(0) + '...'
    });

    const handleLogout = async () => {
        await authStore.logout()
        router.push({name: 'Login'})
    }

    return {
      closeModal,
      handleLogout,
      formattedEmail,
      user,
    };
  },
});
</script>
