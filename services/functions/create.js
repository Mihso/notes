import { ulid } from "ulid";
import AWS from "aws-sdk";
import { RDS } from "@serverless-stack/node/rds";
const dynamoDb = new AWS.RDSDataService();

export async function main(event) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    secretArn: RDS.db.secretArn,
    resourceArn: RDS.db.clusterArn,
    sql: `INSERT INTO article(articleid, title, url, created) Values (:articleID, :title, :url, :createdAt)`,
    database: 'main',
    parameterSets: [[
    {name: 'articleID', value: {stringValue: ulid()}}, 
    {name: 'title', value: {stringValue: data.title}}, 
    {name: 'url', value: {stringValue: data.url}},
    {name: 'createdAt', value:{stringValue: Date.now().toString()}}]],
  };

  try {
    await dynamoDb.batchExecuteStatement(params);

    return {
      statusCode: 200,
      body: JSON.stringify(params),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}