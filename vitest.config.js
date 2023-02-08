"use strict";
/// <reference types="vitest" />
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        testTimeout: 30000,
    },
    logLevel: "info",
    esbuild: {
        sourcemap: "both",
    },
    resolve: {
        alias: {
            "@notes/core": "./services/core",
        },
    },
});
