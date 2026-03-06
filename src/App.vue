<script setup lang="ts">
// import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "aframe-extras/loaders/animation-mixer.js";
// import "mind-ar/dist/mindar-image-aframe.prod.js";
// import MindarViewer from "./components/MindarViewer.vue";
import {computed} from "vue";

// const mindarViewerRef = ref<InstanceType<typeof MindarViewer> | null>(null);
// const title = ref("START");

/* const model = "/models/astronaut.glb" */

const baseUrl = import.meta.env.BASE_URL;
const modelSrc = computed(() => `${baseUrl}3dModels/provaDef.gltf`);
const iframeSrc = computed(
  () => `${baseUrl}ar/arScene.html?model=${encodeURIComponent(modelSrc.value)}`
);

/* function handleARSystems() {
  if (!mindarViewerRef.value) return;
  const sceneEl = mindarViewerRef.value.$el as any;
  const arSystem = sceneEl.systems["mindar-image-system"];
  if (title.value == "START") {
    arSystem.start();
    title.value = "STOP";
  } else {
    arSystem.stop();
    title.value = "START";
  }
} */
</script>

<template>
  <iframe style="width:100vw;height:100vh;border:none;" :src="iframeSrc"></iframe>
</template>

