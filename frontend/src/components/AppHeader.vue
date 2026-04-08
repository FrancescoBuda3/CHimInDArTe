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
    class="w-[100vw] flex items-center px-[calc(var(--element-vw)*0.095)] py-[calc(var(--element-vw)*0.10)] text-black font-montserrat font-medium transition-colors"
    :style="{
      '--element-vw': elementWidthVW,
    }"
  >
    <div class="flex-1">
      <div
        class="bg-white/90 rounded-full size-[calc(var(--element-vw)*0.6)] cursor-pointer hover:bg-gray-700 transition-colors items-center justify-center flex"
        @click="$router.back()"
      >
        <img :src="back" alt="arrow"
        :class="isKiosk ? 'size-[calc(var(--element-vw)*0.4)]' : 'size-[calc(var(--element-vw)*0.2)] -ml-[calc(var(--element-vw)*0.05)]'"
         />
      </div>
    </div>
    <h1
      class="h-[calc(var(--element-vw)*0.6)] px-[calc(var(--element-vw)*0.2)] bg-white/90 rounded-full items-center justify-center flex"
      :class="isKiosk ? 'text-[clamp(1rem,calc(var(--element-vw)*0.8),3rem)]' : 'text-[clamp(1.2rem,calc(var(--element-vw)*0.25),5rem)]'"
    >
      {{ props.title || "CHIMINDARTE" }}
    </h1>
    <div class="flex-1" />
  </header>
</template>
