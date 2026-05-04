<script setup lang="ts">
import back from "../assets/back.svg";
import { useDevice } from "../composables/useDevice";

const { isKiosk } = useDevice();
const props = defineProps<{
  title?: string;
  hideBack?: boolean;
}>();
</script>

<template>
  <template v-if="isKiosk">
    <header
      class="w-[100vw] flex items-center u-px-xs u-py-md text-black font-medium transition-colors justify-center gap-2"
    >
      <div
        v-if="!props.hideBack"
        class="bg-white/90 rounded-full u-size-btn cursor-pointer hover:bg-gray-700 transition-colors items-center justify-center flex"
        @click="$router.back()"
      >
        <img :src="back" alt="arrow" class="u-size-md" />
      </div>
      <h1
        class="u-h-lg u-px-sm bg-white/90 rounded-full items-center justify-center flex u-text-lg"
      >
        {{ props.title || "CHIMINDARTE" }}
      </h1>
    </header>
  </template>
  <template v-else>
    <header
      class="w-[100vw] flex items-center u-px-xs u-py-xs text-black font-medium transition-colors"
    >
      <div class="flex-1">
        <div
          v-if="!props.hideBack"
          class="bg-white/90 rounded-full u-size-btn cursor-pointer hover:bg-gray-700 transition-colors items-center justify-center flex"
          @click="$router.back()"
        >
          <img
            :src="back"
            alt="arrow"
            class="u-size-sm -ml-[calc(var(--u)*0.04)]"
          />
        </div>
      </div>
      <h1
        class="u-h-lg u-px-sm bg-white/90 rounded-full items-center justify-center flex text-[clamp(0.4rem,calc(var(--u)*0.20),4rem)]"
      >
        {{ props.title || "CHIMINDARTE" }}
      </h1>
      <div class="flex-1" />
    </header>
  </template>
</template>
