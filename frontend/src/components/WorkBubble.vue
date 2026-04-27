<script setup lang="ts">
import { computed, ref, watch, nextTick } from "vue";
import type { Work } from "../types/work";
import { useDevice } from "../composables/useDevice";

const baseUrl = computed(() => import.meta.env.BASE_URL);
const { isKiosk } = useDevice();

const props = defineProps<{
  work: Work;
  isFocused: boolean;
  isHidden?: boolean;
  showQuestion: boolean;
}>();

const bubbleRef = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const isClosing = ref(false);
const isReady = ref(false); // evita il flash prima che la posizione sia calcolata
const position = ref({ top: 0, left: 0 });
const scale = ref({ x: 1, y: 1 });

async function openModal() {
  if (!bubbleRef.value || !isKiosk.value) return;
  const rect = bubbleRef.value.getBoundingClientRect();

  isClosing.value = false;
  isReady.value = false;
  isOpen.value = true;

  // Aspetta che il DOM renderizzi l'overlay con il suo contenuto reale
  await nextTick();

  if (overlayRef.value) {
    const overlayRect = overlayRef.value.getBoundingClientRect();

    // Bordo inferiore del modale coincide con quello della bolla,
    // centrato orizzontalmente rispetto ad essa
    position.value = {
      top: rect.bottom - overlayRect.height,
      left: rect.left + rect.width / 2 - overlayRect.width / 2,
    };

    scale.value = {
      x: rect.width / overlayRect.width,
      y: rect.height / overlayRect.height,
    };

    isReady.value = true; // ora possiamo mostrare e animare
  }
}

function closeModal() {
  isClosing.value = true;
  setTimeout(() => {
    isOpen.value = false;
    isClosing.value = false;
    isReady.value = false;
  }, 500);
}

watch(
  () => props.showQuestion,
  (val) => {
    if (val) openModal();
    else closeModal();
  }
);

const overlayStyle = computed(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`,
  "--scale-x": scale.value.x,
  "--scale-y": scale.value.y,
  visibility: isReady.value ? "visible" : "hidden",
} as any));
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      class="absolute left-1/2 z-20 pointer-events-none"
      style="top: 0; transform: translateX(-50%) translateY(-50%); margin-top: -12px;"
    >
      <div
        ref="bubbleRef"
        class="relative u-w-gameTile u-h-lg u-p-xs bg-gray-700 rounded-2xl shadow-lg flex items-center justify-center"
      >
        <img
          v-if="!isHidden"
          :src="`${baseUrl}pictures/${work.picture_file}`"
          :alt="work.title"
          class="w-full h-full object-contain"
        />
        <span v-else class="text-white u-text-md">?</span>

        <!-- Triangolino: rimane invariato -->
        <div
          class="absolute left-1/2 -translate-x-1/2 w-0 h-0"
          style="
            bottom: -12px;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-top: 13px solid rgb(55 65 81 / 0.9);
          "
        ></div>
      </div>
    </div>
  </Transition>

  <!-- Modale animato, fixed nel viewport, si espande verso l'alto -->
  <div
    v-if="isOpen"
    ref="overlayRef"
    class="fixed z-50 pointer-events-none"
    :style="overlayStyle"
  >
    <div
      :class="[
        'bg-gray-700 rounded-2xl shadow-lg',
        isReady && !isClosing ? 'scale-in-bottom' : '',
        isClosing ? 'scale-out-bottom' : '',
      ]"
    >
      <div
        :class="[isClosing ? 'fade-out-content' : 'fade-in-content']"
        class="p-4 pointer-events-auto"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scale-in-bottom {
  animation: scale-in-bottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.scale-out-bottom {
  animation: scale-out-bottom 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

.fade-in-content {
  animation: fade-in 0.1s ease-in 0.1s both;
}

.fade-out-content {
  animation: fade-out 0.1s ease-out both;
}

@keyframes scale-in-bottom {
  0% {
    transform: scale(var(--scale-x), var(--scale-y));
    transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: 50% 100%;
    opacity: 1;
  }
}

@keyframes scale-out-bottom {
  0% {
    transform: scale(1);
    transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    transform: scale(var(--scale-x), var(--scale-y));
    transform-origin: 50% 100%;
    opacity: 1;
  }
}

@keyframes fade-in {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fade-out {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}
</style>