<script setup lang="ts">
const props = defineProps<{
  columns: number;
  rows: number;
}>();
</script>

<template>
  <div
    :class="`grid grid-cols-[repeat(${props.columns},max-content)] grid-rows-[repeat(${props.rows},max-content)] gap-2 overflow-auto`"
  >
    <slot></slot>
  </div>
</template>
