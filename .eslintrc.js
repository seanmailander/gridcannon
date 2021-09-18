module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["lz-string.min.js"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    LZString: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "import/extensions": "off",
    "max-len": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "consistent-return": "warn"
  },
};
