module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'commonjs': true,
  },
  'plugins': [
    'html',
    'css-modules',
  ],
  'extends': [
    'google',
    'plugin:css-modules/recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
  },
  'rules': {
    'css-modules/no-unused-class': [2, {'camelCase': true}],
    'css-modules/no-undef-class': [2, {'camelCase': true}],
    'linebreak-style': false,
    'no-invalid-this': false,
    'no-unused-vars': false,
    'require-jsdoc': false,
  },
};
