import ReactDOM from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
import { App } from '@/app/App';
import '@/lib/i18n/config';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </StrictMode>,
  );
}
