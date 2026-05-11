<script setup lang="ts">
import arrowIcon from "../assets/arrow.svg";
import ElementDisplay from "../components/ElementDisplay.vue";
import { useData } from "../composables/useData";
import GridLayout from "../layouts/GridLayout.vue";
import { useDevice } from "../composables/useDevice";
import AppHeader from "../components/AppHeader.vue";
import AppModal from "../components/AppModal.vue";
import { useElementFocus } from "../composables/useElementFocus";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import type { PeriodicElement } from "../types/periodicElement";

const router = useRouter();
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
  scrollIntoElementNumber
} = useElementFocus(periodicElements, modalRef);

const handleClick = (element: PeriodicElement) => {
  if (focusedElement?.value?.number === element.number) {
    router.push(`/works/${element.number}`);
  } else {
    handleElementClick(element);
  }
};
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
      <AppModal>
        <span class="text-white u-text-sm u-pstart-lg font-medium">{{
          focusedElement?.nameIT
        }}</span>
        <div :class="isKiosk ? 'u-w-md' : 'w-full'" />
        <button
          class="bg-white rounded-full p-5 flex-shrink-0 hover:bg-gray-200 transition-colors cursor-pointer"
          @click="router.push(`/works/${focusedElement?.number}`)"
        >
          <img :src="arrowIcon" alt="arrow" class="w-5 h-5" />
        </button>
      </AppModal>
    </div>
  </Transition>

  <Transition name="fade" mode="out-in">
    <div
      v-if="!isScrolling"
      key="header"
      class="fixed top-0 left-1/2 -translate-x-1/2 z-20"
    >
      <AppHeader :title="'Esplora'" />
    </div>
  </Transition>

  <div
    class="w-screen h-screen overflow-auto hide-scrollbar items-center justify-center"
    :class="isMobile ? '' : 'flex'"
  >
    <div
      class="w-fit h-fit"
      :class="isMobile ? `py-[calc(50vh-1.5rem)] px-[calc(50vw-1.5rem)]` : ``"
    >
      <GridLayout :columns="18" :rows="7">
        <div
          v-for="element in periodicElements"
          :key="element.number"
          :style="{ gridColumn: element.xpos, gridRow: element.ypos }"
          :ref="
            (el) => registerElement(element.number, el as HTMLElement | null)
          "
        >
          <ElementDisplay
            :element="element"
            :work="works.find((w) => w.id === element.number)"
            :is-focused="focusedElement?.number === element.number"
            @click="handleClick(element)"
          />
        </div>
        <div :style="{ gridColumn: 3, gridRow: 6 }">
          <ElementDisplay
            :alternative-text="'57-71'"
            v-if="periodicElements.find((el) => el.number == 57)"
            :element="periodicElements.find((el) => el.number == 57)!"
          />
        </div>
        <div :style="{ gridColumn: 3, gridRow: 7 }">
          <ElementDisplay
            :alternative-text="'89-103'"
            v-if="periodicElements.find((el) => el.number == 89)"
            :element="periodicElements.find((el) => el.number == 89)!"
          />
        </div>

        <div
          class="u-p-xs"
          :style="{ gridColumn: '1 / span 18', gridRow: '8' }"
        />
      </GridLayout>
    </div>
  </div>
</template>

<style></style>
