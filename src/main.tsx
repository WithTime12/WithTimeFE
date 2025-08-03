import './index.css';

import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from './api/queryClient.ts';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        {import.meta.env.VITE_DEV_MODE && <ReactQueryDevtools initialIsOpen={false} />}
        <App />
    </QueryClientProvider>,
);
