
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // Apply to all JavaScript and TypeScript files
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      globals: globals.node, // Node.js global variables
    },
    ignores: ["node_modules", "dist"], // Ignore unnecessary directories
    rules: {
      "no-unused-vars": "error", // Report unused variables
      "no-unused-expressions": "error", // Prevent unused expressions
      "prefer-const": "error", // Enforce const when variables are not reassigned
      "no-console": "warn", // Warn on console usage
      "no-undef": "error", // Disallow undefined variables
      eqeqeq: "off", // Disable strict equality checking
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }], // Advanced const rule
    },
  },
  // Specific configuration for JavaScript files using CommonJS
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // Use CommonJS modules
    },
  },
  // Recommended configurations from plugins
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
];
