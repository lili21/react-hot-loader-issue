import React, { Component } from 'react'

export default class Home extends Component {
  state = { clicked: false }
  
  onClick = () => {
    if (this.state.clicked) { return }

    console.log('clicked')

    // doesn't work
    this.setState({ clicked: true })
  }

  render () {
    const text = this.state.clicked ? 'already clicked' : 'click me'
    return (
      <div>
        <button onClick={this.onClick}>{text}</button>
      </div>
    )
  }
}
