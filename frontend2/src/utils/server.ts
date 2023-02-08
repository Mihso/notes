import { initTRPC } from '@trpc/server';
import { z } from 'zod';
 
const t = initTRPC.create();
 
const router = t.router;
const publicProcedure = t.procedure;
 
interface Article {
  title: string;
  url: string;
}
 
const userList: Article[] = [
  {
    title: 'testTitle',
    url: 'testurl.com',
  },
];
 
const appRouter = router({
  userById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const input = req.input;
      const user = userList.find((it) => it.title === input);
 
      return user;
    }),
  userCreate: publicProcedure
    .input(z.object({ title: z.string(), url: z.string() }))
    .mutation((req) => {
      const user: Article = {
        title: req.input.title,
        url: req.input.url,
      };
 
      userList.push(user);
 
      return user;
    }),
});
 
export type AppRouter = typeof appRouter;