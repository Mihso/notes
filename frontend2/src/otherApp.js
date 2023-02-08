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
exports.OtherApp = void 0;
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("@trpc/client");
const react_1 = __importStar(require("react"));
const App_1 = __importDefault(require("./App"));
const trpc_1 = require("./utils/trpc");
function OtherApp() {
    const [queryClient] = (0, react_1.useState)(() => new react_query_1.QueryClient());
    const [trpcClient] = (0, react_1.useState)(() => trpc_1.trpc.createClient({
        links: [
            (0, client_1.httpBatchLink)({
                url: 'http://localhost:5000/trpc',
            }),
        ],
    }));
    return (<trpc_1.trpc.Provider client={trpcClient} queryClient={queryClient}>
      <react_query_1.QueryClientProvider client={queryClient}>
        <App_1.default />
      </react_query_1.QueryClientProvider>
    </trpc_1.trpc.Provider>);
}
exports.OtherApp = OtherApp;
