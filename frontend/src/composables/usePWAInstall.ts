import { ref, onMounted, onUnmounted } from 'vue'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function usePWAInstall() {
  const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
  const canInstallNatively = ref(false)
  const isIOS = ref(false)
  const isInstalled = ref(false)

  function detectPlatform() {
    isInstalled.value =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true

    isIOS.value = /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window as any).MSStream
  }

  function handleBeforeInstallPrompt(e: Event) {
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent
    canInstallNatively.value = true
  }

  async function triggerInstall() {
    if (!deferredPrompt.value) return false
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    deferredPrompt.value = null
    return outcome === 'accepted'
  }

  onMounted(() => {
    detectPlatform()
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  })

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  })

  return {
    canInstallNatively,
    isIOS,
    isInstalled,
    triggerInstall
  }
}
