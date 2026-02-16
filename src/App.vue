<script setup lang="ts">
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "aframe-extras/loaders/animation-mixer.js";
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
  padding: 10px;
}

h1 {
  font-size: clamp(1.2rem, 5vw, 2rem);
  margin: 10px 0;
  line-height: 1.3;
}

button {
  margin: 15px 0;
  padding: 12px 24px;
  font-size: 1rem;
  min-width: 120px;
  touch-action: manipulation;
}

.container {
  margin: 20px auto;
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 0;
  padding-bottom: 66.67%; /* Aspect ratio 3:2 */
  overflow: hidden;
}

.container :deep(a-scene) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .app {
    padding: 5px;
  }

  h1 {
    font-size: clamp(1rem, 4vw, 1.5rem);
    margin: 5px 0;
  }

  button {
    padding: 10px 20px;
    font-size: 0.95rem;
    margin: 10px 0;
  }

  .container {
    margin: 10px auto;
    padding-bottom: 75%; /* Aspect ratio 4:3 for mobile */
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: clamp(0.9rem, 3.5vw, 1.2rem);
  }

  .container {
    padding-bottom: 100%; /* Square aspect ratio for small screens */
  }
}
</style>
