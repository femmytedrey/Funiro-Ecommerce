<template>
  <template v-if="isAdminRoute">
    <!-- <AdminPage /> -->
     <router-view />
  </template>

  <template v-if="isAdminRoute">
    <AdminDemo />
  </template>
  
  <template v-else>
    <div class="h-screen flex flex-col justify-between">
      <template v-if="!isAuthRoute">
        <NavbarComponent />
      </template>
      
      <router-view />
      
      <template v-if="!isAuthRoute">
        <FooterSection />
      </template>
    </div>
  </template>
</template>

<script>
import NavbarComponent from "./components/Navbar/NavbarComponent.vue";
import FooterSection from "./components/Footer/FooterSection.vue";
import AdminPage from "./views/AdminPage.vue";
import AdminDemo from "./components/Admin/AdminDemo.vue";

export default {
  name: "App",
  components: {
    NavbarComponent,
    FooterSection,
    AdminPage,
  },
  computed: {
    isAuthRoute() {
      return this.$route.path.startsWith("/auth");
    },
    isAdminRoute() {
      return this.$route.path.startsWith("/admin");
    }
  },
};
</script>
