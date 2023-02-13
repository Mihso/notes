import { StackContext, Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const table = use(StorageStack);

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
    },

    cors: true,

    routes: {
      "GET /notes" : "functions/get.main",
      "POST /trpc/{proxy+}" : "server/trpc.handler",
      "GET /trpc/{proxy+}": "server/trpc.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}