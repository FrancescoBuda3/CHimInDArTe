<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const sceneRef = ref<HTMLElement | null>(null);
const baseUrl = import.meta.env.BASE_URL;
const imageTargetSrc = computed(() => `${baseUrl}targets/test_2.mind`);
const modelSrc = computed(() => `${baseUrl}3dModels/scene.gltf`);

onMounted(() => {
  if (sceneRef.value) {
    sceneRef.value.setAttribute(
      "mindar-image",
      `imageTargetSrc: ${imageTargetSrc.value}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no; filterMinCF:0.1; filterBeta: 10 warmupTolerance: 10;`,
    );
  }
});
</script>

<template>
  <a-scene
    ref="sceneRef"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights, antialias: true, precision: medium"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
    loading-screen="enabled: false"
  >
    <a-assets>
      <!-- <img
        id="card"
        src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.png"
        crossorigin="anonymous"
      /> -->
      <!-- <a-asset-item
        id="avatarModel"
        src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
        crossorigin
      ></a-asset-item> -->
      <a-asset-item id="avatarModel" :src="modelSrc" crossorigin></a-asset-item>
    </a-assets>

    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

    <a-entity mindar-image-target="targetIndex: 0">
      <!-- <a-plane
        src="#card"
        position="0 0 0"
        height="0.552"
        width="1"
        rotation="0 0 0"
      ></a-plane> -->
       <!--      <a-gltf-model
        rotation="0 90 0"
        position="0 0 0.3"
        scale="3 3 3"
        src="#avatarModel"
      ></a-gltf-model> -->
      <a-gltf-model
        rotation="90 0 0"
        position="0 0 0.3"
        scale="5 5 5"
        animation-mixer="clip: idle; loop: repeat; timeScale: 0.7"
        src="#avatarModel"
      ></a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<style scoped>
a-scene {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
}

/* Ottimizzazioni per dispositivi mobili */
:deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
