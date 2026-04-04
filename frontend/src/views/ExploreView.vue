<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ElementDisplay from "../components/ElementDisplay.vue";
import { useData } from "../composables/useData";
import GridLayout from "../layouts/GridLayout.vue";
import type { PeriodicElement } from "../types/periodicElement";
import { useDevice } from "../composables/useDevice";

const periodicElements = useData().elements;
const { isMobile } = useDevice();
const centeredElement = ref<PeriodicElement | undefined>(undefined);
let animationFrameId: number | null = null;

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
      centeredElement.value =
        periodicElements.value.find((e) => e.number === elementNumber) ||
        undefined;
      return;
    }
  }

  centeredElement.value = undefined;
};

const scheduleUpdate = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
  animationFrameId = requestAnimationFrame(findCenteredElement);
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
});
</script>

<template>
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
          :data-element-number="element.number"
          :is-focused="
            centeredElement && centeredElement.number === element.number
          "
        />
      </GridLayout>
    </div>
  </div>
</template>

<style>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
