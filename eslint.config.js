// @ts-check

import path from "node:path";
import { fileURLToPath } from "node:url";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config({
    files: ["src/**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
    ],
    plugins: {
        react,
        "react-hooks": reactHooks,
    },
    languageOptions: {
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
            },
            tsconfigRootDir,
            project: ["./tsconfig.json", "./tsconfig.node.json"],
        },
        globals: {
            ...globals.browser,
        },
    },
    rules: {
        "@typescript-eslint/no-unused-expressions": 0,
        "@typescript-eslint/no-unused-vars": "warn",
        "no-unused-vars": "off", // отключаем базовое правило в пользу @typescript-eslint
    },
});
