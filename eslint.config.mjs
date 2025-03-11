import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { extends: [] },
});
const eslintConfig = [
  ...compat.extends("next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended"),
  {
"rules": {
    "no-unused-vars": "error",
    "no-console": "error",
    "prefer-const": "error",
    // "quotes": ["error", "double"],
    // "semi": ["error", "always"],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "no-extra-semi": "error",
    "camelcase": "error",
    "react/no-array-index-key": "warn",
    "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
];
export default eslintConfig;
