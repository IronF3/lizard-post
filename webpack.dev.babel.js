const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.babel.js');

module.exports = merge(common, {
    mode: 'development',

    devtool: 'cheap-module-eval-source-map',
  
    resolve: {
      alias: {
        '_srcConfig$': path.resolve(__dirname, 'src', 'config', 'devConfig')
      }
    },

    devServer: {
      port: process.env.PORT || 3000,
      publicPath: '/',
      contentBase: path.resolve(__dirname, 'static'),
      historyApiFallback: true,
      proxy: {}
    }
});
