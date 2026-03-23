<script setup lang="ts">
import "@google/model-viewer";
import { computed } from "vue";

const baseUrl = import.meta.env.BASE_URL;
const modelSrc = computed(() => `${baseUrl}3dModels/fiore.glb`);
</script>

<template>
  <model-viewer
    id="model-viewer"
    :src="modelSrc"
    ar
    ar-modes="scene-viewer quick-look"
    camera-controls
    touch-action="pan-y"
    alt="A 3D model of an astronaut"
    shadow-intensity="2"
    auto-rotate
    disable-pan
    skybox-height="2m"
    max-camera-orbit="auto 90deg auto"
  >
    <div id="error" class="hide">AR is not supported on this device</div>
  </model-viewer>
</template>

<style scoped>
.model-viewer-wrapper {
  width: 100vw;
  height: 100vh;
}

.viewer {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #f4f4f4 0%, #e5e5e5 100%);
}
</style>
