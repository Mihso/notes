import * as trpc from '../../frontend3/node_modules/@trpc/server/dist';
import { z } from "zod";
import { ulid } from "ulid";
import { RDS } from "@serverless-stack/node/rds";
import rds from "../utils/rds";
import { CreateAWSLambdaContextOptions, awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { APIGatewayProxyEvent} from 'aws-lambda';

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
    hello : publicProcedure // done for testing
    .input(z.object({
            text:z.string().nullish(),
        })
        .nullish())
        .query(({input})=> { return{
            greeting: `you slay ${input?.text ?? 'world'}` 
        };
      }),
    bye : publicProcedure // done for testing
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
          rds.batcher(params);
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
          sql: `DELETE FROM article WHERE articleid='${input.id}'`,
          database: 'main',
        };
      
        rds.getter(params).promise();
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
  return{
      vals : vals,
}}),
UpdateArticle: publicProcedure.input(
  z.object({
    id: z.string(), url: z.string()})).mutation(({input})=>{
      console.log(input);
      const params = {
        secretArn: RDS.db.secretArn,
        resourceArn: RDS.db.clusterArn,
        sql: `Update article SET url = :url WHERE articleid='${input.id}'`,
        database: 'main',
        parameterSets: [[ 
        {name: 'url', value: {stringValue: input.url}},]],
      };
    
      rds.getter(params);
return{
message: "done",
}}),
});

export type Router = typeof appRouter;

export const handler = awsLambdaRequestHandler({
    router: appRouter,
    createContext,
    
});