const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, '_site/js/')
  }
};