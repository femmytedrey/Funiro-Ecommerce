<template>
  <div class="mb-4">
    <label :for="id" class="block font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500 font-semibold">*</span>
    </label>

    <div v-if="type === 'text'">
      <input
        :id="id"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <p v-if="error" class="text-red-500 mt-1">{{ error }}</p>
    </div>

    <div v-else-if="type === 'textarea'">
      <textarea
        :id="id"
        :rows="rows || 3"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      ></textarea>
      <p v-if="error" class="text-red-500 mt-1">{{ error }}</p>
    </div>

    <div v-else-if="type === 'number'">
      <input
        :id="id"
        type="number"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <p v-if="error" class="text-red-500 mt-1">{{ error }}</p>
    </div>

    <div v-else-if="type === 'select'">
      <select
        :id="id"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <div v-else>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Array],
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: 3,
  },
  options: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
</style>
