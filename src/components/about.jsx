import React, { Component } from 'react'
// import _ from 'lodash'

export default class About extends Component {
  state = { clicked: false }

  onClick () {
    if (this.state.clicked) { return }

    console.log('clicked')

    // work as expect
    this.setState({ clicked: true })
  }

  render () {
    const text = this.state.clicked ? 'already clicked' : 'click me'
    return (
      <div>
        <button onClick={this.onClick.bind(this)}>{text}</button>
      </div>
    )
  }
}
