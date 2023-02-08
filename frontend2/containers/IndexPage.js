"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("../utils/trpc");
const react_1 = __importDefault(require("react"));
function IndexPage() {
    const hello = trpc_1.trpc.hello.useQuery({ text: 'client' });
    if (!hello.data)
        return <div>Loading...</div>;
    return (<div>
      <p>{hello.data.greeting}</p>
    </div>);
}
exports.default = IndexPage;
