import handler from "../utils/handler";
import { RDS } from "@serverless-stack/node/rds";
import rds from "../utils/rds";

export const main = handler(async (event) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body)
  const params = {
    secretArn: RDS.db.secretArn,
    resourceArn: RDS.db.clusterArn,
    sql: `Update article SET url = :url WHERE articleid = '${event.pathParameters.id}'`,
    database: 'main',
    parameterSets: [[
    {name: 'title', value: {stringValue: data.title}}, 
    {name: 'url', value: {stringValue: data.url}},]],
  };

  console.log(params)

  await rds.batcher(params);
  return { status: true };
});