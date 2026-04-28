<script setup lang="ts">
import AppCarousel from "./AppCarousel.vue";
import { useQuiz } from "../composables/useQuiz";
import { computed } from "vue";

const { gameZones, gameCursor, handleInput } = useQuiz();

const zoneNames: Record<number, string> = {
  1: "Torre Alcalina e Terrosa",
  2: "Corte dei metalli di transizione",
  3: "Mastio dei gas nobili",
  4: "Segrete del blocco f",
};

const completedZone = computed(() => {
  return gameZones.value[gameCursor.value - 1];
});

const completedZoneName = computed(() => {
  return zoneNames[completedZone.value ? completedZone.value : 0] || `Zona ${completedZone.value}`;
});
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <AppCarousel :loop="false" :show-dots="false">
      <div class="flex flex-col items-center justify-center gap-6 p-6 min-h-96">
        <div class="text-center">
          <p class="text-5xl font-bold text-yellow-400 mb-6">✓ Zona Completata!</p>
          <p class="text-3xl font-semibold text-white mb-8">{{ completedZoneName }}</p>
          <p class="text-lg text-gray-300">Bravissimo! Procedi alla prossima zona</p>
        </div>
        <button
          @click="handleInput()"
          class="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
        >
          Avanti →
        </button>
      </div>
    </AppCarousel>
  </div>
</template>