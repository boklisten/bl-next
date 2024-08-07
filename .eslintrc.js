module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    es2024: true,
    "cypress/globals": true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "eslint:recommended",
    "plugin:cypress/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/all",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["cypress", "eslint-plugin-no-relative-import-paths"],
  ignorePatterns: ["cypress"],
  rules: {
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      {
        rootDir: "src",
        prefix: "@",
      },
    ],
    "unicorn/consistent-function-scoping": [
      "error",
      {
        checkArrowFunctions: false,
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          kebabCase: true,
        },
      },
    ],
    "unicorn/no-keyword-prefix": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          prop: false,
          props: false,
          ref: false,
          params: false,
        },
      },
    ],
    "unicorn/no-null": "off",
    // .textContent is very different from .innerText, not interchangeable
    "unicorn/prefer-dom-node-text-content": "off",
    /** @see https://medium.com/weekly-webtips/how-to-sort-imports-like-a-pro-in-typescript-4ee8afd7258a */
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"],
          "index",
          "unknown",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    /** */
  },
};
