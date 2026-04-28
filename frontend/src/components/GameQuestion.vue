<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuiz } from "../composables/useQuiz";
import type { ClassicQuestion, WorkMemoryQuestion } from "../types/questions";

const { gameQuestions, gameCursor, handleInput } = useQuiz();
const baseUrl = computed(() => import.meta.env.BASE_URL);

const selectedAnswer = ref<string | number | null>(null);

const currentQuestion = computed(() => {
  return gameQuestions.value[gameCursor.value];
});

const isWorkMemoryQuestion = computed(() => {
  return (
    currentQuestion.value &&
    "options" in currentQuestion.value &&
    typeof Object.values(currentQuestion.value.options || {})[0] === "object" &&
    "picture_file" in Object.values(currentQuestion.value.options || {})[0]
  );
});

const isClassicQuestion = computed(() => {
  return currentQuestion.value && "question" in currentQuestion.value;
});

const shuffledOptions = computed((): [string, string][] => {
  if (!isClassicQuestion.value) return [];
  const question = currentQuestion.value as ClassicQuestion;
  const options: [string, string][] = Object.entries(question.options);
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
});

const shuffledWorkOptions = computed((): [string, any][] => {
  if (!isWorkMemoryQuestion.value) return [];
  const question = currentQuestion.value as WorkMemoryQuestion;
  const options: [string, any][] = Object.entries(question.options);
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
});

const isAnswerSelected = computed(() => selectedAnswer.value !== null);

const submitAnswer = () => {
  if (selectedAnswer.value !== null) {
    handleInput(Number(selectedAnswer.value));
    
    selectedAnswer.value = null;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div v-if="isClassicQuestion" class="w-full max-w-md">
      <p class="text-xl text-white text-center mb-6">
        {{ (currentQuestion as ClassicQuestion).question }}
      </p>

      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="[optionKey, optionText] in shuffledOptions"
          :key="optionKey"
          @click="selectedAnswer = optionKey"
          :class="[
            'p-3 rounded-lg font-semibold text-center transition-colors',
            selectedAnswer === optionKey
              ? 'bg-blue-600 text-white'
              : 'bg-gray-500 text-white hover:bg-gray-600',
          ]"
        >
          {{ optionText }}
        </button>
      </div>

      <button
        @click="submitAnswer"
        :disabled="!isAnswerSelected"
        :class="[
          'w-full mt-6 py-2 px-4 rounded-lg font-bold transition-colors',
          isAnswerSelected
            ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed',
        ]"
      >
        Invia
      </button>
    </div>

    <div v-else-if="isWorkMemoryQuestion" class="w-full max-w-2xl">
      <p class="text-xl text-white text-center mb-6">Quale opera è questa?</p>

      <div class="flex gap-4 px-4 justify-center">
        <button
          v-for="[optionKey, work] in shuffledWorkOptions"
          :key="optionKey"
          @click="selectedAnswer = optionKey"
          :class="[
            'relative rounded-lg overflow-hidden transition-all border-4 bg-gray-800 flex items-center justify-center p-2',
            selectedAnswer === optionKey
              ? 'border-blue-600'
              : 'border-gray-500 hover:border-gray-400',
          ]"
        >
          <img
            :src="`${baseUrl}pictures/${work.picture_file}`"
            :alt="work.title"
            class="w-32 h-32 object-contain"
          />
          <div
            class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <p class="text-white text-center font-semibold">{{ work.title }}</p>
          </div>
        </button>
      </div>

      <button
        @click="submitAnswer"
        :disabled="!isAnswerSelected"
        :class="[
          'w-full mt-6 py-2 px-4 rounded-lg font-bold transition-colors',
          isAnswerSelected
            ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed',
        ]"
      >
        Invia
      </button>
    </div>
  </div>
</template>
