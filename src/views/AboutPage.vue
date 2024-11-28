<template>
  <!-- Header Section with Background Overlay and Text Animation -->
  <div class="header-section relative flex flex-col justify-center items-center text-center py-24 mb-6">
    <div class="absolute inset-0 bg-primaryLight/60 backdrop-blur-sm"></div>
    <div class="relative z-10 space-y-2" v-scroll-animate="'animate__fadeInUp'">
      <p class="text-3xl mmd:text-4xl font-bold ">About Us</p>
      <p class="text-lg mmd:text-xl text-primaryText animate__slower" v-scroll-animate="'animate__fadeInUp'">Discover our journey, values, and aspirations</p>
    </div>
  </div>

  <!-- Main Content Section with Enhanced Cards -->
  <div class="container mx-auto px-7 md:px-20 2xl:px-52 py-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Story Card -->
      <div class="group relative overflow-hidden rounded-2xl bg-white hover:bg-primaryLight/90 transition-all duration-500 shadow-lg hover:shadow-xl">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full transform -translate-x-16 translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div class="relative p-6 space-y-2">
          <div class="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-all duration-500 shadow-md">
            <i class="fas fa-book text-xl text-primary group-hover:scale-110"></i>
          </div>
          <h3 class="text-2xl font-bold text-primary group-hover:text-primaryDark">Our Story</h3>
          <p class="text-gray-600 leading-relaxed group-hover:text-gray-700">
            Born out of a passion for exceptional design, our journey began with a vision to redefine home furnishings.
          </p>
          <a href="#" class="inline-flex items-center text-primary group-hover:text-primaryDark font-medium">
            Learn More
            <i class="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </a>
        </div>
      </div>

      <!-- Values Card -->
      <div class="group relative overflow-hidden rounded-2xl bg-white hover:bg-primaryLight/90 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-2">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full transform -translate-x-16 translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div class="relative p-6 space-y-2">
          <div class="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-all duration-500 shadow-md">
            <i class="fas fa-heart text-xl text-primary group-hover:scale-110"></i>
          </div>
          <h3 class="text-2xl font-bold text-primary group-hover:text-primaryDark">Our Values</h3>
          <p class="text-gray-600 leading-relaxed group-hover:text-gray-700">
            Integrity, quality, and customer satisfaction are the pillars of our brand.
          </p>
          <a href="#" class="inline-flex items-center text-primary group-hover:text-primaryDark font-medium">
            Learn More
            <i class="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </a>
        </div>
      </div>

      <!-- Vision Card -->
      <div class="group relative overflow-hidden rounded-2xl bg-white hover:bg-primaryLight/90 transition-all duration-500 shadow-lg hover:shadow-xl">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full transform -translate-x-16 translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div class="relative p-6 space-y-2">
          <div class="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-all duration-500 shadow-md">
            <i class="fas fa-eye text-xl text-primary group-hover:scale-110"></i>
          </div>
          <h3 class="text-2xl font-bold text-primary group-hover:text-primaryDark">Our Vision</h3>
          <p class="text-gray-600 leading-relaxed group-hover:text-gray-700">
            Looking ahead, our goal is to expand globally, bringing our unique approach to design.
          </p>
          <a href="#" class="inline-flex items-center text-primary group-hover:text-primaryDark font-medium">
            Learn More
            <i class="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
};
</script>

<style scoped>
.header-section {
  background-image: url("@/assets/sofa.jpg");
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
