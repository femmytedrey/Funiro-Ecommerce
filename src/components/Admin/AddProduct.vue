<template>
  <div class="container mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-6">Add New Product</h2>
    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Product Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            v-model="product.name"
            type="text"
            id="name"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter product name"
            required
          />
        </div>

        <!-- Price -->
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input
            v-model.number="product.price"
            type="number"
            id="price"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter price"
            required
          />
        </div>

        <!-- Original Price -->
        <div>
          <label for="originalPrice" class="block text-sm font-medium text-gray-700">Original Price</label>
          <input
            v-model.number="product.originalPrice"
            type="number"
            id="originalPrice"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter original price"
          />
        </div>

        <!-- Size -->
        <div>
          <label for="size" class="block text-sm font-medium text-gray-700">Size</label>
          <input
            v-model="product.size"
            type="text"
            id="size"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter size"
          />
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <select
            v-model="product.category"
            id="category"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <!-- Add more options as needed -->
          </select>
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
          <input
            v-model="product.tags"
            type="text"
            id="tags"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter tags (comma separated)"
            required
          />
        </div>

        <!-- Promo Percentage -->
        <div>
          <label for="promoPercentage" class="block text-sm font-medium text-gray-700">Promo Percentage</label>
          <input
            v-model.number="product.promoPercentage"
            type="number"
            id="promoPercentage"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter promo percentage"
          />
        </div>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="product.description"
          id="description"
          rows="4"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter product description"
          required
        ></textarea>
      </div>

      <!-- Additional Description -->
      <div class="mb-6">
        <label for="additionalDescription" class="block text-sm font-medium text-gray-700">Additional Description</label>
        <textarea
          v-model="product.additionalDescription"
          id="additionalDescription"
          rows="2"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter additional description"
        ></textarea>
      </div>

      <!-- Images -->
      <div class="mb-6">
        <label for="images" class="block text-sm font-medium text-gray-700">Product Images (URLs)</label>
        <textarea
          v-model="product.images"
          id="images"
          rows="3"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter up to 4 image URLs separated by commas"
          required
        ></textarea>
        <div class="mt-4 flex gap-2 flex-wrap">
          <img
            v-for="(image, index) in formattedImages"
            :key="index"
            :src="image"
            alt="Product Image"
            class="w-24 h-24 object-cover rounded-md border border-gray-300"
          />
        </div>
        <p v-if="imageError" class="text-red-500 mt-2">Please enter up to 4 image URLs.</p>
      </div>

      <!-- Additional Images -->
      <div class="mb-6">
        <label for="additionalImages" class="block text-sm font-medium text-gray-700">Additional Images (URLs)</label>
        <textarea
          v-model="product.additionalImages"
          id="additionalImages"
          rows="3"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter at least 2 and up to 4 additional image URLs separated by commas"
        ></textarea>
        <div class="mt-4 flex gap-2 flex-wrap">
          <img
            v-for="(image, index) in formattedAdditionalImages"
            :key="index"
            :src="image"
            alt="Additional Product Image"
            class="w-24 h-24 object-cover rounded-md border border-gray-300"
          />
        </div>
        <p v-if="additionalImageError" class="text-red-500 mt-2">Please enter between 2 and 4 additional image URLs.</p>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>

    <p>{{formattedProduct}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        additionalDescription: '',
        price: null,
        originalPrice: null,
        images: '',
        additionalImages: '',
        size: '',
        tags: '',
        category: '',
        promoPercentage: null,
      },
      imageError: false,
      additionalImageError: false,
    };
  },
  computed: {
    formattedImages() {
      return this.product.images.split(',').map(url => url.trim()).filter(url => url);
    },
    formattedAdditionalImages() {
      return this.product.additionalImages.split(',').map(url => url.trim()).filter(url => url);
    }
  },
  methods: {
    handleSubmit() {
      this.imageError = this.formattedImages.length > 4;
      this.additionalImageError = this.formattedAdditionalImages.length < 2 || this.formattedAdditionalImages.length > 4;

      if (this.imageError || this.additionalImageError) return;

      const formattedProduct = {
        ...this.product,
        images: this.formattedImages,
        additionalImages: this.formattedAdditionalImages,
        tags: this.product.tags.split(',').map(tag => tag.trim()),
      };
      console.log('Form submitted with data:', formattedProduct);
      // TODO: Implement the actual submit logic (e.g., API call)
    }
  }
};
</script>

<style scoped>
/* Add any additional styles for the component here */
</style>
