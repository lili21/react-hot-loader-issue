var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var config = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourcceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  devtool: 'source-map',
  output: {
    filename: 'static/js/[name].[chunkhash:6].js',
    chunkFilename: 'static/js/[name].[chunkhash:6].chunk.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:6].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 5,
        compress: {
          warnings: false
        }
      },
      sourceMap: true
    }),
    // new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      } else {
        // console.log(chunk.toString());
        // return chunk
        //   .mapModules(m => m.context)
        //   .pop()
        //   .split('/')
        //   .pop()
        //   .split('.')[0]
        // console.log(name)
        return 'async-vendor'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendor',
      minChunks: function(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        )
      },
      async: true,
      children: true,
      deepChildren: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
  ]
})

if (process.env.npm_config_report) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
