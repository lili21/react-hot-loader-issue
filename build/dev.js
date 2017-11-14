var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var chalk = require('chalk')
var ip = require('ip')
var config = require('./webpack.dev')
var port = require('./config').port
var compiler = webpack(config)

compiler.plugin('done', stats => {
  var serverAddr = `http://localhost:${chalk.bold(port)}`
  var localIpAddr = `http://${ip.address()}:${chalk.bold(port)}`

  // clearConsole()
  if (stats.hasErrors()) {
    process.stdout.write(chalk.red('Build failed!\n\n'))
  } else {
    process.stdout.write(chalk.green('Compiled successfully!\n\n'))
    process.stdout.write('You can view the application in browser.\n\n')
    process.stdout.write(`${chalk.bold('Local:')}             ${serverAddr}\n`)
    process.stdout.write(`${chalk.bold('On Your Network:')}   ${localIpAddr}\n`)
  }
})

var server = new WebpackDevServer(compiler, config.devServer)
server.listen(port)

function clearConsole () {
  process.stdout.write('\x1B[2J\x1B[3J\x1B[H')
}
