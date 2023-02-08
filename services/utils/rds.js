"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const client = new aws_sdk_1.default.RDSDataService();
exports.default = {
    action: (params) => client.batchExecuteStatement(params).promise(),
    //set : (params) => {secret = params.secret;
    // arn = params.arn
    //} 
};
