import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import App from './App';
import { trpc } from './trpc';
export function OtherApp() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => 
    trpc.createClient({
      links : [
        httpBatchLink({
          url: `${import.meta.env.VITE_APP_API_URL}/trpc`,
        }),
      ]
    }),
  );
  
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
}