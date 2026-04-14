<script setup lang="ts">
import { computed, ref } from "vue";
import { useElementCategory } from "../composables/useElementCategory";
import { useDevice } from "../composables/useDevice";

const props = defineProps<{
  text: string;
  colorGroup: string;
  maxLength?: number;
}>();

const MAX_LENGTH = computed(() => props.maxLength ?? 120);
const isModalOpen = ref(false);

const { isKiosk } = useDevice();
const { colorBackgroundMap } = useElementCategory();
const backgroundClass = computed(() => colorBackgroundMap[props.colorGroup] || 'bg-gray-200');

const isTruncated = computed(() => props.text.length > MAX_LENGTH.value);

const displayText = computed(() =>
  isTruncated.value
    ? props.text.slice(0, MAX_LENGTH.value).trimEnd() + '…'
    : props.text
);

function open() { isModalOpen.value = true; }
function close() { isModalOpen.value = false; }
</script>

<template>
  <div
    :class="[
      backgroundClass,
      'u-rounded-sm u-p-sm text-white relative',
      isKiosk ? 'u-w-7x' : '',
    ]"
  >
    <h3 class="font-medium text-[clamp(0.4rem,calc(var(--u)*0.25),4rem)]">
      Descrizione dell'opera
    </h3>
    <p>{{ displayText }}</p>

    <button
      v-if="isTruncated"
      @click="open"
      aria-label="Leggi descrizione completa"
      class="absolute bottom-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        @click.self="close"
      >
        <div
          :class="[backgroundClass, 'u-rounded-sm u-p-sm text-white relative max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl']"
        >
          <h3 class="font-medium text-[clamp(0.4rem,calc(var(--u)*0.25),4rem)] pr-8">
            Descrizione dell'opera
          </h3>
          <p class="mt-2 leading-relaxed">{{ text }}</p>

          <button
            @click="close"
            aria-label="Chiudi"
            class="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>