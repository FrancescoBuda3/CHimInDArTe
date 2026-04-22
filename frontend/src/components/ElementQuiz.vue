<script setup lang="ts">
import type { PeriodicElement } from "../types/periodicElement";
import { computed } from "vue";
import type { Work } from "../types/work";
import { useElementCategory } from "../composables/useElementCategory";
import WorkBubble from "./WorkBubble.vue";

const baseUrl = computed(() => import.meta.env.BASE_URL);
const { getColorBackground } = useElementCategory();

const props = defineProps<{
  element: PeriodicElement;
  work?: Work;
  alternativeText?: string;
  isFocused?: boolean;
}>();

const categoryClass = computed(() => getColorBackground(props.element));
</script>

<template>
  <WorkBubble
    v-if="work && !alternativeText && isFocused"
    :work="work"
    :is-focused="isFocused"
  />
  <div
    :class="[
      'u-w-gameTile aspect-square flex flex-col justify-between relative box-border overflow-hidden',
      'u-p-xs',
      'cursor-pointer transition-transform duration-400',
      categoryClass,
      isFocused ? 'scale-150 z-10' : 'scale-100',
    ]"
  ></div>
</template>
