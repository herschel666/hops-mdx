module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:node/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'node'],
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'],
      },
    ],
    'node/no-unpublished-require': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: '16.4',
    },
  },
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
};
