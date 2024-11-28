<template>
  <div class="mb-4">
    <button
      :type="type"
      class="w-full bg-primary text-white py-3 rounded-lg hover:bg-[#9f761a] transition duration-200"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    btnText: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "submit",
    }
  },
};
</script>

<style></style>
