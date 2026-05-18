# CHimInDArTe

Un'applicazione web interattiva per l'esplorazione della tavola periodica degli elementi chimici, con quiz gamificati e visualizzazioni 3D.

## 🚀 Quick Start

### Prerequisiti
- Node.js 18+
- pnpm

### Installazione

```bash
# Frontend
cd frontend
pnpm install
```

### Sviluppo

```bash
cd frontend
pnpm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

### Build

```bash
cd frontend
pnpm run build
```

## 📋 Funzionalità

- **Esplorazione**: Tavola periodica interattiva con dettagli sugli elementi
- **Quiz**: Modalità di gioco gamificata per testare le conoscenze
- **Visualizzazioni 3D**: Modelli 3D delle opere
- **PWA**: Supporto per Progressive Web App (funziona offline)
- **Responsive**: Interfaccia ottimizzata per kiosk e mobile

## 🛠 Tech Stack

- **Frontend**: Vue 3, TypeScript, Vite
- **Styling**: Tailwind CSS
- **3D**: A-Frame, Google Model Viewer
- **Testing**: Vitest
- **Routing**: Vue Router

## 📁 Struttura

```
frontend/
├── src/
│   ├── views/       # Pagine principali
│   ├── components/  # Componenti Vue
│   ├── composables/ # Composable functions
│   ├── types/       # Type definitions
│   └── routes/      # Configurazione routing
├── public/          # Assets statici (dati JSON, descrizioni)
└── tests/           # Test unitari
```

## 🔗 Links

- Sito: [chimindarte.disi.unibo.it](https://chimindarte.disi.unibo.it)
- Università: DISI - Università di Bologna
