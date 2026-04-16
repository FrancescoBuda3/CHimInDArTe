<script setup lang="ts">
import { useDevice } from '../composables/useDevice';

const { isKiosk } = useDevice();

</script>

<template>
    <div 
      :class="[
        'bg-gray-600/85 rounded-full u-p-xs flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-colors border-none',
        isKiosk ? 'fixed' : 'w-full',
      ]"
    >
        <slot />
    </div>
</template>
