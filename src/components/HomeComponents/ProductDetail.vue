<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.imgUrl" :alt="product.name" />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { ProductImageData } from "../../assets/ProductImageData";
import { useRoute } from "vue-router";

export default {
  setup() {
    const product = ref(null);
    const route = useRoute();

    const fetchProduct = () => {
      const id = parseInt(route.params.id);
      product.value = ProductImageData.find((item) => (item.id === id));
    };

    onMounted(() => {
      fetchProduct();
    });

    return {
      product,
    };
  },
};
</script>
