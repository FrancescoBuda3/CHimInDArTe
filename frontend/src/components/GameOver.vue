<script setup lang="ts">
import AppCarousel from "./AppCarousel.vue";
import { useQuiz } from "../composables/useQuiz";
import { useRouter } from "vue-router";
import { computed } from "vue";

const { gameConqueredElements, works, resetGame } = useQuiz();
const baseUrl = computed(() => import.meta.env.BASE_URL);
const router = useRouter();

const conqueredWorks = computed(() => {
  return gameConqueredElements.value.map(element => ({
    element,
    work: works.value.find(work => work.id === element.number)
  })).filter(item => item.work);
});

const handleGoHome = () => {
  resetGame();
  router.push("/home");
};
</script>

<template>
  <AppCarousel lastLabel="Torna alla Home" :isFinishButtonEnabled=true :onFinish="handleGoHome">
    <div class="flex flex-col items-center justify-center gap-6 u-p-sm">
      <div class="text-center">
        <p class="text-4xl text-white mb-4">Complimenti, hai concluso il percorso</p>
        <p class="text-2xl font-semibold text-white mb-2">
          Trofei Conquistati: {{ gameConqueredElements.length }}
        </p>
      </div>

      <div class="flex gap-2 justify-center flex-wrap w-full px-4">
        <div
          v-for="item in conqueredWorks"
          :key="item.work?.id"
          class="relative rounded-lg overflow-hidden bg-gray-700 flex flex-col items-center justify-center p-1 md:p-2"
        >
          <img
            :src="`${baseUrl}pictures/${item.work?.picture_file}`"
            :alt="item.work?.title"
            class="u-w-md u-h-md md:w-24 md:h-24 object-contain mb-1 md:mb-2"
          />
          <p class="text-xs text-white text-center">{{ item.element.nameIT }}</p>
        </div>
      </div>
    </div>
  </AppCarousel>
</template>
