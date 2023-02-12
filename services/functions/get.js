import handle from "../utils/handler";
import { RDS } from "@serverless-stack/node/rds";
import rds from "../utils/rds";

export const main = handle(async (event) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const params = {
    secretArn: RDS.db.secretArn,
    resourceArn: RDS.db.clusterArn,
    sql: `SELECT * FROM article`,
    database: 'main',
  };

  console.log(params)

  const result = (await rds.getter(params)).promise();
  if (!result) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result;
});