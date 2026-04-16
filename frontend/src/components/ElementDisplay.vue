<script setup lang="ts">
import type { PeriodicElement } from "../types/periodicElement";
import { computed } from "vue";
import type { Work } from "../types/work";
import { useElementCategory } from "../composables/useElementCategory";

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
  <div
    :class="[
      'u-w-tile aspect-[1/1.21] flex flex-col justify-between relative box-border overflow-hidden',
      'u-rounded-xs u-p-xs',
      'cursor-pointer transition-transform duration-400',
      categoryClass,
      isFocused ? 'scale-150 z-10' : 'scale-100',
    ]"
  >
      <div
        v-if="work && !alternativeText"
        class="absolute inset-0 pb-[calc(var(--u)*0.25)] p-[calc(var(--u)*0.18)] flex items-center justify-center"
      >
        <img
          :src="`${baseUrl}pictures/${work.picture_file}`"
          :alt="work.title"
          class="w-full h-full object-contain"
        />
      </div>

      <div class="flex text-white text-right font-medium u-text-xs">
        <div v-if="work && !alternativeText">
          {{ element.symbol }}
        </div>
        <div class="w-full" />
        <div v-if="!alternativeText">
          {{ element.number }}
        </div>
      </div>

      <div class="flex-1 flex items-center justify-center">
        <div class="text-white font-medium leading-none u-text-md">
          <div v-if="!work && !alternativeText">
            {{ element.symbol }}
          </div>
          <div class="u-text-sm" v-else-if="alternativeText">
            {{ alternativeText }}
          </div>
        </div>
      </div>

      <div v-if="!alternativeText" class="text-white text-center font-medium font-light u-text-xs">
        {{ element.name }}
      </div>
  </div>
</template>
