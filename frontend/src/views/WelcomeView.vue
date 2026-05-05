<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePWAInstall } from "../composables/usePWAInstall";
import { useDevice } from "../composables/useDevice";

const router = useRouter();
const { isKiosk } = useDevice();
const { canInstallNatively, isIOS, isInstalled, triggerInstall } =
  usePWAInstall();

const showIOSModal = ref(false);

async function handleInstallClick() {
  if (canInstallNatively.value) {
    await triggerInstall();
  } else if (isIOS.value) {
    showIOSModal.value = true;
  }
}

function navigateToBrowser() {
  router.push("/home");
}

function closeIOSModal() {
  showIOSModal.value = false;
}
</script>

<template>
  <div
    class="relative z-10 w-full h-screen flex flex-col items-center justify-center px-6 py-8 gap-8"
  >
    <div class="welcome-header text-center">
      <img
        src="../assets/logo.png"
        alt="Logo"
        class="mb-4"
        :class="isKiosk ? 'w-[16vw]' : 'w-[80vw]'"
      />
    </div>

    <div v-if="isInstalled" class="welcome-content w-full max-w-sm space-y-6">
      <button
        class="w-full px-6 py-3 bg-zone-3 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
        @click="navigateToBrowser()"
      >
        Entra nell'app
      </button>
    </div>

    <div v-else class="welcome-content w-full max-w-sm space-y-6">
      <button
        class="w-full px-6 py-4 bg-zone-3 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-lg flex items-center justify-center gap-3"
        @click="handleInstallClick"
      >
        <span>Aggiungi alla schermata Home</span>
      </button>

      <p
        v-if="!canInstallNatively && !isIOS"
        class="text-center text-sm text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded-lg"
      >
        ⚠️ Il tuo browser non supporta l'installazione diretta. Usa Chrome su
        Android o Safari su iOS.
      </p>

      <div class="flex items-center gap-4">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="text-sm text-gray-500 font-medium">oppure</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <button
        class="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
        @click="navigateToBrowser()"
      >
        Continua nel browser
      </button>
    </div>

    <div
      v-if="showIOSModal"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      @click.self="closeIOSModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-sm p-6 space-y-6 animate-fade-in"
      >
        <h2 class="text-2xl font-bold text-gray-900">
          Aggiungi a schermata Home
        </h2>

        <p class="text-gray-700">Su iOS segui questi passaggi:</p>

        <ol class="space-y-4 text-gray-700">
          <li class="flex gap-4">
            <span
              class="flex-shrink-0 w-8 h-8 bg-zone-3 text-white rounded-full flex items-center justify-center font-bold text-sm"
            >
              1
            </span>
            <div>
              <p>
                Tocca l'icona <strong>Condividi</strong>
              </p>
              <p class="text-sm text-gray-500">
                La trovi nel menù in basso a destra
              </p>
            </div>
          </li>

          <li class="flex gap-4">
            <span
              class="flex-shrink-0 w-8 h-8 bg-zone-3 text-white rounded-full flex items-center justify-center font-bold text-sm"
            >
              2
            </span>
            <div>
              <p>
                Scorri e tocca
                <strong>"Aggiungi alla schermata Home"</strong>
              </p>
            </div>
          </li>

          <li class="flex gap-4">
            <span
              class="flex-shrink-0 w-8 h-8 bg-zone-3 text-white rounded-full flex items-center justify-center font-bold text-sm"
            >
              3
            </span>
            <div>
              <p>Tocca <strong>"Aggiungi"</strong> in alto a destra</p>
            </div>
          </li>
        </ol>

        <button
          class="w-full px-6 py-3 bg-zone-3 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
          @click="closeIOSModal"
        >
          Ho capito
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.welcome-header {
  animation: fade-in 0.6s ease-out;
}

.welcome-content {
  animation: fade-in 0.8s ease-out;
}
</style>
