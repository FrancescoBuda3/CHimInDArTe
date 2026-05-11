<script setup lang="ts">
import { computed, ref, watch, nextTick } from "vue";
import type { Work } from "../types/work";
import { useDevice } from "../composables/useDevice";
import { useQuiz } from "../composables/useQuiz";

defineOptions({
  inheritAttrs: false,
});

const baseUrl = computed(() => import.meta.env.BASE_URL);
const { isKiosk } = useDevice();
const { gameElements, gameElementIsConquered, gameCursor } = useQuiz();

const props = defineProps<{
  work: Work;
  isFocused: boolean;
  isHidden?: boolean;
  isConquered?: boolean;
  showQuestion: boolean;
}>();

defineEmits<{
  click: [];
}>();

const bubbleRef = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const isClosing = ref(false);
const isReady = ref(false);
const position = ref({ top: 0, left: 0 });
const scale = ref({ x: 1, y: 1 });

const elementIndex = computed(() => {
  const element = gameElements.value.find(el => el.number === props.work.id);
  return element ? gameElements.value.indexOf(element) : -1;
});

const isCurrent = computed(() => elementIndex.value === gameCursor.value);

const isAnswered = computed(() => {
  return elementIndex.value >= 0 && elementIndex.value < gameCursor.value;
});

const shouldHide = computed(() => {
  if (isAnswered.value && gameElementIsConquered.value[elementIndex.value]) {
    return false;
  }
  return props.isHidden ?? false;
});

const bubbleColor = computed(() => {
  if (!isAnswered.value) {
    return "bg-gray-700";
  }
  if (props.isConquered && gameElementIsConquered.value[elementIndex.value]) {
    return "bg-green-600";
  }
  if (!props.isConquered && !gameElementIsConquered.value[elementIndex.value]) {
    return "bg-red-600";
  }
  return "bg-gray-700";
});

async function openModal() {
  if (!bubbleRef.value || !isKiosk.value) return;
  const rect = bubbleRef.value.getBoundingClientRect();

  isClosing.value = false;
  isReady.value = false;
  isOpen.value = true;

  await nextTick();

  if (overlayRef.value) {
    const overlayRect = overlayRef.value.getBoundingClientRect();

    position.value = {
      top: rect.bottom - overlayRect.height,
      left: rect.left + rect.width / 2 - overlayRect.width / 2,
    };

    scale.value = {
      x: rect.width / overlayRect.width,
      y: rect.height / overlayRect.height,
    };

    isReady.value = true;
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
        :class="[
          'relative u-w-gameTile u-h-lg u-p-xs rounded-2xl shadow-lg flex items-center justify-center cursor-pointer pointer-events-auto',
          bubbleColor,
          (isCurrent && !isOpen) ? 'bounce-animation border-4 border-white' : '',
        ]"
        @click="$emit('click')"
      >
        <img
          v-if="!shouldHide"
          :src="`${baseUrl}pictures/${work.picture_file}`"
          :alt="work.title"
          class="w-full h-full object-contain"
        />
        <span v-else class="text-white u-text-md">?</span>

        <div
          class="absolute left-1/2 -translate-x-1/2 w-0 h-0"
          :style="{
            bottom: '-12px',
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: `13px solid ${
              bubbleColor === 'bg-green-600' ? 'rgb(22 163 74 / 0.9)' :
              bubbleColor === 'bg-red-600' ? 'rgb(220 38 38 / 0.9)' :
              'rgb(55 65 81 / 0.9)'
            }`,
          }"
        ></div>
      </div>
    </div>
  </Transition>

  <div
    v-if="isOpen"
    ref="overlayRef"
    class="fixed z-50 pointer-events-none"
    :style="overlayStyle"
  >
    <div
      :class="[
        'rounded-2xl shadow-lg',
        bubbleColor,
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

.bounce-animation {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-10px);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-10px);
  }
}
</style>