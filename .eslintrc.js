module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
  },
};
