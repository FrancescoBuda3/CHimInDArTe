import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useContainerSize(containerRef: Ref<HTMLElement | null>) {
  const width = ref(0)
  const height = ref(0)

  let ro: ResizeObserver
  onMounted(() => {
    ro = new ResizeObserver(([entry]) => {
      width.value = entry?.contentRect.width || 0
      height.value = entry?.contentRect.height || 0
    })
    if (containerRef.value) ro.observe(containerRef.value)
  })
  onUnmounted(() => ro?.disconnect())

  return { width, height }
}