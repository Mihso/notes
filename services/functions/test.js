"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("./trpc");
const zod_1 = require("zod");
exports.appRouter = (0, trpc_1.router)({
    // Create publicProcedure at path 'hello'
    hello: trpc_1.publicProcedure.input(zod_1.z.object({
        title: zod_1.z.string(),
        url: zod_1.z.string(),
    }))
        .query(({ input }) => {
        return {
            greeting: `hello world ${input === null || input === void 0 ? void 0 : input.title} ${input === null || input === void 0 ? void 0 : input.url} ?? 'world'`,
        };
    }),
});
