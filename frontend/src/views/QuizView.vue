<script setup lang="ts">
import { useData } from "../composables/useData";
import GridLayout from "../layouts/GridLayout.vue";
import { useDevice } from "../composables/useDevice";
import AppHeader from "../components/AppHeader.vue";
import AppModal from "../components/AppModal.vue";
import { useElementFocus } from "../composables/useElementFocus";
import { ref } from "vue";
import ElementQuiz from "../components/ElementQuiz.vue";
import { useContainerSize } from "../composables/useContainerSize";
import SvgOverlay from "../components/SvgOverlay.vue";
import merlonSvg from "../assets/back.svg?url";
import castleSvg from "../assets/castle.svg?url";

const periodicElements = useData().elements;
const works = useData().works;
const { isKiosk, isMobile } = useDevice();
const modalRef = ref<HTMLElement | null>(null);

const {
  focusedElement,
  isScrolling,
  showNavigation,
  modalPosition,
  handleElementClick,
  registerElement,
} = useElementFocus(periodicElements, modalRef);
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="
        (isKiosk || showNavigation) &&
        focusedElement &&
        works.find((w) => w.id === focusedElement?.number)
      "
      ref="modalRef"
      :class="
        isKiosk
          ? 'fixed z-20 u-w-3x'
          : 'fixed bottom-0 left-1/2 -translate-x-1/2 z-20 p-3 w-full'
      "
      :style="
        isKiosk
          ? { left: `${modalPosition.x}px`, top: `${modalPosition.y}px` }
          : {}
      "
    >
      <AppModal> </AppModal>
    </div>
  </Transition>

  <Transition name="fade" mode="out-in">
    <div
      v-if="!isScrolling"
      key="header"
      class="fixed top-0 left-1/2 -translate-x-1/2 z-20"
    >
      <AppHeader :title="'Il Castello degli elementi'" />
    </div>
  </Transition>

  <div
    class="w-screen h-screen overflow-auto hide-scrollbar items-center justify-center"
    :class="isMobile ? '' : 'flex u-pt-2x'"
  >
    <div
      :class="isMobile ? `py-[calc(50vh-1.5rem)] px-[calc(50vw-1.5rem)]` : ``"
    >
      <div class="relative w-fit">
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
        </SvgOverlay>
      </div>
    </div>
  </div>
</template>

<style></style>
