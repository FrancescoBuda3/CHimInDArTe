<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData } from "../composables/useData";
import AppHeader from "../components/AppHeader.vue";
import Description from "../components/Description.vue";
import { useDevice } from "../composables/useDevice";
import "@google/model-viewer";

const props = defineProps<{
  id: Number;
}>();

const { isKiosk } = useDevice();
const baseUrl = computed(() => import.meta.env.BASE_URL);
const works = useData().works;
const elements = useData().elements;
const work = computed(() => works.value.find((w) => w.id === Number(props.id)));
const element = computed(() =>
  elements.value.find((e) => e.number === Number(props.id)),
);
const description = ref("Nessuna descrizione disponibile.");
const modelSrc = ref("");
const iosSrc = ref("");

watch(
  () => work.value,
  async (newWork) => {
    if (!newWork) {
      description.value = "Nessuna descrizione disponibile.";
      modelSrc.value = "";
      iosSrc.value = "";
      return;
    }
    modelSrc.value = `${baseUrl.value}models/${newWork.model_file}`;
    iosSrc.value = `${baseUrl.value}models/${newWork.model_file}`;

    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}descriptions/${newWork.description_file}`,
      );
      if (!response.ok) throw new Error("File not found");
      description.value = await response.text();
    } catch (error) {
      console.error("Errore nel caricamento della descrizione:", error);
      description.value = "Nessuna descrizione disponibile.";
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="fixed top-0 left-1/2 -translate-x-1/2 z-20">
    <AppHeader :title="work?.title || 'Dettagli'" />
  </div>
  <div class="u-p-sm u-pt-lg flex justify-center items-center"
    :class="isKiosk ? 'flex-row' : 'flex-col'">
    <div class="u-size-3x flex items-center justify-center">
      <model-viewer
        v-if="element"
        :src="modelSrc"
        :alt="element.name"
        :poster="`${baseUrl}pictures/${work?.picture_file}`"
        auto-rotate
        camera-controls
        loading="lazy"
        ar
        ar-modes="webxr scene-viewer quick-look"
        :ios-src="iosSrc"
        style="width: 100%; height: 100%;"
      ></model-viewer>
    </div>
    <div>
      <div>
        <h3 :class="isKiosk ? 'text-2xl' : 'text-base'" class="u-pstart-xs">Opera realizzata da</h3>
        <p
          :class="isKiosk ? 'text-[clamp(0.8rem,calc(var(--u)*0.4),6rem)]' : 'text-[clamp(0.4rem,calc(var(--u)*0.25),4rem)]'"
          class="font-medium u-pstart-xs"
        >
          {{ work?.author }}
        </p>
      </div>
      <div>
        <p
          :class="isKiosk ? 'text-[clamp(0.6rem,calc(var(--u)*0.2),4rem)]' : 'text-[clamp(0.3rem,calc(var(--u)*0.15),2rem)]'"
          class="font-normal italic u-pstart-xs u-pt-xs u-pb-xs"
        >
          {{ Array.isArray(work?.materials) ? work.materials.join(', ') : work?.materials || 'Non disponibile' }}
        </p>
      </div>
      <Description
        :text="description"
        :colorGroup="element?.colorGroup || ''"
        :maxLength="300"
      />
    </div>
  </div>
</template>

<style></style>
