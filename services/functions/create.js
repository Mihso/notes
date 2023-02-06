import { ulid } from "ulid";
import AWS from "aws-sdk";
import { RDS } from "@serverless-stack/node/rds";
const dynamoDb = new AWS.RDSDataService();

export async function main(event) {
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

  try {
    await dynamoDb.batchExecuteStatement(params).promise();

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