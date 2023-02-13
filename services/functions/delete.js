import handle from "../utils/handler";
import { RDS } from "@serverless-stack/node/rds";
import rds from "../utils/rds";

export const main = handle(async (event) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const params = {
    secretArn: RDS.db.secretArn,
    resourceArn: RDS.db.clusterArn,
    sql: `DELETE from article WHERE articleid = '${event.pathParameters.id}'`,
    database: 'main',
    parameterSets: [[]],
  };

  console.log(params)

  await rds.batcher(params);
  return { status: true };;
});