<script setup lang="ts">
import { ref, useSlots, computed } from "vue";

withDefaults(
  defineProps<{
    loop?: boolean;
    showDots?: boolean;
    showArrows?: boolean;
  }>(),
  {
    loop: true,
    showDots: true,
    showArrows: true,
  },
);

const emit = defineEmits<{
  change: [index: number];
}>();

const slots = useSlots();
const current = ref<number>(0);
const slides = computed(() => slots.default?.() ?? []);
const total = computed<number>(() => slides.value.length);

function goTo(i: number): void {
  current.value = i;
  emit("change", i);
}

function prev(loop: boolean): void {
  goTo(current.value === 0 ? (loop ? total.value - 1 : 0) : current.value - 1);
}

function next(loop: boolean): void {
  goTo(
    current.value === total.value - 1
      ? loop
        ? 0
        : total.value - 1
      : current.value + 1,
  );
}
</script>

<template>
  <div class="relative overflow-hidden w-full">
    <template v-for="(slide, i) in slides" :key="i">
      <div v-show="i === current">
        <component :is="slide" />
      </div>
    </template>

    <template v-if="showArrows">
      <button
        class="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/65 text-white rounded-full w-10 h-10 text-2xl flex items-center justify-center disabled:opacity-30"
        :disabled="!loop && current === 0"
        aria-label="Precedente"
        @click="prev(loop ?? true)"
      >
        &#8249;
      </button>
      <button
        class="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/65 text-white rounded-full w-10 h-10 text-2xl flex items-center justify-center disabled:opacity-30"
        :disabled="!loop && current === total - 1"
        aria-label="Successivo"
        @click="next(loop ?? true)"
      >
        &#8250;
      </button>
    </template>

    <div v-if="showDots" class="flex justify-center gap-2 pt-3">
      <button
        v-for="i in total"
        :key="i"
        class="w-2 h-2 rounded-full transition-all duration-200"
        :class="i - 1 === current ? 'bg-gray-800 scale-125' : 'bg-gray-300'"
        :aria-label="`Vai alla slide ${i}`"
        @click="goTo(i - 1)"
      />
    </div>
  </div>
</template>
