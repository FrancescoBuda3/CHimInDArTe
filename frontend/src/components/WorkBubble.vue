<script setup lang="ts">
import { computed } from "vue";
import type { Work } from "../types/work";

const baseUrl = computed(() => import.meta.env.BASE_URL);

defineProps<{
  work: Work;
  isFocused: boolean;
}>();
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      class="absolute left-1/2 z-20 pointer-events-none"
      style="top: 0; transform: translateX(-50%) translateY(-50%); margin-top: -12px;"
    >
      <div
        class="relative u-w-gameTile u-h-lg u-p-xs bg-gray-700/90 rounded-2xl shadow-lg"
      >
        <img
          :src="`${baseUrl}pictures/${work.picture_file}`"
          :alt="work.title"
          class="w-full h-full object-contain"
        />
        
        <div
          class="absolute left-1/2 -translate-x-1/2 w-0 h-0"
          style="
            bottom: -12px;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-top: 13px solid rgb(55 65 81 / 0.9);
          "
        ></div>
      </div>
    </div>
  </Transition>
</template>
