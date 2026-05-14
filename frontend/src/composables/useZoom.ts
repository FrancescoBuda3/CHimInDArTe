import { ref } from "vue";

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2;
const DEFAULT_ZOOM = 1;

export function useZoom() {
  const zoomLevel = ref(DEFAULT_ZOOM);
  let lastDistance = 0;

  const handlePinch = (event: TouchEvent) => {
    if (event.touches.length !== 2) return;

    event.preventDefault();

    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    if (!touch1 || !touch2) return;
    const currentDistance = Math.hypot(
      touch2?.clientX - touch1?.clientX,
      touch2?.clientY - touch1?.clientY
    );

    if (lastDistance !== 0) {
      const scale = currentDistance / lastDistance;
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomLevel.value * scale));
      zoomLevel.value = newZoom;
    }

    lastDistance = currentDistance;
  };

  const handleTouchEnd = () => {
    lastDistance = 0;
  };

  const resetZoom = () => {
    zoomLevel.value = DEFAULT_ZOOM;
  };

  return {
    zoomLevel,
    resetZoom,
    handlePinch,
    handleTouchEnd,
  };
}
