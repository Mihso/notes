import { ReactStaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { StorageStack } from "./StorageStack";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

export const t = initTRPC.create();

export const appRouter = t.router({})

export function FrontendStack({ stack, app }) {
  const { api } = use(ApiStack);

  // Define our React app
  const site = new ReactStaticSite(stack, "ReactSite", {
    path: "frontend",
    // Pass in our environment variables
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}