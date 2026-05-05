import { ref, onMounted, onUnmounted } from 'vue'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function usePWAInstall() {
  const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
  const canInstallNatively = ref(false)   // Android/Chrome: prompt automatico disponibile
  const isIOS = ref(false)                // iOS: mostrare istruzioni manuali
  const isInstalled = ref(false)          // App già installata (standalone mode)

  function detectPlatform() {
    // Rileva se l'app è già in modalità standalone (già installata)
    isInstalled.value =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true

    // Rileva iOS (iPhone, iPad, iPod)
    isIOS.value = /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window as any).MSStream
  }

  function handleBeforeInstallPrompt(e: Event) {
    // Blocca il prompt automatico del browser
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent
    canInstallNatively.value = true
  }

  async function triggerInstall() {
    if (!deferredPrompt.value) return false
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    deferredPrompt.value = null
    canInstallNatively.value = false
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
