<script setup lang="ts">
import { ref, useSlots, computed, Fragment, type VNode } from "vue";
import arrowIcon from "../assets/arrow.svg";
import SimpleButton from "./SimpleButton.vue";

const props = defineProps<{
  lastLabel: string;
  onFinish: () => void;
  isFinishButtonEnabled?: boolean;
}>();

const slots = useSlots();
const current = ref(0);

const slides = computed<VNode[]>(() =>
  (slots.default?.() ?? [])
    .flatMap((vnode) =>
      vnode.type === Fragment ? (vnode.children as VNode[]) : [vnode]
    )
    .filter((vnode) => vnode.type !== Comment)
);

const isLast = computed(() => current.value === slides.value.length - 1);

function next() {
  if (isLast.value) {
    props.onFinish();
  } else {
    current.value++;
  }
}
</script>

<template>
  <div class="relative overflow-hidden w-full">
    <template v-for="(slide, i) in slides" :key="i">
      <div v-show="i === current">
        <component :is="() => slide" />
      </div>
    </template>
    <div class="flex justify-end pt-3 u-p-xs">
      <SimpleButton
        :label="isLast ? lastLabel : 'Avanti'"
        :icon="arrowIcon"
        :disabled="isLast && props.isFinishButtonEnabled === false"
        @click="next"
      />
    </div>
  </div>
</template>