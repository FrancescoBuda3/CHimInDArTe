<script setup lang="ts">
import { useDevice } from "./composables/useDevice";
import { watch } from "vue";

const { isKiosk } = useDevice();

const updateCSSVariable = () => {
  document.documentElement.style.setProperty(
    "--u",
    isKiosk.value ? "calc(100vw / 26)" : "calc(100vw / 4)",
  );
};

updateCSSVariable();
watch(isKiosk, updateCSSVariable);
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <RouterView />
  </div>
</template>
