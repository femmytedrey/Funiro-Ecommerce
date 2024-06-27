<template>
  <NavbarComponent />
  <!-- <div class="px-5 md:px-20"> -->
  <router-view />
  <!-- </div> -->
</template>

<script>
import NavbarComponent from "./components/Navbar/NavbarComponent.vue";
export default {
  name: "App",
  components: {
    NavbarComponent,
  },
};
</script>

<style></style>
