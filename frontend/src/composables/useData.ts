import { onMounted, ref } from "vue";
import { WorkFactory, type Work } from "../types/work";
import { ElementFactory, type PeriodicElement } from "../types/periodicElement";

export function useData() {
  const elements = ref<PeriodicElement[]>([]);
  const works = ref<Work[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      isLoading.value = true;
      error.value = null;
      elements.value = await ElementFactory.loadElements();
      works.value = await WorkFactory.loadElements();
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
    isLoading,
    error,
  };
}
