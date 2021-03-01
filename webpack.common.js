const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

plugins: [
  
]

module.exports = {
  entry: {
    body: './src/js/body.js',
    head: './src/js/head.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, '_site/js/')
  },
  plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'Output Management'
     })
     new FaviconsWebpackPlugin({
      logo: './src/img/favicon.svg',
      mode: 'webapp',
  })
   ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};