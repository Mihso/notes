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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.get = exports.create = exports.Article = void 0;
exports.Article = __importStar(require("./article"));
const ulid_1 = require("ulid");
const database_1 = require("./database");
function create(title, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield database_1.database.DB.insertInto("article")
            .values({ articleID: (0, ulid_1.ulid)(), title: title, url: url })
            .returningAll()
            .execute();
        return result;
    });
}
exports.create = create;
function get(articleID) {
    return database_1.database.DB.selectFrom("article")
        .selectAll()
        .where("articleID", "=", articleID)
        .executeTakeFirst();
}
exports.get = get;
function list() {
    return database_1.database.DB.selectFrom("article")
        .selectAll()
        .orderBy("created", "desc")
        .execute();
}
exports.list = list;
