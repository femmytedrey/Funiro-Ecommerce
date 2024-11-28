<template>
  <div class="mb-4">
    <button
      :type="type"
      class="w-full bg-primary text-white py-3 rounded-lg hover:bg-[#9f761a] transition duration-200 animate__animated"
      :class="shouldShake ? 'animate__shakeX' : ''"
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
    },
    shouldShake: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
