<script setup lang="ts">
import { useDevice } from "../composables/useDevice";
import type { PeriodicElement } from "../types/periodicElement";
import { computed } from "vue";
import type { Work } from "../types/work";

const baseUrl = computed(() => import.meta.env.BASE_URL);

const props = defineProps<{
  element: PeriodicElement;
  work?: Work;
  isFocused?: boolean;
}>();

const elementStyle = computed(() => ({
  gridColumn: props.element.xpos,
  gridRow: props.element.ypos,
}));

const getCategoryClass = (): string => {
  const categoryMap: Record<string, string> = {
    "diatomic nonmetal": "bg-element-diatomic-nonmetal",
    "polyatomic nonmetal": "bg-element-polyatomic-nonmetal",
    "noble gas": "bg-element-noble-gas",
    "alkali metal": "bg-element-alkali-metal",
    "alkaline earth metal": "bg-element-alkaline-earth",
    "transition metal": "bg-element-transition-metal",
    lanthanide: "bg-element-lanthanide",
    actinide: "bg-element-actinide",
    semimetal: "bg-element-semimetal",
    halogen: "bg-element-halogen",
  };
  return categoryMap[props.element.category] || "bg-element-nonmetal";
};
</script>

<template>
  <div
    :style="elementStyle"
    :class="[
      'u-w-tile aspect-[1/1.21] flex flex-col justify-between relative box-border overflow-hidden',
      'u-rounded-xs u-p-xs font-montserrat',
      'cursor-pointer transition-transform duration-400',
      getCategoryClass(),
      isFocused ? 'scale-150 z-10' : 'scale-100',
    ]"
  >
    <div
      v-if="work"
      class="absolute inset-0 pb-[calc(var(--u)*0.25)] p-[calc(var(--u)*0.15)] flex items-center justify-center"
    >
      <img
        :src="`${baseUrl}pictures/${work.picture_file}`"
        :alt="work.title"
        class="w-full h-full object-contain"
      />
    </div>

    <div class="flex text-white text-right font-medium u-text-xs">
      <div v-if="work">
        {{ element.symbol }}
      </div>
      <div class="w-full" />
      <div>
        {{ element.number }}
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center">
      <div class="text-white font-medium leading-none u-text-md">
        <div v-if="!work">
          {{ element.symbol }}
        </div>
      </div>
    </div>

    <div class="text-white text-center font-medium font-light u-text-xs">
      {{ element.name }}
    </div>
    
  </div>
</template>
