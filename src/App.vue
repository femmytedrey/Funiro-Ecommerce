<template>
  <div class="h-screen flex flex-col justify-between">
    <template v-if="!isAuthRoute">
      <NavbarComponent />
    </template>
    <router-view />
    <template v-if="!isAuthRoute">
      <FooterSection />
    </template>
  </div>
  <!-- <div class="px-5 md:px-20"> -->
  <!-- </div> -->
</template>

<script>
import NavbarComponent from "./components/Navbar/NavbarComponent.vue";
import FooterSection from "./components/Footer/FooterSection.vue";

export default {
  name: "App",
  components: {
    NavbarComponent,
    FooterSection,
  },
  computed: {
    isAuthRoute() {
      return this.$route.path.startsWith("/auth");
    },
  },
};
</script>

<style></style>
