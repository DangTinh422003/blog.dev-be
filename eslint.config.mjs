import pluginJs from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { "simple-import-sort": simpleImportSort }, 
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "warn",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "@typescript-eslint/no-unsafe-function-type": 0,
      "@typescript-eslint/no-unused-vars": "warn",
      "simple-import-sort/imports": "error", 
      "simple-import-sort/exports": "error", 
      "@typescript-eslint/no-explicit-any" : 0
    },
  },
];
