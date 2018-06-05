import React, { Component } from 'react'

class Compare extends Component {
  constructor() {
    super()
    this.state = {}
  }
  static propTypes = {}
  
  componentDidMount() {
    console.log("IN Compare", this.props.history);
  }

  render() {
    return (<div> hi </div>)
  }
}

export default Compare