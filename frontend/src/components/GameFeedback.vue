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
    <AppCarousel lastLabel="Avanti" :isFinishButtonEnabled=true :onFinish="handleInput">
      <template v-if="isClassicQuestion">
        <div v-if="isSuccess || isFailure" class="flex flex-col items-center justify-center">
          <div v-if="isSuccess" class="text-center u-p-md">
            <p class="u-text-md text-white">Risposta Corretta!</p>
          </div>
          <div v-else-if="isFailure" class="text-center u-p-md">
            <p class="u-text-md text-white">Risposta Sbagliata</p>
            <div v-if="correctAnswer" class="mt-6 bg-gray-600">
              <p class="text-gray-300 mb-2">La risposta corretta era:</p>
              <p class="u-text-sm font-semibold text-white">{{ correctAnswer }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center">
          <div class="w-full">
            <div class="bg-gray-600  u-p-sm">
              <p class="text-lg text-white leading-relaxed">
                {{ (currentQuestion as ClassicQuestion).curiosity }}
              </p>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="isWorkMemoryQuestion">
        <div v-if="isSuccess || isFailure" class="flex flex-col items-center justify-center">
          <div v-if="isSuccess" class="text-center u-p-md">
            <p class="u-text-md text-white">Risposta Corretta!</p>
          </div>
          <div v-else-if="isFailure" class="text-center u-p-md">
            <p class="u-text-md text-white">Risposta Sbagliata</p>
          </div>
        </div>
      </template>
    </AppCarousel>
</template>
