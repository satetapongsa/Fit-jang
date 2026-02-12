import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import ErrorBoundary from './components/ErrorBoundary';

console.log('Main.tsx executing...');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
  console.log('React app mounted successfully');
} catch (e) {
  console.error('Failed to mount React app:', e);
  document.body.innerHTML = `<div style="color:red; padding: 20px"><h1>Application Error</h1><pre>${e instanceof Error ? e.message : JSON.stringify(e)}</pre></div>`;
}
