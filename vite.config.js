/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

export default defineConfig({
    plugins: [vue()],
    test: {
        clearMocks: true,
        restoreMocks: true,
        unstubEnvs: true,
        unstubGlobals: true,
        environment: "jsdom",
        setupFiles: ["tests/setup.js"],
        coverage: {
            include: ["src/**"],
            exclude: ["src/index.js", "**/*.spec.js"],
            reporter: ["text"],
        },
    },
});