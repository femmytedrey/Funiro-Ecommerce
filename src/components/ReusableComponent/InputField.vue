<template>
  <div class="flex justify-between pr-2">
    <label :for="id" class="block text-gray-700">{{ label }}</label>
    <button
      type="button"
      v-if="type === 'password'"
      class="text-gray-600"
      @click="togglePasswordVisibility"
    >
      <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
    </button>
  </div>
  <input
    :type="inputType"
    :id="id"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
  />
  <!-- <p>{{ modelValue }}</p> -->
</template>

<script>
export default {
  name: "InputField",
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
  computed: {
    inputType() {
      return this.type === "password" && this.showPassword ? "text" : this.type;
    },
  },
};
</script>
