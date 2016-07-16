const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
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
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query: {
          plugins: [
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                // If you use React Native, pass 'react-native' instead:
                imports: ['react'],
                locals: ['module'],
              }],
            }],
            ['transform-object-assign'],
            ['transform-decorators-legacy'],
          ],
        },
      },
      {
        test: /\.css$/,
        loader: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss?parser=postcss-scss'
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
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
