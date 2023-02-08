"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const t = server_1.initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;
const userList = [
    {
        id: '1',
        name: 'KATT',
    },
];
const appRouter = router({
    userById: publicProcedure
        .input((val) => {
        if (typeof val === 'string')
            return val;
        throw new Error(`Invalid input: ${typeof val}`);
    })
        .query((req) => {
        const input = req.input;
        const user = userList.find((it) => it.id === input);
        return user;
    }),
    userCreate: publicProcedure
        .input(zod_1.z.object({ name: zod_1.z.string() }))
        .mutation((req) => {
        const id = `${Math.random()}`;
        const user = {
            id,
            name: req.input.name,
        };
        userList.push(user);
        return user;
    }),
});
