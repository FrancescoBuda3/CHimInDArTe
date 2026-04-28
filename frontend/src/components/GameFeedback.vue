<script setup lang="ts">
import AppCarousel from "./AppCarousel.vue";
import { useQuiz } from "../composables/useQuiz";
import { GameState } from "../composables/useQuiz";
import type { ClassicQuestion } from "../types/questions";
import { WorkMemoryQuestion } from "../types/questions";
import { computed } from "vue";

const { gameQuestions, gameCursor, gameState, handleInput } = useQuiz();

const currentQuestion = computed(() => {
  return gameQuestions.value[gameCursor.value];
});

const isClassicQuestion = computed(() => {
  return currentQuestion.value && "question" in currentQuestion.value;
});

const isWorkMemoryQuestion = computed(() => {
  return currentQuestion.value instanceof WorkMemoryQuestion;
});

const correctAnswer = computed(() => {
  if (!isClassicQuestion.value) return null;
  const question = currentQuestion.value as ClassicQuestion;
  return question.options[question.answer];
});

const isSuccess = computed(() => gameState.value === GameState.ShowingSuccess);
const isFailure = computed(() => gameState.value === GameState.ShowingFailure);
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <AppCarousel :loop="false" :show-dots="true">

      <div v-show="isSuccess || isFailure" class="flex flex-col items-center justify-center gap-6 p-6 min-h-96">
        <div v-if="isSuccess" class="text-center">
          <p class="text-4xl font-bold text-green-400 mb-4">✓ Risposta Corretta!</p>
        </div>
        <div v-else-if="isFailure" class="text-center">
          <p class="text-3xl font-bold text-red-400 mb-4">✗ Risposta Sbagliata</p>
          <div v-if="correctAnswer" class="mt-6 p-4 bg-gray-600 rounded-lg">
            <p class="text-gray-300 mb-2">La risposta corretta era:</p>
            <p class="text-xl font-semibold text-white">{{ correctAnswer }}</p>
          </div>
        </div>
        <button
          v-if="isWorkMemoryQuestion"
          @click="handleInput()"
          class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Avanti →
        </button>
      </div>


      <div v-if="isClassicQuestion" class="flex flex-col items-center justify-center gap-6 p-6 min-h-96">
        <div class="w-full">
          <div class="bg-gray-600 rounded-lg p-6 mb-6">
            <p class="text-lg text-white leading-relaxed">
              {{ (currentQuestion as ClassicQuestion).curiosity }}
            </p>
          </div>
          <button
            @click="handleInput()"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Avanti →
          </button>
        </div>
      </div>
    </AppCarousel>
  </div>
</template>
