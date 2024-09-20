import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/main.scss';
import App from '@/app';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('react-app');

if (!container) {
  throw new Error('문서에 "#app" 요소가 존재하지 않습니다.');
}

createRoot(container).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
