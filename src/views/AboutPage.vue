<template>
  <!-- Header Section with Background Overlay and Text Animation -->
  <div class="header-section relative flex flex-col justify-center items-center text-center py-24 mb-6">
    <div class="absolute inset-0 bg-primaryLight/60 backdrop-blur-sm"></div>
    <div class="relative z-10 space-y-2">
      <p class="text-3xl mmd:text-4xl font-bold tracking-wider animate-fade-in">About Us</p>
      <p class="text-lg mmd:text-xl text-primaryText animate-slide-up">Discover our journey, values, and aspirations</p>
    </div>
  </div>

  <!-- Main Content Section with Responsive Cards -->
  <div class="main-content px-6 midBreak:px-12 mlg:px-16 py-8 grid gap-8 md:grid-cols-2 mlg:grid-cols-3">
    
    <!-- Card: Our Story -->
    <div class="card group hover:bg-primaryLight transition-colors duration-300 p-4 md:p-6 rounded-lg shadow-lg space-y-3">
      <p class="text-2xl font-semibold text-primary group-hover:text-primaryDark transition-colors duration-300">Our Story</p>
      <p class="text-sm midBreak:text-base text-textGrey group-hover:text-textGreyLight leading-relaxed transition-colors duration-300">
        Born out of a passion for exceptional design, our journey began with a vision to redefine home furnishings. Through commitment and innovation, we have grown, always inspired by our customers' needs and aspirations.
      </p>
    </div>

    <!-- Card: Our Values -->
    <div class="card group hover:bg-primaryLight transition-colors duration-300 p-4 md:p-6 rounded-lg shadow-lg space-y-3">
      <p class="text-2xl font-semibold text-primary group-hover:text-primaryDark transition-colors duration-300">Our Values</p>
      <p class="text-sm midBreak:text-base text-textGrey group-hover:text-textGreyLight leading-relaxed transition-colors duration-300">
        Integrity, quality, and customer satisfaction are the pillars of our brand. We believe in offering only the best products, ensuring each item meets the highest standards of craftsmanship and design.
      </p>
    </div>

    <!-- Card: Our Vision -->
    <div class="card group hover:bg-primaryLight transition-colors duration-300 p-4 md:p-6 rounded-lg shadow-lg space-y-3">
      <p class="text-2xl font-semibold text-primary group-hover:text-primaryDark transition-colors duration-300">Our Vision</p>
      <p class="text-sm midBreak:text-base text-textGrey group-hover:text-textGreyLight leading-relaxed transition-colors duration-300">
        Looking ahead, our goal is to expand globally, bringing our unique approach to design and quality to homes around the world. We strive to be a leader in the home furnishing industry, setting trends and inspiring others.
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AboutPage',
};
</script>

<style scoped>
.header-section {
  background-image: url("@/assets/sofa.jpg");
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.3); /* Fallback color */
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 1.5s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 1.5s ease-in-out;
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>
