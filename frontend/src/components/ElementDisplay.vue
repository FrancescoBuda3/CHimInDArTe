<script setup lang="ts">
import { useDevice } from "../composables/useDevice";
import type { PeriodicElement } from "../types/periodicElement";
import { computed } from "vue";

const { isKiosk } = useDevice();

const props = defineProps<{
  element: PeriodicElement;
  isFocused?: boolean;
}>();

const elementStyle = computed(() => ({
  gridColumn: props.element.xpos,
  gridRow: props.element.ypos
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
    :style="{
      '--element-vw': isKiosk ? `${100/25}vw` : `${100/4}vw`,
      ...elementStyle
    }"
    :class="[
      'w-[calc(var(--element-vw)-0.6rem)]',
      'aspect-[1/1.21] transition-transform duration-400 cursor-pointer rounded-xl p-[clamp(0.3rem,calc(var(--element-vw)*0.15),0.6rem)] flex flex-col justify-between relative font-montserrat box-border overflow-hidden',
      getCategoryClass(),
      isFocused ? 'scale-150 z-10' : 'scale-100'
    ]"
  >
    <div class="text-white text-right font-medium text-[clamp(0.4rem,calc(var(--element-vw)*0.10),0.875rem)]">
      {{ element.number }}
    </div>
    
    <div class="flex-1 flex items-center justify-center">
      <div class="text-white font-medium leading-none text-[clamp(1.2rem,calc(var(--element-vw)*0.40),3rem)]">
        {{ element.symbol }}
      </div>
    </div>
    
    <div class="text-white text-center font-medium font-light text-[clamp(0.4rem,calc(var(--element-vw)*0.10),0.875rem)]">
      {{ element.name }}
    </div>
  </div>
</template>

