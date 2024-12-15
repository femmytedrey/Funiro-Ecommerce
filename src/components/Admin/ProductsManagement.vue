<template>
  <div
    v-if="currentSection === 'products'"
    class="space-y-6 px-4 lg:px-6 pt-5 pb-10"
  >
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <!-- Product Card 1 -->
      <div
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/funiro-ecommerce.appspot.com/o/ProductImage%2Fsofa1.jpg?alt=media&token=f3ff98b8-5a2a-4d4b-a193-0b94161072d8"
          alt="Elegant Sofa"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900">Elegant Sofa</h3>
          <p class="text-sm text-gray-500">Living Room</p>
          <div class="mt-4 flex justify-between items-center">
            <p class="text-xl font-bold text-primary">$1299</p>
            <p class="text-sm text-gray-500 line-through">$1500</p>
          </div>
          <div class="mt-4 flex space-x-2">
            <button
              class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Edit
            </button>
            <button
              class="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Product Card 2 -->
      <div
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/funiro-ecommerce.appspot.com/o/ProductImage%2Fsofa2.jpg?alt=media&token=a4f33fe3-b09e-4d11-8c3d-711d4f873a79"
          alt="Modern Coffee Table"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Modern Coffee Table
          </h3>
          <p class="text-sm text-gray-500">Living Room</p>
          <div class="mt-4 flex justify-between items-center">
            <p class="text-xl font-bold text-primary">$499</p>
            <p class="text-sm text-gray-500 line-through">$650</p>
          </div>
          <div class="mt-4 flex space-x-2">
            <button
              class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Edit
            </button>
            <button
              class="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Product Card 3 -->
      <div
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/funiro-ecommerce.appspot.com/o/ProductImage%2Fsofa3.jpg?alt=media&token=78ce2070-a25a-4aa0-b5fb-e9beb77f9ade"
          alt="Comfy Armchair"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900">Comfy Armchair</h3>
          <p class="text-sm text-gray-500">Comfort</p>
          <div class="mt-4 flex justify-between items-center">
            <p class="text-xl font-bold text-primary">$899</p>
            <p class="text-sm text-gray-500 line-through">$1050</p>
          </div>
          <div class="mt-4 flex space-x-2">
            <button
              class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Edit
            </button>
            <button
              class="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Product Card 4 -->
      <div
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/funiro-ecommerce.appspot.com/o/ProductImage%2Fsofa4.jpg?alt=media&token=3580a4ea-7524-4b41-a574-320ce71cdbde"
          alt="Stylish Bookshelf"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900">Stylish Bookshelf</h3>
          <p class="text-sm text-gray-500">Storage</p>
          <div class="mt-4 flex justify-between items-center">
            <p class="text-xl font-bold text-primary">$199</p>
            <p class="text-sm text-gray-500 line-through">$250</p>
          </div>
          <div class="mt-4 flex space-x-2">
            <button
              class="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Edit
            </button>
            <button
              class="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsList",
  data() {
    return {
      currentSection: "products",
    };
  },
};
</script>
