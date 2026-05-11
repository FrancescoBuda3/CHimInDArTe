import { ref, computed, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import type { PeriodicElement } from "../types/periodicElement";
import { useDevice } from "./useDevice";

export function useElementFocus(periodicElements: Ref<PeriodicElement[]>, modalRef: Ref<HTMLElement | null>) {
  const { isMobile } = useDevice();

  const GAP = 25
  const PADDING = 8

  const focusedElement = ref<PeriodicElement | undefined>(undefined);
  const isScrolling = ref(false);
  const showNavigation = ref(false);
  const elementRefs = new Map<number, HTMLElement>();

  let animationFrameId: number | null = null;
  let scrollTimeoutId: ReturnType<typeof setTimeout> | null = null;

  const modalPosition = computed(() => {
    if (!focusedElement.value) return { x: 0, y: 0 }

    const anchor = elementRefs.get(focusedElement.value.number)
    if (!anchor) return { x: 0, y: 0 }

    const anchorRect = anchor.getBoundingClientRect()
    const modalW = modalRef.value?.offsetWidth ?? 280
    const modalH = modalRef.value?.offsetHeight ?? 56

    let x = anchorRect.left + anchorRect.width / 2 - modalW / 2
    x = Math.max(PADDING, Math.min(x, window.innerWidth - modalW - PADDING))

    const spaceBelow = window.innerHeight - anchorRect.bottom - GAP
    const spaceAbove = anchorRect.top - GAP

    let y: number

    if (spaceBelow >= modalH + PADDING) {
      y = anchorRect.bottom + GAP
    } else if (spaceAbove >= modalH + PADDING) {
      y = anchorRect.top - modalH - GAP
    } else if (spaceBelow >= spaceAbove) {
      y = Math.min(anchorRect.bottom + GAP, window.innerHeight - modalH - PADDING)
    } else {
      y = Math.max(anchorRect.top - modalH - GAP, PADDING)
    }

    return { x, y }
  })

  const findCenteredElement = () => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    for (const [number, el] of elementRefs) {
      const { left, right, top, bottom } = el.getBoundingClientRect()
      if (centerX >= left && centerX <= right && centerY >= top && centerY <= bottom) {
        focusedElement.value = periodicElements.value.find(e => e.number === number)
        return
      }
    }
    focusedElement.value = undefined
  }

  const scheduleUpdate = () => {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);

    isScrolling.value = true;
    showNavigation.value = false;

    if (scrollTimeoutId !== null) clearTimeout(scrollTimeoutId);

    scrollTimeoutId = setTimeout(() => {
      isScrolling.value = false;
      showNavigation.value = true;
    }, 500);

    animationFrameId = requestAnimationFrame(findCenteredElement);
  };

  const handleElementClick = (element: PeriodicElement) => {
    focusedElement.value = element
    if (isMobile.value) {
      elementRefs.get(element.number)?.scrollIntoView({
        behavior: 'smooth', block: 'center', inline: 'center'
      })
    }
  }

  const registerElement = (number: number, el: HTMLElement | null) => {
    if (el) elementRefs.set(number, el);
    else elementRefs.delete(number);
  };

  const scrollIntoElementNumber = (number: number) => {
    const element = periodicElements.value.find(e => e.number === number);
    if (element) {
      focusedElement.value = element;
      if (isMobile.value) {
        const el = elementRefs.get(number);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
      }
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", scheduleUpdate);
    window.addEventListener("resize", findCenteredElement);
    document.addEventListener("scroll", scheduleUpdate, true);
    findCenteredElement();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", findCenteredElement);
    document.removeEventListener("scroll", scheduleUpdate, true);
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    if (scrollTimeoutId !== null) clearTimeout(scrollTimeoutId);
  });

  return {
    focusedElement,
    isScrolling,
    showNavigation,
    modalPosition,
    handleElementClick,
    registerElement,
    scrollIntoElementNumber
  };
}
