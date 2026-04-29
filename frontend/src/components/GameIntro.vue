<script setup lang="ts">
import { useQuiz } from "../composables/useQuiz";
import AppCarousel from "./AppCarousel.vue";

const { handleInput } = useQuiz();
</script>

<template>
  <AppCarousel lastLabel="Inizia" :onFinish="handleInput" :isFinishButtonEnabled="true">
    <div class="flex flex-col items-center justify-center u-p-xs">
      <p class="text-xl text-white text-center px-2">
        Benvenuto, valoroso esploratore! Sei pronto a mettere alla prova la tua conoscenza e a scoprire i segreti nascosti dietro ogni elemento? Preparati a un viaggio alla conquista del castello degli elementi!
      </p>
    </div>
    <div class="flex flex-col items-center justify-center u-p-xs">
      <p class="text-xl text-white text-center px-2">
        Il tuo percorso comincia dalla porta di ingresso del castello, clicca sulle finestre in ordine lungo il percorso per superare le sfide e avanzare verso la conquista del castello!
      </p>
    </div>
    <div class="flex flex-col items-center justify-center u-p-xs">
      <p class="text-xl text-white text-center px-2">
        Superando le sfide otterrai i trofei degli elementi, raccogline il più possibile e conquista tutte le zone del castello per diventare il vero maestro degli elementi! 
      </p>
    </div>
  </AppCarousel>
</template>
