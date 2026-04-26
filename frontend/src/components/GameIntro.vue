<script setup lang="ts">
import { ref } from "vue";
import AppCarousel from "./AppCarousel.vue";
import { useDevice } from "../composables/useDevice";

const { isKiosk } = useDevice();
</script>

<template>
  <div :class="isKiosk ? 'u-w-6x' : 'w-full'">
    <AppCarousel>
        <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </AppCarousel>
  </div>
</template>
