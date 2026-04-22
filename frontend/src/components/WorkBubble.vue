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
      v-if="isFocused"
      key="header"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
    >
      <div
        class="relative bg-gray-700/90 rounded-2xl shadow-2xl overflow-visible"
        style="width: 220px; height: 160px; padding: 16px;"
      >
        <!-- Immagine -->
        <img
          :src="`${baseUrl}pictures/${work.picture_file}`"
          :alt="work.title"
          class="w-full h-full object-contain"
        />
        
        <!-- Punta del fumetto (triangolo in basso) -->
        <div
          class="absolute left-1/2 -translate-x-1/2 w-0 h-0"
          style="
            bottom: -20px;
            border-left: 16px solid transparent;
            border-right: 16px solid transparent;
            border-top: 20px solid rgb(55 65 81 / 0.9);
          "
        ></div>
      </div>
    </div>
  </Transition>
</template>
