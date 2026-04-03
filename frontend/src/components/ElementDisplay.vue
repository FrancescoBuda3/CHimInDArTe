<script setup lang="ts">
import { useDevice } from "../composables/useDevice";
import type { PeriodicElement } from "../types/periodicElement";
import { computed, ref } from "vue";

const { isTotem } = useDevice();

const props = defineProps<{
  element: PeriodicElement;
  isFocused?: boolean;
}>();

const elementStyle = computed(() => ({
  gridColumn: props.element.xpos,
  gridRow: props.element.ypos
}));
</script>

<template>
  <div 
    class="bg-black h-auto aspect-[1/1.19] transition-transform duration-400 cursor-pointer" 
    :class="[
      isTotem ? 'w-[calc(100vw/21-0.94rem)]' : 'w-[calc(100vw/4-0.94rem)]',
      isFocused ? 'scale-150 z-10' : 'scale-100'
    ]"
    :style="elementStyle"
  >
  </div>
</template>
