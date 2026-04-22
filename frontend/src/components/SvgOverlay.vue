<script setup lang="ts">
defineProps<{
  referenceWidth: number 
  referenceHeight: number
}>()
</script>

<template>
  <svg
    class="absolute inset-0 pointer-events-none"
    :viewBox="`0 0 ${referenceWidth} ${referenceHeight}`"
    width="100%"
    height="100%"
    preserveAspectRatio="none"
  >
    <slot />
  </svg>
</template>