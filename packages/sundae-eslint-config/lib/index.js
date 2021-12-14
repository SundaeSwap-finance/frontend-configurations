module.exports = {
  parser: `@typescript-eslint/parser`, // Specifies the ESLint parser
  extends: [
    `airbnb`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:import/typescript`,
    `plugin:prettier/recommended`,
  ],
  plugins: [`@typescript-eslint`, `prettier`, `react-hooks`],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: `module`, // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  globals: {
    cy: true,
    Cypress: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        argsIgnorePattern: `res|next|stage|^err|on|config|e|_`,
      },
    ],
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-console': [`warn`, { allow: [`warn`] }],
    'spaced-comment': [2, `always`, { exceptions: [`-`, `+`], markers: [`/`] }],
    'no-use-before-define': 0,
    'no-plusplus': 0,
    'no-continue': 0,
    'no-shadow': 0,
    'linebreak-style': 0,
    'consistent-return': 0,
    'no-restricted-syntax': 0,
    'no-void': 0,
    'no-promise-executor-return': 0,
    'no-await-in-loop': 0,
    'no-param-reassign': 0,
    camelcase: 1,
    'import/no-unresolved': 0,
    'no-underscore-dangle': [`warn`, { allow: [`__typename`] }],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/no-danger': 0,
    'react/display-name': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-uses-react': 1,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-fragments': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-pascal-case': 0,
    'react/function-component-definition': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [`.js`, `.jsx`, `.tsx`],
      },
    ],
    'react-hooks/rules-of-hooks': `error`,
    'react-hooks/exhaustive-deps': `warn`,

    'jsx-a11y/href-no-hash': `off`,
    'jsx-a11y/anchor-is-valid': [
      `warn`,
      {
        aspects: [`invalidHref`],
      },
    ],
  },
};
