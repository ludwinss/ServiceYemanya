module.exports = {
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["simple-import-sort", "import"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "adjacent-overload-signatures": "error",
    curly: "error",
    eofline: "error",
    align: ["error", "parameters"],
    "class-name": "error",
    indent: ["error", "tab"],
    "no-angle-bracket-type-assertion": "error",
    "ter-max-len": [
      "error",
      {
        code: 120,
        tabWidth: 2,
        ignoreImports: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
      },
    ],
    "no-consecutive-blank-lines": ["error", 1],
    "member-access": 0,
    "no-trailing-whitespace": "error",
    "no-bitwise": "error",
    "no-debugger": "error",
    "prefer-const": "error",
    "no-empty-interface": 0,
    "no-string-throw": "error",
    "unified-signatures": "error",
    "space-before-function-paren": ["error", "always"],
    "prefer-method-signature": "error",
    "arrow-return-shorthand": ["error", "multiline"],
    "no-duplicate-variable": "error",
    "no-inferrable-types": ["error", "ignore-params"],
    "no-var-keyword": "error",
    "variable-name": [
      "error",
      "ban-keywords",
      "check-format",
      "allow-leading-underscore",
      "allow-pascal-case",
    ],
    "no-empty": 0,
    "no-shadowed-variable": "error",
    "no-unused-expression": "error",
    "triple-equals": "error",
    "no-use-before-declare": 0,
    "jsdoc-format": "error",
    "one-line": ["error", "check-else", "check-whitespace", "check-open-brace"],
    quotemark: ["error", "single", "avoid-escape", "jsx-double"],
    semicolon: ["error", "always", "ignore-bound-class-methods"],
    "typedef-whitespace": [
      "error",
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        parameter: "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace",
      },
      {
        "call-signature": "onespace",
        "index-signature": "onespace",
        parameter: "onespace",
        "property-declaration": "onespace",
        "variable-declaration": "onespace",
      },
    ],
    whitespace: [
      "error",
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type",
    ],
    "no-duplicate-imports": "error",
  },
};
