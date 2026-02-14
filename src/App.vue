<script setup lang="ts">
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import MindarViewer from "./components/MindarViewer.vue";
import { ref } from "vue";

const mindarViewerRef = ref<InstanceType<typeof MindarViewer> | null>(null);
const title = ref("START");

function handleARSystems() {
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
}
</script>

<template>
  <div class="app">
    <h1>
      Example Vue 3 with
      <a href="https://github.com/hiukim/mind-ar-js" target="_blank">MindAR</a>
    </h1>

    <div>
      <button @click="handleARSystems()">{{ title }}</button>
    </div>

    <div class="container">
      <mindar-viewer ref="mindarViewerRef" />
    </div>
  </div>
</template>

<style scoped>
.app {
  text-align: center;
}

.container {
  margin: 20px auto;
  position: relative;
  height: 400px;
  width: 600px;
  overflow: hidden;
}
</style>
