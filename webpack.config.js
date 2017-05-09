const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    /*MsgBoard: './src/MsgBoard.js',
    Comment: './src/Comment.js',
    Reply: './src/Reply.js',*/
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        {loader: 'style-loader'},
        {
          loader: 'css-loader',
          options: {
            module: true
          },
        },
      ],
    }, {
      test: /\.png$/,
      loader: 'url-loader'
    }],
  },
};
