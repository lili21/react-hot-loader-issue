import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './home'
import Topics from './topics'
import About from './about'
// import Loadable from 'react-loadable'

// const LazyRoute = ({ path, component }) => {
//   const _component = Loadable({
//     loader: () => {
//       return new Promise(resolve => {
//         console.log(component)
//         const bundle = require(`bundle-loader?name=[name]!./${component}.jsx`)
//         // resolve(c)
//         bundle(c => resolve(c.default || c))
//       })
//     },
//     loading: () => <div>Loading&hellop;</div>
//   })

//   return <Route exact path={path} component={_component} />
// }

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="topics">Topics</Link></li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/topics" component={Topics} />
        </div>
      </Router>
    )
  }
}

export default App
