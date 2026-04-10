<script setup lang="ts">
import { useDevice } from '../composables/useDevice';

const { isKiosk } = useDevice();

const props = defineProps<{
  coordinates: { x: number; y: number };
}>();

</script>

<template>
    <div 
      :class="[
        'bg-gray-600/85 rounded-full u-p-xs flex items-center justify-between font-montserrat cursor-pointer hover:bg-gray-700 transition-colors border-none',
        isKiosk ? 'fixed' : 'w-full',
      ]"
      :style="isKiosk ? { left: `${coordinates.x}px`, top: `${coordinates.y}px` } : {}"
    >
        <slot />
    </div>
</template>
