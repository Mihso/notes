import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, httpLink } from '@trpc/client';
import React, { useState } from 'react';
import App from './App';
import { trpc } from './trpc';
export function OtherApp() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links : [
        httpLink({
          url: "https://5pfs82ij3i.execute-api.us-east-1.amazonaws.com/trpc"//`${import.meta.env.REACT_APP_API_URL}/trpc`,
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

// function Sample() {
//   const hello = trpc.useQuery(["hello", "My Message"]);
//   return <div>{hello.isLoading ? "Loading..." : hello.date?.message}</div>;
// }