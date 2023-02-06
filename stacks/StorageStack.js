import { RDS } from "@serverless-stack/resources";

export function StorageStack({ stack , app}) {
  const rds = new RDS(stack, "db", {
    engine: "postgresql11.13",
    defaultDatabaseName: "main",
    migrations: "services/migrations",
  });

  return rds;
}