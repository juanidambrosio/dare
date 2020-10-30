module.exports = {
  env: {
    node: true,
    'jest/globals': true
  },
  extends: ['plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'eol-last': ['error', 'never'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'no-multiple-empty-lines': ['error'],
    'max-len': ['error', { 'code': 80 }],
    'no-trailing-spaces': ['error'],
    'no-unused-vars': ['error'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};