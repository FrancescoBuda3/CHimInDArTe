<script setup lang="ts">
import AppCarousel from "./AppCarousel.vue";
import { useQuiz } from "../composables/useQuiz";
import { computed } from "vue";

const { gameZones, gameCursor, handleInput } = useQuiz();

const zoneNames: Record<number, string> = {
  1: "la Torre Alcalina-Terrosa",
  2: "la Corte dei metalli di transizione",
  3: "il Mastio dei gas nobili",
  4: "le Segrete del blocco f",
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
    <AppCarousel lastLabel="Avanti" :isFinishButtonEnabled=true :onFinish="handleInput">
      <div class="flex flex-col items-center justify-center gap-6 u-p-sm">
        <div class="text-center">
          <p class="text-3xl text-white font-semibold">hai superato</p>
          <p class="text-3xl font-semibold text-white mb-8">{{ completedZoneName }}</p>
          <p class="text-lg text-gray-300">Procedi alla prossima zona</p>
        </div>
      </div>
    </AppCarousel>
  </div>
</template>