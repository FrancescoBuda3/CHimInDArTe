<script setup lang="ts">
import arrowIcon from '../assets/arrow.svg';
import { useDevice } from "../composables/useDevice";
import { useRouter } from 'vue-router';

const { elementWidthVW } = useDevice();
const router = useRouter();

const props = defineProps<{
  title?: string;
  id?: number;
}>();

const navigateToDetails = () => {
  if (props.id) {
    router.push({ name: 'WorkDetails', params: { id: props.id } });
  }
};
</script>

<template>
  <button 
    @click="navigateToDetails"
    :style ="{
      '--element-vw': elementWidthVW,
    }"
    class="w-[calc(100vw-1.7rem)] bg-gray-600/85 rounded-full px-[calc(var(--element-vw)*0.10)] py-[calc(var(--element-vw)*0.10)] ps-[calc(var(--element-vw)*0.50)] flex items-center justify-between gap-[calc(var(--element-vw)*0.20)] font-montserrat cursor-pointer hover:bg-gray-700 transition-colors border-none"
  >
    <span class="text-white text-[clamp(0.8rem,calc(var(--element-vw)*0.20),2rem)] font-medium">{{ title }}</span>
    <div class="w-full"/>
    <div class="bg-white rounded-full p-8 flex-shrink-0">
      <img :src="arrowIcon" alt="arrow" class="w-7 h-7" />
    </div>
  </button>
</template>
