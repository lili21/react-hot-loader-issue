var path = require('path')
// var webpack = require('webpack')
var eslintFormatter = require('eslint-friendly-formatter')

const resolvePath = _path => {
  return path.resolve(__dirname, _path)
}

const srcPath = resolvePath('../src')

module.exports = {
  entry: { app: ['./src/entry.js'] },

  output: {
    path: resolvePath('../dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@': srcPath
    }
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   include: srcPath,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       loader: 'eslint-loader',
      //       options: {
      //         formatter: eslintFormatter
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: 'babel-loader'
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        include: srcPath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/assets/[name].[hash:6].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
