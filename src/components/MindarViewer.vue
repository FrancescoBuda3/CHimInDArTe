<script setup lang="ts"></script>

<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: ./targets/picture.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights, antialias: true, precision: medium"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
    loading-screen="enabled: false"
  >
    <a-assets>
      <img
        id="card"
        src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.png"
        crossorigin="anonymous"
      />
      <a-asset-item
        id="avatarModel"
        src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
        crossorigin
      ></a-asset-item>
    </a-assets>

    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

    <a-entity mindar-image-target="targetIndex: 0">
      <a-plane
        src="#card"
        position="0 0 0"
        height="0.552"
        width="1"
        rotation="0 0 0"
      ></a-plane>
      <a-gltf-model
        rotation="0 0 0 "
        position="0 0 0.1"
        scale="0.005 0.005 0.005"
        src="#avatarModel"
        animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
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
