<template>
  <div class="h-screen flex flex-col justify-between">
    <NavbarComponent />

    <router-view />
    <FooterSection />
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
};
</script>

<style></style>
