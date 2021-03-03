const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "public")
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase: 'public',
    port: 3000,
    hot: true,
    publicPath: '/js/',
    watchContentBase: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true}
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true}
          }
        ]
      },
    ]
  }
});

