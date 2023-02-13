// import { Router } from "../server/trpc";
// import { z } from 'zod';
 
// export const appRouter = router({
//   // Create publicProcedure at path 'hello'
//   hello: publicProcedure.input(
//     z.object({
//         title: z.string(),
//         url: z.string(),}))
//         .query(({input}) => {
//     return {
//       greeting: `hello world ${input?.title} ${input?.url} ?? 'world'`,
//     };
//   }),
// });

// export type AppRouter = typeof appRouter;