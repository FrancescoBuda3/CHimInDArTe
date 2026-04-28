<script setup lang="ts">
import AppCarousel from "./AppCarousel.vue";
import { useQuiz } from "../composables/useQuiz";
import { useRouter } from "vue-router";

const { gameConqueredElements, resetGame, startGame } = useQuiz();
const router = useRouter();

const handlePlayAgain = () => {
  resetGame();
  startGame();
};

const handleGoHome = () => {
  resetGame();
  router.push("/");
};
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <AppCarousel :loop="false" :show-dots="false">
      <div class="flex flex-col items-center justify-center gap-6 p-6 min-h-96">
        <div class="text-center mb-6">
          <p class="text-5xl font-bold text-yellow-400 mb-4">
            🎉 Hai Vinto! 🎉
          </p>
          <p class="text-2xl font-semibold text-white mb-2">
            Elementi Conquistati
          </p>
        </div>

        <!-- Grid delle immagini dei work conquistati -->
        <div
          class="grid grid-cols-4 gap-4 mb-8 max-w-4xl w-full overflow-auto max-h-80"
        >
          <div
            v-for="element in gameConqueredElements"
            :key="element.number"
            class="flex flex-col items-center"
          >
            <div
              class="w-20 h-20 bg-gray-600 rounded-lg flex items-center justify-center mb-2"
            >
              <img
                :src="`/models/${element.symbol}.glb`"
                :alt="element.name"
                class="w-16 h-16 object-contain"
                @error="
                  (e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }
                "
              />
              <div
                v-if="gameConqueredElements.length === 0"
                class="text-white text-center"
              >
                <p class="text-sm">{{ element.symbol }}</p>
              </div>
            </div>
            <p class="text-sm text-white text-center">{{ element.symbol }}</p>
          </div>
        </div>

        <!-- Pulsanti -->
        <div class="flex gap-4 mt-8 w-full max-w-xl">
          <button
            @click="handlePlayAgain"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🎮 Gioca Ancora
          </button>
          <button
            @click="handleGoHome"
            class="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🏠 Torna alla Home
          </button>
        </div>
      </div>
    </AppCarousel>
  </div>
</template>
