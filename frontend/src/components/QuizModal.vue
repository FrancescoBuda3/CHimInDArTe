<script setup lang="ts">
import { useDevice } from '../composables/useDevice';

const { isKiosk } = useDevice();

</script>

<template>
    <div 
      :class="[
        'border-none z-50 relative',
        isKiosk 
          ? 'u-rounded-md u-p-xs bg-gray-600 flex items-center justify-center' 
          : 'u-rounded-md u-p-xs flex items-center justify-between cursor-pointer hover:transition-colors bg-gray-600 w-full',
      ]"
    >
        <slot />
    </div>
</template>
