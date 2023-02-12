import * as trpc from '../../frontend/node_modules/@trpc/server/dist';
import { z } from "zod";
import { ulid } from "ulid";
import AWS from "aws-sdk";
import { RDS } from "@serverless-stack/node/rds";
import rds from "../utils/rds";
import handle from '../utils/handler';
import { CreateAWSLambdaContextOptions, awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { APIGatewayProxyEvent, APIGatewayProxyEventV2 } from 'aws-lambda';

// You can use any variable name you like.
// We use t to keep things simple.

const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEvent>)=>{
  return {
  method: 'PUT',
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
    bye : publicProcedure
    .input(
        z
        .object({
            text:z.string().nullish(),
        })
        .nullish())
        .query(({input})=> { 
          return{
            greeting: `you said ${input?.text ?? 'Bye'}`
        };
      }),
    createArticles: publicProcedure.input(
      z.object({
        title: z.string(), url: z.string()})).mutation(({input})=>{
          console.log(input);
            const current = new Date;
            let newTime = current.toISOString();
          const params = {
            secretArn: RDS.db.secretArn,
            resourceArn: RDS.db.clusterArn,
            sql: `INSERT INTO article(articleid, title, url, created) Values ( :articleid,:title, :url, CURRENT_TIMESTAMP)`,
            database: 'main',
            parameterSets: [[
            {name: 'articleid', value: {stringValue: ulid()}}, 
            {name: 'title', value: {stringValue: input.title}}, 
            {name: 'url', value: {stringValue: input.url}},]],
          };
          rds.action(params);
  return{
    message: "done",
  }}),
  DeleteArticle: publicProcedure.input(
    z.object({
      id: z.string()})).mutation(({input})=>{
        console.log(input);
        const params = {
          secretArn: RDS.db.secretArn,
          resourceArn: RDS.db.clusterArn,
          sql: `DELETE from article WHERE articleid = '${input.id}'`,
          database: 'main',
        };
      
        console.log(params)
        rds.action(params);
return{
  message: "done",
}}),
GetArticle: publicProcedure.query(async()=>{
      const params = {
        includeResultMetadata: true,
        secretArn: RDS.db.secretArn,
        resourceArn: RDS.db.clusterArn,
        sql: `SELECT * FROM article ORDER BY created DESC`,
        database: 'main',
      };
      let result = await rds.getter(params).promise();
      let vals = result.records;
      console.log(vals)
    //   if(vals != undefined){
      
    //     for(let i of vals){
    //       output.push(i);
    //   }
    // }
      // const result2 = run().then((output)=>{console.log(output)});
  return{
      vals : vals,
}})
});

export type Router = typeof appRouter;


export const handler = awsLambdaRequestHandler({
    router: appRouter,
    createContext,
    
});