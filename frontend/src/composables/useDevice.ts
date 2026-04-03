import { ref, computed, onMounted, onUnmounted, readonly } from "vue";
import { Device } from "../types/device";

const mode = ref<Device>("mobile");
let resizeClean: (() => void) | null = null;

export function useDevice() {

  function fromBrowser(): Device {
    const w = window.screen.width;
    const h = window.screen.height;

    const isKioskWidth = w == 1920
    const isKioskHeight = h == 1080
    const isKiosk = isKioskWidth && isKioskHeight;

    return isKiosk ? Device.Kiosk : Device.Mobile;
  }


  function detect(): void {
    mode.value = fromBrowser();
  }

  onMounted(() => {
    detect();
  });

  onUnmounted(() => resizeClean?.());

  const isTotem = computed(() => mode.value === Device.Kiosk);
  const isMobile = computed(() => mode.value === Device.Mobile);

  return {
    isTotem,
    isMobile,
    mode: readonly(mode),
  };
}
