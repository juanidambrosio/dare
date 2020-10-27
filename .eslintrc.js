module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'eol-last': ['error', 'never'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'no-multiple-empty-lines': ['error'],
    'no-trailing-spaces': ['error'],
    'no-unused-vars': ['error'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};