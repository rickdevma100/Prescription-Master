import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

/**
 * Initialize MSW mocks if enabled
 * Set VITE_USE_MOCKS=true in .env to enable mock API
 */
async function initApp() {
  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass'
    });
    console.log('🔶 MSW: Mock Service Worker enabled for API requests');
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

initApp();
