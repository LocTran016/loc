const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    mode: "production",
    output: {
      filename: "[name].min.js",
      path: path.resolve(__dirname, "public")
    },
    plugins: [
      new HtmlWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            'css-loader',
            'sass-loader'
          ]
        },
        { test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "ie 11" }]
            ],
            plugins: [
              "@babel/plugin-transform-function-name",
              "@babel/plugin-transform-arrow-functions"
            ],
          }
        }}
      ]
    }
  });
  