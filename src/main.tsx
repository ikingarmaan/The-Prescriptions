import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary
        fallbackTitle="Application Initialization Error"
        fallbackMessage="The application encountered an unexpected issue during initialization. Please reload the page."
      >
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
  (window as any).__appMounted = true;
}

