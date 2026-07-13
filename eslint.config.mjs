import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * ESLint configuration for OVI world-class digital experience.
 *
 * Extends:
 *  - next/core-web-vitals: Next.js recommended rules + CWV linting
 *  - next/typescript: TypeScript-aware rules for Next.js
 *  - plugin:jsx-a11y: Accessibility enforcement
 *  - plugin:import: Clean import ordering and resolution
 *
 * Accessibility is treated as a first-class concern, not optional.
 */
const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jsx-a11y/recommended",
  ),
  {
    rules: {
      // ─── TypeScript ──────────────────────────────────────────────────────
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],

      // ─── React ───────────────────────────────────────────────────────────
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": ["error", "never"],

      // ─── General ─────────────────────────────────────────────────────────
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];

export default eslintConfig;
