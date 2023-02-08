import {initTRPC} from '@trpc/server';
import { z } from "zod";
import {  awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.create()
const Router = t.router;
const publicProcedure = t.procedure;

const appRouter = Router({
    hello : publicProcedure
    .input(
        z
        .object({
            text:z.string(),
        })
        .optional())
        .query(({input})=> { return{
            greeting: `you said ${input?.text ?? 'world'}`
        };}),
    bye : publicProcedure
    .input(
        z
        .object({
            text:z.string(),
        })
        .optional())
        .query(({input})=> { return{
            greeting: `you said ${input?.text ?? 'Bye'}`
        };}),
});

export type Router = typeof appRouter;

export const handler = awsLambdaRequestHandler({
    router: appRouter,
});