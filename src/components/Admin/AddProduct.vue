<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-[60] p-4"
    @click.self="handleClose"
  >
    <div
      class="bg-white w-full max-w-4xl p-6 shadow-lg transform transition-transform rounded-2xl max-h-[90vh] flex flex-col"
    >
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        {{ isEditing ? "Edit Product" : "Add Product" }}
      </h2>

      <!-- Page 1: Image Upload -->
      <div v-if="page === 1" class="space-y-6">
        <!-- Product Images -->
        <div>
          <label
            for="productImages"
            class="block text-sm font-medium text-gray-700"
          >
            Product Images (Max 4)
          </label>
          <div class="flex space-x-2 mt-2">
            <input
              id="productImages"
              type="file"
              accept="image/*"
              @change="handleImageUpload($event, 'images')"
              :disabled="images.length >= 4 || isUploading"
              class="p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <span class="text-sm text-gray-500"
              >{{ 4 - images.length }} remaining</span
            >
          </div>
          <div class="flex space-x-4 mt-4">
            <div
              v-for="(img, index) in images"
              :key="index"
              class="relative w-20 h-20 border rounded-lg overflow-hidden"
            >
              <img
                :src="img"
                alt="Uploaded"
                class="w-full h-full object-cover"
              />
              <button
                @click="removeImage(index, 'images')"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Additional Images -->
        <div>
          <label
            for="additionalImages"
            class="block text-sm font-medium text-gray-700"
          >
            Additional Images (Max 2)
          </label>
          <div class="flex space-x-2 mt-2">
            <input
              id="additionalImages"
              type="file"
              accept="image/*"
              @change="handleImageUpload($event, 'additionalImages')"
              :disabled="additionalImages.length >= 2 || isUploading"
              class="p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <span class="text-sm text-gray-500"
              >{{ 2 - additionalImages.length }} remaining</span
            >
          </div>
          <div class="flex space-x-4 mt-4">
            <div
              v-for="(img, index) in additionalImages"
              :key="index"
              class="relative w-20 h-20 border rounded-lg overflow-hidden"
            >
              <img
                :src="img"
                alt="Uploaded"
                class="w-full h-full object-cover"
              />
              <button
                @click="removeImage(index, 'additionalImages')"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isUploading" class="text-sm text-gray-500">
          Uploading image... Please wait
        </div>
      </div>

      <form class="overflow-x-auto px-3 pb-6" v-if="page === 2">
        <div class="space-y-4">
          <AdminInputField
            id="name"
            type="text"
            label="Product Name"
            placeholder="Enter product name"
            v-model="formData.name"
            :error="errors.name"
            :required="true"
          />

          <AdminInputField
            id="description"
            type="textarea"
            label="Description"
            placeholder="Enter product description"
            v-model="formData.description"
            :error="errors.description"
            :required="true"
          />

          <AdminInputField
            id="price"
            type="number"
            label="Price"
            placeholder="Enter product price"
            v-model="formData.price"
            :error="errors.price"
            :required="true"
          />

          <AdminInputField
            id="originalPrice"
            type="number"
            label="Original Price"
            placeholder="Enter original price"
            v-model="formData.originalPrice"
            :error="errors.originalPrice"
            :required="true"
          />

          <AdminInputField
            id="additionalDescription"
            type="textarea"
            label="Additional Description"
            placeholder="Enter additional description"
            v-model="formData.additionalDescription"
          />

          <!-- Images -->
          <!-- <div>
            <label for="images" class="block text-sm font-medium text-gray-700"
              >Product Images (Main)</label
            >
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              @change="handleImageUpload"
            />
          </div> -->

          <!-- Additional Images -->
          <!-- <div>
            <label
              for="additionalImages"
              class="block text-sm font-medium text-gray-700"
              >Additional Images</label
            >
            <input
              id="additionalImages"
              type="file"
              accept="image/*"
              multiple
              class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              @change="handleAdditionalImageUpload"
            />
          </div> -->

          <AdminInputField
            id="size"
            type="text"
            label="Size"
            placeholder="Enter product size"
            v-model="formData.size"
          />

          <AdminInputField
            id="tags"
            type="text"
            label="Tags"
            placeholder="Enter tags separated by commas"
            v-model="formData.tags"
            :error="errors.tags"
            :required="true"
          />

          <AdminInputField
            id="category"
            type="select"
            label="Category"
            :options="categoryOptions"
            v-model="formData.category"
          />

          <AdminInputField
            id="promoPercentage"
            type="number"
            label="Promo Percentage"
            placeholder="Enter promo percentage"
            v-model="formData.promoPercentage"
          />
        </div>
      </form>

      <!-- Actions -->
      <div class="mt-6 flex justify-between items-center">
        <button
          type="button"
          class="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-100 focus:outline-none"
          :class="{ 'opacity-50 cursor-not-allowed': page === 1 }"
          @click="prevPage"
          :disable="page === 1"
        >
          Prev
        </button>
        <button
          type="submit"
          class="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 focus:outline-none"
          @click="handleSubmit"
        >
          {{ btnTxt }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../FirebaseSetup/Firebase";
import AdminInputField from "./utils/AdminInputField.vue";
import { toRaw } from "vue";
import { validateForm } from "./utils/productsValidation";
import { useProductsStore } from "../Store/productStore";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  productData: {
    type: Object,
    default: () => ({}),
  },
  product: {
    type: Object || null,
    default: () => ({}),
  },
});

const emit = defineEmits(["close", "submit"]);

const productStore = useProductsStore();
const page = ref(1);
const btnTxt = ref("Next");
const isUploading = ref(false);
const isSubmitting = ref(false);
const images = ref(JSON.parse(localStorage.getItem("images")) || []);
const additionalImages = ref(
  JSON.parse(localStorage.getItem("additionalImages")) || []
);

const categoryOptions = [
  { label: "Furniture", value: "Furniture" },
  { label: "Electronics", value: "Electronics" },
  { label: "Clothing", value: "Clothing" },
];

const formData = reactive({
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  additionalDescription: "",
  size: "",
  tags: "",
  category: "",
  promoPercentage: "",
});

const errors = reactive({
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  tags: "",
  category: "",
});

const handleImageUpload = async (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size (5MB limit)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    alert("File size should not exceed 5MB");
    return;
  }

  // Validate number of images
  if (type === "images" && images.value.length >= 4) {
    alert("Maximum 4 main images allowed");
    return;
  }
  if (type === "additionalImages" && additionalImages.value.length >= 2) {
    alert("Maximum 2 additional images allowed");
    return;
  }

  try {
    isUploading.value = true;

    // Create safe filename
    const timestamp = new Date().getTime();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const fileName = `${type}_${timestamp}_${safeFileName}`;

    const fileRef = storageRef(storage, `ProductImage/${fileName}`);
    //const fileRef = storageRef(storage, `demo/${fileName}`);

    // Upload with metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        uploadType: type,
      },
    };

    // console.log("Starting upload:", fileName);
    const snapshot = await uploadBytes(fileRef, file, metadata);
    // console.log("Upload successful:", snapshot.metadata.fullPath);

    const downloadURL = await getDownloadURL(snapshot.ref);

    // Add to appropriate array
    if (type === "images") {
      images.value.push(downloadURL);
      localStorage.setItem("images", JSON.stringify(images.value));
    } else {
      additionalImages.value.push(downloadURL);
      localStorage.setItem(
        "additionalImages",
        JSON.stringify(additionalImages.value)
      );
    }
  } catch (error) {
    console.error("Upload error details:", {
      code: error.code,
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    alert(`Upload failed: ${error.message}`);
  } finally {
    isUploading.value = false;
  }
};

const removeImage = (index, type) => {
  if (type === "images") {
    images.value.splice(index, 1);
  } else {
    additionalImages.value.splice(index, 1);
  }
};

if (props.isEditing === true) {
  console.log(props.product, "from child component");
}

const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = "";
  });

  images.value = [];
  additionalImages.value = [];

  // Reset page and button text
  page.value = 1;
  btnTxt.value = "Next";
};

const handleSubmit = async () => {
  if (page.value === 1) {
    if (images.value.length === 0) {
      alert("Please upload at least one product image");
      return;
    } else if (images.value.length < 4) {
      alert("Please upload at least 4 product images");
      return;
    }
    page.value = 2;
    btnTxt.value = props.isEditing ? "Update" : "Submit";
  } else {
    console.log(formData, errors);
    if (!validateForm(formData, errors)) return;

    try {
      isSubmitting.value = true;
      const submitData = {
        ...formData,
        _id: props.product._id,
        images: toRaw(images.value),
        additionalImages: toRaw(additionalImages.value),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      localStorage.removeItem("images");
      localStorage.removeItem("additionalImages");

      if (props.isEditing) {
        await productStore.updateProduct(submitData);
        await productStore.fetchProducts();
      } else {
        await productStore.addProduct(submitData);
      }
      //emit("submit", submitData);
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      isSubmitting.value = false;
      Object.keys(formData).forEach((key) => {
        formData[key] = "";
      });
    }
  }
};

const handleClose = () => {
  resetForm();
  emit("close");
};

watch(
  () => props.product,
  (newProduct) => {
    if (props.isEditing && newProduct) {
      formData.name = newProduct.name;
      formData.description = newProduct.description;
      formData.price = newProduct.price;
      formData.originalPrice = newProduct.originalPrice;
      formData.additionalDescription = newProduct.additionalDescription;
      formData.size = newProduct.size;
      formData.tags = Array.isArray(newProduct.tags)
        ? newProduct.tags.join(", ")
        : newProduct.tags;
      formData.category = newProduct.category;
      formData.promoPercentage = newProduct.promoPercentage;

      images.value = newProduct.images || [];
      additionalImages.value = newProduct.additionalImages || [];
    }
  },
  { immediate: true }
);

const prevPage = () => {
  if (page.value === 1) {
    emit("close");
  } else {
    page.value--;
    btnTxt.value = "Next";
  }
};

// Initialize form if editing
if (props.productData.id) {
  Object.assign(formData, props.productData);
  images.value = props.productData.images || [];
  additionalImages.value = props.productData.additionalImages || [];
}
</script>
<style scoped></style>
