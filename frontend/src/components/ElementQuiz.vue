<script setup lang="ts">
import type { PeriodicElement } from "../types/periodicElement";
import windowSvg from "../assets/window.svg?url";
import { computed } from "vue";
import type { Work } from "../types/work";
import WorkBubble from "./WorkBubble.vue";

const props = defineProps<{
  element: PeriodicElement;
  work?: Work;
  isFocused?: boolean;
  isInGame?: boolean;
}>();

defineEmits<{
  click: [];
}>();

const zoneColors: Record<number, string> = {
  1: "#FFD201",
  2: "#76C3B1",
  3: "#3382D1",
  4: "#23B5B5",
};

const backgroundColor = computed(() => 
  props.element.gameZone ? zoneColors[props.element.gameZone] : ""
);
</script>

<template>
  <div class="relative overflow-visible">
    <WorkBubble
      v-if="isInGame && work"
      :work="work"
      :is-focused="isFocused"
    />
    <div
      :class="[
        'u-w-gameTile aspect-square flex flex-col justify-between relative box-border overflow-hidden',
        'u-p-xs',
        'cursor-pointer transition-transform duration-400',
      ]"
      :style="{ backgroundColor }"
      @click="$emit('click')"
    >
      <div class="text-center u-p-xs">
        <img v-if="isInGame" :src="windowSvg" alt="window" class="w-full h-full object-contain" />
      </div>
    </div>
  </div>
</template>
