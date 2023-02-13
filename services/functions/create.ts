import { ulid } from "ulid";
import AWS from "aws-sdk";
import { RDS } from "@serverless-stack/node/rds";
import handle from "../utils/handler";
import rds from "../utils/rds";

export const main = handle(async (event: any) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
    const current = new Date;
    let newTime = current.toISOString();
  const params = {
    secretArn: RDS.db.secretArn,
    resourceArn: RDS.db.clusterArn,
    sql: `INSERT INTO article(articleid, title, url, created) Values ( :articleid,:title, :url, CURRENT_TIMESTAMP)`,
    database: 'main',
    parameterSets: [[
    {name: 'articleid', value: {stringValue: ulid()}}, 
    {name: 'title', value: {stringValue: data.title}}, 
    {name: 'url', value: {stringValue: data.url}},
    {name: 'createdAt', value:{stringValue: newTime}}]],
  };
  await rds.batcher(params);
  return params.parameterSets;
});