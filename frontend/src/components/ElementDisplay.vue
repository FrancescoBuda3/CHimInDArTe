<script setup lang="ts">
import { useDevice } from "../composables/useDevice";
import type { PeriodicElement } from "../types/periodicElement";
import { computed } from "vue";
import type { Work } from "../types/work";

const { elementWidthVW } = useDevice();

const props = defineProps<{
  element: PeriodicElement;
  work?: Work;
  isFocused?: boolean;
}>();

const baseUrl = computed(() => import.meta.env.BASE_URL);

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
    :style="{
      '--element-vw': elementWidthVW,
      ...elementStyle,
    }"
    :class="[
      'w-[calc(var(--element-vw))]',
      'aspect-[1/1.21] transition-transform duration-400 cursor-pointer rounded-xl p-[calc(var(--element-vw)*0.10)] flex flex-col justify-between relative font-montserrat box-border overflow-hidden',
      getCategoryClass(),
      isFocused ? 'scale-150 z-10' : 'scale-100',
    ]"
  >
    <div
      v-if="work"
      class="absolute inset-0 pb-[calc(var(--element-vw)*0.25)] p-[calc(var(--element-vw)*0.15)] flex items-center justify-center"
    >
      <img
        :src="`${baseUrl}pictures/${work.picture_file}`"
        :alt="work.title"
        class="w-full h-full object-contain"
      />
    </div>
    <div
      class="flex text-white text-right font-medium text-[clamp(0.4rem,calc(var(--element-vw)*0.10),3rem)]"
    >
      <div v-if="work">
        {{ element.symbol }}
      </div>
      <div class="w-full" />
      <div>
        {{ element.number }}
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center">
      <div
        class="text-white font-medium leading-none text-[clamp(1.2rem,calc(var(--element-vw)*0.40),5rem)]"
      >
        <div v-if="!work">
          {{ element.symbol }}
        </div>
      </div>
    </div>

    <div
      class="text-white text-center font-medium font-light text-[clamp(0.4rem,calc(var(--element-vw)*0.10),3rem)]"
    >
      {{ element.name }}
    </div>
  </div>
</template>
