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
          url: `https://5pfs82ij3i.execute-api.us-east-1.amazonaws.com/trpc`,
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