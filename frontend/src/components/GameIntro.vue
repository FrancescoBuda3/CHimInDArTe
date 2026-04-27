<script setup lang="ts">
import { ref } from "vue";
import AppCarousel from "./AppCarousel.vue";
import { useDevice } from "../composables/useDevice";
import { useQuiz } from "../composables/useQuiz";

const { isKiosk } = useDevice();
const { handleInput } = useQuiz();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <p class="text-xl text-white text-center px-4">
      Benvenuto nel Castello degli Elementi! Scopri gli elementi chimici rispondendo alle domande.
    </p>
    <button
      @click="() => handleInput()"
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
    >
      Inizia
    </button>
  </div>
</template>
