var spinner = require('ora')('building for production ...')
spinner.start()

var rm = require('rimraf')
var webpack = require('webpack')
var config = require('./webpack.prod')
var chalk = require('chalk')

rm('dist/', err => {
  if (err) throw err
  webpack(config, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
