<script setup lang="ts">
defineProps<{
  label: string;
  icon?: string;
  disabled?: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'font-medium px-5 py-2 rounded-full u-text-sm shadow transition',
      disabled
        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
        : 'bg-white text-gray-800 hover:bg-gray-100 cursor-pointer',
    ]"
    @click="$emit('click')"
  >
    {{ label }}
    <img v-if="icon" :src="icon" alt="icon" class="inline w-4 h-4 ml-2" />
  </button>
</template>
