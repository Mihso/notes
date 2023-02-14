import { StaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";

export function FrontendStack({ stack, app }) {
  const { api } = use(ApiStack);

  // Define our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "frontend3",
    buildCommand: "npm run build",
    buildOutput: "dist",
    // Pass in our environment variables
    environment: {
      VITE_APP_API_URL: api.customDomainUrl || api.url,
      VITE_APP_REGION: app.region,
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}