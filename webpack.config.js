const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/web/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: path.join(__dirname, 'src'),
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: [
          ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              // If you use React Native, pass 'react-native' instead:
              imports: ['react'],
              // This is important for Webpack HMR:
              locals: ['module'],
            }],
          }],
          ['transform-object-assign'],
          ['transform-decorators-legacy'],
        ],
      },
    }],
  },
};
