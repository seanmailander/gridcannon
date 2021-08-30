module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ["airbnb-base"],
  ignorePatterns: ["lz-string.min.js"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    LZString: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 4],
    "import/extensions": "off",
    "max-len": "off",
  },
};
