import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";
import { FrontendStack } from "./FrontendStacks";
export default function main(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.stack(StorageStack).stack(ApiStack).stack(FrontendStack);
}