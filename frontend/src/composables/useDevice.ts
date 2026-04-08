import { ref, computed, onMounted, readonly } from "vue";
import { Device } from "../types/device";

const mode = ref<Device>("mobile");

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

  const isKiosk = computed(() => mode.value === Device.Kiosk);
  const isMobile = computed(() => mode.value === Device.Mobile);
  const elementWidthVW = computed(() => { return isKiosk.value ? `calc(100vw / 25)` : `calc(100vw / 4)` });

  return {
    isKiosk,
    isMobile,
    elementWidthVW,
    mode: readonly(mode),
  };
}
