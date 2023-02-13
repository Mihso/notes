import AWS from "aws-sdk";

const client = new AWS.RDSDataService();
export default { 
  batcher: (params : any) => client.batchExecuteStatement(params).promise(),
  getter: (params: any) => client.executeStatement(params),
};