import { StaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";

export function FrontendStack({ stack, app }) {
  const { api } = use(ApiStack);

  // Define our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "frontend2",
    buildCommand: "npm run build",
    buildOutput: "dist",
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