<template>
  <div>
    <div class="flex justify-between pr-2">
      <label :for="id" class="block text-gray-700 text-base 2xl:text-2xl">{{ label }}</label>
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
      class="w-full px-4 py-3 border-[1.5px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mt-3 text-base 2xl:text-xl"
    />
    <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>
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
    errorMessage: {
      type: String,
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
