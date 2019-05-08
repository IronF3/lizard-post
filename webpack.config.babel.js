const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname,'src'),
  entry: './bundle.js',

  output: {
    path: path.resolve(__dirname, 'static'),
    publicPath: '/',
    filename: 'bundle.min.js'
  },

  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],

    alias: {
      '_srcCommon': path.resolve(__dirname, 'src', 'common'),
      '_srcConfig$': isProduction ? path.resolve(__dirname, 'src', 'config', 'prodConfig') : path.resolve(__dirname, 'src', 'config', 'devConfig'),
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
      'process': JSON.stringify({
        browser: true,
        env: {
          NODE_ENV: process.env.NODE_ENV
        }
      }),
      '__DEV__': isProduction ? 'true' : 'false'
    })
  ]),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 3000,
    publicPath: '/',
    contentBase: './static',
    historyApiFallback: true,
    proxy: {}
  }
};
