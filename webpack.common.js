const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    body: './src/js/body.js',
    head: './src/js/head.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'public/js/')
  },
  plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin(),
     new FaviconsWebpackPlugin({
      logo: './src/assets/favicon.svg',
      mode: 'webapp',
  }),
    new ESLintPlugin({
      extensions: ['js','scss','css'],
      fix: true,
      outputReport: path.resolve(__dirname, 'report.txt'),
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
        'prettier',
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
        "prettier/prettier": [
          "warn",
          {
            "arrowParens": "avoid",
            "semi": false,
            "trailingComma": "none",
            "endOfLine": "lf",
            "tabWidth": 2,
            "printWidth": 80,
            "useTabs": false
          }
        ],
        "no-console": "warn"
      },
    })
   ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
};