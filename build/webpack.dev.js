var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var port = require('./config').port

const resolvePath = _path => {
  return path.resolve(__dirname, _path)
}

const srcPath = resolvePath('../src')

const origin = `http://0.0.0.0:${port}`

var config = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    port: port,
    inline: true,
    hot: true,
    compress: true,
    publicPath: '/',
    contentBase: srcPath,
    disableHostCheck: true,
    historyApiFallback: true,
    quiet: true,
    clientLogLevel: 'none',
    overlay: true,
    stats: 'minimal',
    watchOptions: {
      ignored: [
        resolvePath('../dist'),
        resolvePath('../node_modules')
      ]
    }
  }
})

config.entry.app = [
  'react-hot-loader/patch',
  `webpack-dev-server/client?${origin}`,
  `webpack/hot/dev-server?${origin}`
].concat(baseWebpackConfig.entry.app)

module.exports = config
