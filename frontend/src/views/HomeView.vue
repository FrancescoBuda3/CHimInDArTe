<script setup lang="ts">
import { useRouter } from "vue-router";
import AppHeader from "../components/AppHeader.vue";
import { useDevice } from "../composables/useDevice";
import kioskBackgroundImage from "../assets/kioskBackground.png";
import mobileBackgroundImage from "../assets/mobileBackground.png";
import esploraButtonImage from "../assets/esploraButton.png";
import castelloButtonImage from "../assets/castelloButton.png";
import whiteArrowIcon from "../assets/whiteArrow.svg";
import greenArrowIcon from "../assets/greenArrow.svg";

const router = useRouter();
const { isKiosk } = useDevice();
</script>

<template>
  <img
    :src="isKiosk ? kioskBackgroundImage : mobileBackgroundImage"
    alt="Background"
    class="fixed top-0 right-0 h-[100vh] object-cover -z-10"
  />
  <div class="fixed top-0 left-1/2 -translate-x-1/2 z-20">
    <AppHeader :title="'Home'" :hideBack="true" />
  </div>
  <div class="u-p-sm u-pt-lg flex justify-center items-center flex-col gap-4">
    <img
      src="../assets/logo.png"
      alt="Logo"
      class="mb-4"
      :class="isKiosk ? 'w-[16vw]' : 'w-[80vw]'"
    />
    <button
      @click="router.push('/explore')"
      class="relative flex flex-col items-center justify-center items-center bg-[#18967e] aspect-[4.5/3]"
      :class="isKiosk ? 'w-[15vw]' : 'w-[90vw]'"
    >
      <img
        :src="esploraButtonImage"
        alt="Esplora"
        class="absolute top-0 m-4"
        :class="isKiosk ? 'h-[13vh]' : 'h-[21vh]'"
      />
      <div
        class="absolute bottom-0 inset-x-0 text-center text-white font-semibold text-2xl z-10 pb-3 leading-none"
      >
        <div>Esplora</div>
        <div>l'esposizione</div>
      </div>
      <img
        :src="whiteArrowIcon"
        alt="Arrow Icon"
        class="absolute bottom-2 right-2 w-6 h-6 u-m-xs"
      />
    </button>
    <button
      @click="router.push('/quiz')"
      class="relative flex flex-col items-center justify-center items-center border-3 border-[#18967e] aspect-[4.5/3]"
      :class="isKiosk ? 'w-[15vw]' : 'w-[90vw]'"
    >
      <img
        :src="castelloButtonImage"
        alt="Castello"
        class="absolute top-0 m-4 translate-x-1"
        :class="isKiosk ? 'h-[10vh]' : 'h-[18vh]'"
      />
      <div
        class="absolute bottom-0 inset-x-0 text-center text-[#18967e] font-semibold text-2xl z-10 pb-3 leading-none"
      >
        <div>Gioca al Castello</div>
        <div>degli elementi</div>
      </div>
      <img
        :src="greenArrowIcon"
        alt="Arrow Icon"
        class="absolute bottom-2 right-2 w-6 h-6 u-m-xs"
      />
    </button>
  </div>
</template>

<style></style>
