module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:compat/recommended",
    "plugin:jest/style",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/all",
    "next/core-web-vitals",
    "prettier",
  ],
  plugins: ["cypress", "jest"],
  ignorePatterns: ["cypress/support", "cypress/plugins"],
  rules: {
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
  },
};
