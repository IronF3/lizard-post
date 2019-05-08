const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.babel.js');

module.exports = merge(common, {
    mode: 'production',

    devtool: 'source-map',

    resolve: {
      alias: {  
        '_srcConfig$': path.resolve(__dirname, 'src', 'config', 'prodConfig')
      }
    },

    optimization: {
      minimizer: [new UglifyJsPlugin()],
      splitChunks: {
        cacheGroups: {
          node_vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 1
          }
        }
      }
    }
});
