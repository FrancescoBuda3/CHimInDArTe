<script setup lang="ts">
import back from "../assets/back.svg";
import { useDevice } from "../composables/useDevice";

const { elementWidthVW, isKiosk } = useDevice();
const props = defineProps<{
  title?: string;
}>();
</script>

<template>
  <header
    class="w-[100vw] flex items-center u-px-xs u-py-xs text-black font-montserrat font-medium transition-colors"
    :style="{
      '--element-vw': elementWidthVW,
    }"
  >
    <div class="flex-1">
      <div
        class="bg-white/90 rounded-full u-size-btn cursor-pointer hover:bg-gray-700 transition-colors items-center justify-center flex"
        @click="$router.back()"
      >
        <img :src="back" alt="arrow"
        :class="isKiosk ? 'u-size-md' : 'u-size-sm -ml-[calc(var(--u)*0.04)]'"
         />
      </div>
    </div>
    <h1
      class="u-h-lg u-px-sm bg-white/90 rounded-full items-center justify-center flex"
      :class="isKiosk ? 'u-text-lg' : 'text-[clamp(0.4rem,calc(var(--u)*0.25),4rem)]'"
    >
      {{ props.title || "CHIMINDARTE" }}
    </h1>
    <div class="flex-1" />
  </header>
</template>
