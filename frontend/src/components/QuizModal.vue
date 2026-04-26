<script setup lang="ts">
import { useDevice } from '../composables/useDevice';

const { isKiosk } = useDevice();

</script>

<template>
    <div 
      :class="[
        'border-none',
        isKiosk 
          ? 'rounded-full u-p-xs bg-gray-600 flex items-center justify-center' 
          : 'rounded-full u-p-xs flex items-center justify-between cursor-pointer hover:transition-colors bg-gray-600/85 w-full',
      ]"
    >
        <slot />
    </div>
</template>
