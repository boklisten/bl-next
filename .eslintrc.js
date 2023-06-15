module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:cypress/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/all",
    "next/core-web-vitals",
    "prettier",
  ],
  plugins: ["cypress"],
  ignorePatterns: ["cypress/support", "cypress/plugins"],
  rules: {
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
          props: false,
        },
      },
    ],
    "unicorn/no-null": "off",
  },
};
