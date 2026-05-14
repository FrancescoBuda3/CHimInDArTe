<script setup lang="ts">
import { useData } from "../composables/useData";
import GridLayout from "../layouts/GridLayout.vue";
import { useDevice } from "../composables/useDevice";
import { useQuiz } from "../composables/useQuiz";
import AppHeader from "../components/AppHeader.vue";
import QuizModal from "../components/QuizModal.vue";
import { useElementFocus } from "../composables/useElementFocus";
import { useZoom } from "../composables/useZoom";
import { onMounted, ref, nextTick } from "vue";
import ElementQuiz from "../components/ElementQuiz.vue";
import SvgOverlay from "../components/SvgOverlay.vue";
import castleSvg from "../assets/castle.svg?url";
import pathSvg from "../assets/path.svg?url";
import DialogContent from "../components/DialogContent.vue";

const { elements: periodicElements} = useData();
const works = useData().works;
const { isKiosk, isMobile } = useDevice();
const modalRef = ref<HTMLElement | null>(null);

const {
  zoomLevel,
  handlePinch,
  handleTouchEnd,
} = useZoom();

const {
  focusedElement,
  isScrolling,
  handleElementClick,
  registerElement,
  scrollIntoElementNumber,
} = useElementFocus(periodicElements, modalRef);

const {
  gameCursor,
  gameElements,
  gameState,
} = useQuiz();

onMounted(async () => {
  await nextTick();
  await new Promise(resolve => setTimeout(resolve, 300));
  scrollIntoElementNumber(88);
});
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="
        gameState === 'starting' ||
        gameState === 'showingSuccess' ||
        gameState === 'showingFailure' ||
        gameState === 'showingZoneSummary' ||
        gameState === 'gameOver' ||
        (gameState === 'showingQuestion' &&
          focusedElement?.number === gameElements[gameCursor]?.number &&
          !isKiosk)
      "
      ref="modalRef"
      :class="
        isKiosk
          ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'
          : 'fixed bottom-0 left-1/2 -translate-x-1/2 z-50 p-3 w-full'
      "
    >
      <QuizModal>
        <DialogContent />
      </QuizModal>
    </div>
  </Transition>

  <Transition name="fade" mode="out-in">
    <div
      v-if="!isScrolling"
      key="header"
      class="fixed top-0 left-1/2 -translate-x-1/2 z-20"
    >
      <AppHeader :showBackground="true" :title="'Il Castello degli elementi'" />
    </div>
  </Transition>

  <div
    class="w-screen h-screen overflow-auto hide-scrollbar items-center justify-center"
    :class="isMobile ? '' : 'flex pt-[calc(var(--u)*1.4)]'"
    @touchmove="isMobile ? handlePinch : null"
    @touchend="isMobile ? handleTouchEnd : null"
  >
    <div
      :class="isMobile ? `py-[calc(50vh-1.5rem)] px-[calc(50vw-1.5rem)]` : ``"
    >
      <div class="relative w-fit" :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }">
        <div class="u-p-2x">
          <GridLayout :columns="18" :rows="7" :gap="0.2">
            <div
              v-for="element in periodicElements"
              :key="element.number"
              :style="{ gridColumn: element.xpos, gridRow: element.ypos }"
              :ref="
                (el) =>
                  registerElement(element.number, el as HTMLElement | null)
              "
            >
              <ElementQuiz
                :element="element"
                :work="works.find((w) => w.id === element.number)"
                :is-focused="focusedElement?.number === element.number"
                :show-question="true"
                @click="handleElementClick(element)"
              />
            </div>
            <div
              class="u-p-xs"
              :style="{ gridColumn: '1 / span 18', gridRow: '8' }"
            />
          </GridLayout>
        </div>
        <SvgOverlay :reference-width="2011.89" :reference-height="1218.22">
          <image :href="castleSvg" x="0" y="2" width="2011.89" />
          <Transition name="fade">
            <image v-if="gameState !== 'starting'" :href="pathSvg" x="0" y="2" width="2011.89" />
          </Transition>
        </SvgOverlay>
      </div>
    </div>
  </div>
</template>

<style></style>
