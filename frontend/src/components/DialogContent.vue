<script setup lang="ts">
import AppCarousel from "./AppCarousel.vue";
import { useDevice } from "../composables/useDevice";
import { useQuiz } from "../composables/useQuiz";
import GameIntro from "./GameIntro.vue";
import GameQuestion from "./GameQuestion.vue";
import GameZoneSummary from "./GameZoneSummary.vue";
import GameOver from "./GameOver.vue";
import GameFeedback from "./GameFeedback.vue";

const { isKiosk } = useDevice();
const { gameState } = useQuiz();
</script>

<template>
  <div v-if="gameState === 'starting'">
    <GameIntro />
  </div>
  <div v-if="gameState === 'showingQuestion'">
    <GameQuestion />
  </div>
  <div v-if="gameState === 'showingSuccess' || gameState === 'showingFailure'">
    <GameFeedback />
  </div>
  <div v-if="gameState === 'showingZoneSummary'">
    <GameZoneSummary />
  </div>
  <div v-if="gameState === 'gameOver'">
    <GameOver />
  </div>
</template>
