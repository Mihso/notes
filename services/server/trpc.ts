import * as trpc from '@trpc/server';
import { z } from "zod";
import superjson from "superjson";
// import { Context } from './context';
import { CreateAWSLambdaContextOptions, awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { APIGatewayProxyEvent, APIGatewayProxyEventV2 } from 'aws-lambda';


// You can use any variable name you like.
// We use t to keep things simple.

const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEvent>)=>{
  return {
  method: 'OPTIONS',
  mode: "cors",
  headers: {'Content-Type':'application/json',
    "Access-Control-Allow-Origin": "https://localhost:5000",
    "Access-Control-Allow-Credentials": true,
  },
  credentials: "include",
  };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const t = trpc.initTRPC.context<Context>().create();
const middleware = t.middleware;
const publicProcedure = t.procedure;
const appRouter = t.router({
    hello : publicProcedure
    .input(z.object({
            text:z.string().nullish(),
        })
        .nullish())
        .query(({input})=> { return{
            greeting: `you slay ${input?.text ?? 'world'}` 
        };
      }),
    // bye : publicProcedure
    // .input(
    //     z
    //     .object({
    //         text:z.string().nullish(),
    //     })
    //     .nullish())
    //     .query(({input})=> { 
    //       return{
    //         greeting: `you said ${input?.text ?? 'Bye'}`
    //     };
    //   }),
});

export type Router = typeof appRouter;


export const handler = awsLambdaRequestHandler({
    router: appRouter,
    createContext,
    
});