const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

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
  })
   ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};