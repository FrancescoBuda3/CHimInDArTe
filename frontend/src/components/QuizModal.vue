<script setup lang="ts">
import { useDevice } from '../composables/useDevice';

const { isKiosk } = useDevice();

</script>

<template>
    <div 
      :class="[
        'border-none z-50 relative u-rounded-md u-p-xs bg-gray-600 flex items-center justify-center',
        isKiosk ? '' : 'w-full',
      ]"
    >
        <slot />
    </div>
</template>
