<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'

const router = useRouter()
</script>

<template>
  <div class="fixed top-0 left-1/2 -translate-x-1/2 z-20">
    <AppHeader :title="'Home'" />
  </div>
  <div class="u-p-sm u-pt-lg flex justify-center items-center flex-col gap-4">
    <button
      @click="router.push('/explore')"
      class="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
    >
      Esplora
    </button>
    <button
      @click="router.push('/quiz')"
      class="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
    >
      Quiz
    </button>
  </div>
</template>

<style></style>
