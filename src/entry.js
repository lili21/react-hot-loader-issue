import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './index'

// function init() {
//   const App = require('./index').default
//   ReactDOM.render(<App />, document.getElementById('root'))
// }

// if (module.hot) {
//   module.hot.accept('./index', init)
// }

// init()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./index', () => { render(App) })
}