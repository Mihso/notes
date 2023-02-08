"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.DB = void 0;
const rdsdataservice_1 = __importDefault(require("aws-sdk/clients/rdsdataservice"));
const rds_1 = require("@serverless-stack/node/rds");
const kysely_1 = require("kysely");
const kysely_data_api_1 = require("kysely-data-api");
exports.DB = new kysely_1.Kysely({
    dialect: new kysely_data_api_1.DataApiDialect({
        mode: "postgres",
        driver: {
            secretArn: rds_1.RDS.db.secretArn,
            resourceArn: rds_1.RDS.db.clusterArn,
            database: rds_1.RDS.db.defaultDatabaseName,
            client: new rdsdataservice_1.default(),
        },
    }),
});
exports.database = __importStar(require("./database"));
