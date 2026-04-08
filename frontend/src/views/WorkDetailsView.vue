<script setup lang="ts">
import { useData } from '../composables/useData';
import AppHeader from '../components/AppHeader.vue';


const props = defineProps<{
  id: Number;
}>();

const works = useData().works;

</script>

<template>
    <div class = "fixed top-0 left-1/2 -translate-x-1/2 z-20">
        <AppHeader :title="works.find((w) => w.id === Number(props.id))?.title || 'Dettagli'" />
    </div>

</template>

<style>

</style>