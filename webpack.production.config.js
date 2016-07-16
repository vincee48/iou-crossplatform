'use strict';

const path = require('path');
const webpack = require('webpack');
const del = require('del');
const ExtractText = require('extract-text-webpack-plugin');

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply() {
    del.sync(this.options.files);
  }
}

module.exports = {
  entry: './src/web/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.min.js',
    publicPath: '/',
  },
  plugins: [
    new CleanPlugin({
      files: ['dist/*'],
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new ExtractText('style.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query: {
          plugins: [
            ['transform-object-assign'],
            ['transform-decorators-legacy'],
          ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractText.extract({
          notExtractLoader: 'style',
          loader: 'css?modules&localIdentName=[name]_[local]_[hash:base64:3]!postcss?parser=postcss-scss',
        }),
      },
    ],
  },
  postcss: function () {
    return [
      require('precss'),
      require('postcss-selector-not')(),
      require('autoprefixer')({
        browsers: [
          'last 2 Chrome versions',
          'Explorer >= 10',
          'last 2 Firefox versions',
          'Safari >= 8',
        ],
      }),
    ];
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
};
