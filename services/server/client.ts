import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';
 
// Notice the <AppRouter> generic here.
const user = await trpc.userById.query('1');
user.id;
user.name;
const createdUser = await trpc.userCreate.mutate({name : 'sachinraja'});
createdUser.id;
createdUser.name;
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});