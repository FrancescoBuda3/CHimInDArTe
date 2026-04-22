<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  columns: number;
  rows: number;
  gap?: number;
}>();

const gridStyle = computed(() => ({
  gap: props.gap !== undefined ? `calc(var(--u) * ${props.gap})` : undefined
}))
</script>

<template>
  <div
    :class="[`grid grid-cols-[repeat(${props.columns},max-content)] grid-rows-[repeat(${props.rows},max-content)]`,
      props.gap === undefined ? 'u-gap-xs' : ''
    ]"
    :style="gridStyle"
  >
    <slot></slot>
  </div>
</template>
