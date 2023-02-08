import AWS from "aws-sdk";

const client = new AWS.RDSDataService();
export default { 
  action: (params) => client.batchExecuteStatement(params).promise(),
  //set : (params) => {secret = params.secret;
   // arn = params.arn
//} 
};