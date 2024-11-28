<template>
  <div class="contact-page">
    <!-- Header Section -->
    <div class="header-section relative flex flex-col justify-center items-center py-24 mb-8 text-center">
      <div class="absolute inset-0 bg-primaryLight/60 backdrop-blur-sm"></div>
      <div class="relative z-10 space-y-4" v-scroll-animate="'animate__fadeInUp'">
        <p class="text-3xl mmd:text-4xl font-bold ">Get in Touch</p>
        <p class="text-lg mmd:text-xl text-primaryText animate__slower" v-scroll-animate="'animate__fadeInUp'">We’d love to hear from you. Reach out to us for any inquiries or support.</p>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="main-content px-6 md:px-12 lg:px-24 py-12 flex flex-col gap-8 md:flex-row md:gap-16">

      <!-- Contact Form -->
      <div class="contact-form bg-white p-8 rounded-lg shadow-lg flex-1">
        <p class="text-2xl font-semibold mb-4">Send Us a Message</p>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="form-group">
            <label for="name" class="block text-sm font-medium text-primaryText">Name</label>
            <input type="text" id="name" v-model="form.name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>
          <div class="form-group">
            <label for="email" class="block text-sm font-medium text-primaryText">Email</label>
            <input type="email" id="email" v-model="form.email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>
          <div class="form-group">
            <label for="message" class="block text-sm font-medium text-primaryText">Message</label>
            <textarea id="message" v-model="form.message" rows="5" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
          </div>
          <button type="submit" class="w-full bg-primary text-white py-2 rounded-md hover:bg-primaryLight transition duration-300">Send Message</button>
        </form>
      </div>

      <!-- Contact Details -->
      <div class="contact-details bg-primaryLight p-8 rounded-lg shadow-lg flex-1">
        <p class="text-2xl font-semibold mb-4">Contact Information</p>
        <div class="contact-item flex items-center mb-4">
          <i class="fa-solid fa-phone text-primary text-xl mr-4"></i>
          <p class="text-lg text-primaryText">+1 (555) 123-4567</p>
        </div>
        <div class="contact-item flex items-center mb-4">
          <i class="fa-solid fa-envelope text-primary text-xl mr-4"></i>
          <p class="text-lg text-primaryText">support@example.com</p>
        </div>
        <div class="contact-item flex items-center mb-4">
          <i class="fa-solid fa-location-dot text-primary text-xl mr-4"></i>
          <p class="text-lg text-primaryText">123 Main Street, Anytown, USA</p>
        </div>
        <div class="flex items-center space-x-4">
          <a href="https://facebook.com" target="_blank" class="text-primary hover:text-primaryLight transition duration-300">
            <i class="fa-brands fa-facebook-f text-2xl"></i>
          </a>
          <a href="https://twitter.com" target="_blank" class="text-primary hover:text-primaryLight transition duration-300">
            <i class="fa-brands fa-twitter text-2xl"></i>
          </a>
          <a href="https://instagram.com" target="_blank" class="text-primary hover:text-primaryLight transition duration-300">
            <i class="fa-brands fa-instagram text-2xl"></i>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      // Handle form submission logic here
      console.log('Form submitted:', this.form);
      // Reset form fields if needed
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    }
  }
};
</script>

<style scoped>
.header-section {
  background-image: url("@/assets/sofa.jpg");
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.3); /* Fallback color */
}

.contact-form button {
  transition: background-color 0.3s ease;
}

.contact-details i {
  transition: color 0.3s ease;
}

.contact-details {
  background-color: #f9f1e7; /* Adjust to match the theme */
}
</style>
