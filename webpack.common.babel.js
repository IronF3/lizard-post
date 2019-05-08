const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname,'src'),

  entry: {
    app: path.resolve(__dirname, 'src', 'bundle.js'),
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'static'),
  },

  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],

    alias: {
      '_srcCommon': path.resolve(__dirname, 'src', 'common'),
      '_srcMainPage': path.resolve(__dirname, 'src', 'mainPage')
    }
  },

  module: {
    rules: [
      { 
        test: /\.jsx?$/,
        exclude: /src\//,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\/json$/,
        use: ['json-loader']
      },
      {
        test: /\.(xml|html|txt|md)$/,
        use: ['raw-loader']
      }
    ]
  },

  plugins: ([
    new webpack.DefinePlugin({
      'process.browser': JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/node_vendors~app.bundle.js',
        '**/bundle.min.css',
        '**/app.bundle.js',
        '**/bundle.min.js.map*'
      ],
      cleanAfterEveryBuildPatterns: [
        '**/node_vendors~app.bundle.js',
        '**/bundle.min.css',
        '**/app.bundle.js',
        '**/bundle.min.js.map*'
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Lizard Post'
    })
  ]),

  stats: {
    colors: true
  },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  }
};
