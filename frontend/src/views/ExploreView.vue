<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import arrowIcon from "../assets/arrow.svg";
import ElementDisplay from "../components/ElementDisplay.vue";
import { useData } from "../composables/useData";
import GridLayout from "../layouts/GridLayout.vue";
import type { PeriodicElement } from "../types/periodicElement";
import { useDevice } from "../composables/useDevice";
import AppHeader from "../components/AppHeader.vue";
import AppModal from "../components/AppModal.vue";

const router = useRouter();
const { isKiosk } = useDevice();
const periodicElements = useData().elements;
const works = useData().works;
const { isMobile } = useDevice();
const focusedElement = ref<PeriodicElement | undefined>(undefined);
const isScrolling = ref(false);
const showNavigation = ref(false);
let animationFrameId: number | null = null;
let scrollTimeoutId: ReturnType<typeof setTimeout> | null = null;

const modalCoordinates = computed(() => {
  if (!focusedElement.value) {
    return { x: 0, y: 0 };
  }

  const element = document.querySelector(
    `[data-element-number="${focusedElement.value.number}"]`,
  );
  if (!element) {
    return { x: 0, y: 0 };
  }

  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 - 140,
    y: rect.bottom + 40,
  };
});

const findCenteredElement = () => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const elements = document.querySelectorAll("[data-element-number]");

  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    const isContained =
      centerX >= rect.left &&
      centerX <= rect.right &&
      centerY >= rect.top &&
      centerY <= rect.bottom;

    if (isContained) {
      const elementNumber = parseInt(
        el.getAttribute("data-element-number") || "0",
      );
      focusedElement.value =
        periodicElements.value.find((e) => e.number === elementNumber) ||
        undefined;
      return;
    }
  }

  focusedElement.value = undefined;
};

const scheduleUpdate = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }

  isScrolling.value = true;
  showNavigation.value = false;

  if (scrollTimeoutId !== null) {
    clearTimeout(scrollTimeoutId);
  }

  scrollTimeoutId = setTimeout(() => {
    isScrolling.value = false;
    showNavigation.value = true;
  }, 500);

  animationFrameId = requestAnimationFrame(findCenteredElement);
};

const handleElementClick = (element: PeriodicElement) => {
  focusedElement.value = element;

  if (isMobile.value) {
    const el = document.querySelector(
      `[data-element-number="${element.number}"]`,
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", scheduleUpdate);
  window.addEventListener("resize", findCenteredElement);
  document.addEventListener("scroll", scheduleUpdate, true);
  findCenteredElement();
});

onUnmounted(() => {
  window.removeEventListener("scroll", scheduleUpdate);
  window.removeEventListener("resize", findCenteredElement);
  document.removeEventListener("scroll", scheduleUpdate, true);
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
  if (scrollTimeoutId !== null) {
    clearTimeout(scrollTimeoutId);
  }
});
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="
        (isKiosk || showNavigation) &&
        focusedElement &&
        works.find((w) => w.id === focusedElement?.number)
      "
      key="modal"
      :class="isKiosk ? 'fixed z-20 u-w-3x' : 'fixed bottom-0 left-1/2 -translate-x-1/2 z-20 p-3 w-full'"
    >
      <AppModal :coordinates="modalCoordinates">
        <span class="text-white u-text-sm u-pstart-lg font-medium">{{
          focusedElement?.name
        }}</span>
        <div :class="isKiosk ? 'u-w-md' : 'w-full'" />
        <button
          class="bg-white rounded-full p-8 flex-shrink-0 hover:bg-gray-200 transition-colors cursor-pointer"
          @click="router.push(`/works/${focusedElement?.number}`)"
        >
          <img :src="arrowIcon" alt="arrow" class="w-7 h-7" />
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
        <ElementDisplay
          v-for="element in periodicElements"
          :key="element.number"
          :element="element"
          :work="works.find((w) => w.id === element.number)"
          :data-element-number="element.number"
          :is-focused="
            focusedElement && focusedElement.number === element.number
          "
          @click="handleElementClick(element)"
        />
      </GridLayout>
    </div>
  </div>
</template>

<style></style>
