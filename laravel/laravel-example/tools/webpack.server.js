var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var deepmerge = require('deepmerge');
var webpackCommonConfig = require('./webpack.common');

var output = { filename: 'public/js/server.js' };

var loaders = webpackCommonConfig.module.loaders.concat();
loaders.push({ test: /\.scss$/, loader: 'null' });

delete webpackCommonConfig.module;

module.exports = deepmerge({
  entry: [
    './src/main.js'
  ],
  output: output,
  target: 'node',
  module: {
    loaders: loaders
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: false, __DEV__: true, "process.env.NODE_ENV": '"'+process.env.NODE_ENV+'"'}),
    new webpack.IgnorePlugin(/vertx/)
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}, webpackCommonConfig);
