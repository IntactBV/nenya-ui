module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:jest/recommended'],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/space-infix-ops": "error",
    "@typescript-eslint/space-before-function-paren": [2, "never"],
    "@typescript-eslint/no-this-alias": "off",
    "array-bracket-spacing": [2, "always"],
    "arrow-spacing": [
      2,
      {
        before: true,
        after: true,
      },
    ],
    "block-spacing": [2, "always"],
    "brace-style": [
      2,
      "1tbs",
      {
        allowSingleLine: false,
      },
    ],
    "comma-spacing": [
      2,
      {
        before: false,
        after: true,
      },
    ],
    "comma-style": [2, "last"],
    "computed-property-spacing": [2, "always"],
    curly: [2, "all"],
    "dot-location": [2, "property"],
    "eol-last": [2],
    "func-names": [1],
    indent: [2, 2],
    "key-spacing": [
      2,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    "keyword-spacing": [2],
    "linebreak-style": [2, "unix"],
    "no-eq-null": [0],
    "no-func-assign": [2],
    "no-inline-comments": [2],
    "no-mixed-spaces-and-tabs": [2],
    "no-multi-spaces": [2],
    "no-spaced-func": [2],
    "no-trailing-spaces": [2],
    "object-curly-spacing": [2, "always"],
    "one-var": [0],
    "one-var-declaration-per-line": [2, "always"],
    quotes: [2, "single"],
    "semi-spacing": [
      2,
      {
        before: false,
        after: true,
      },
    ],
    "space-before-blocks": [2],
    "space-before-function-paren": [2, "never"],
    "space-in-parens": [
      2,
      "always",
      {
        exceptions: ["{}", "[]", "()"]
      }
    ],
    "space-infix-ops": [2],
    "space-unary-ops": [
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    "vars-on-top": [2]
  },
};
