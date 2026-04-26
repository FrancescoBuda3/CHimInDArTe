import { onMounted, ref } from "vue";
import { WorkFactory, type Work } from "../types/work";
import { ElementFactory, type PeriodicElement } from "../types/periodicElement";
import { ElementQuestionsFactory, type ElementQuestions } from "../types/questions";

// Ref globali (singleton pattern)
const elements = ref<PeriodicElement[]>([]);
const works = ref<Work[]>([]);
const elementQuestions = ref<ElementQuestions[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
let isInitialized = false;

export function useData() {
  // Esegui il caricamento solo la prima volta
  onMounted(async () => {
    if (isInitialized) return;
    isInitialized = true;

    try {
      isLoading.value = true;
      error.value = null;
      elements.value = await ElementFactory.loadElements();
      works.value = await WorkFactory.loadElements();
      elementQuestions.value = await ElementQuestionsFactory.loadElementQuestions();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Errore nel caricamento dati";
      console.error("Errore useData:", err);
    } finally {
      isLoading.value = false;
    }
  });

  return {
    elements,
    works,
    elementQuestions,
    isLoading,
    error,
  };
}
