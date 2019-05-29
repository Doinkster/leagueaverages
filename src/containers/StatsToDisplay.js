import React, { Component } from 'react'
import DisplayButton from '../components/ButtonForStatsDisplay'

class StatsToDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
    }
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  static propTypes = {}

  componentDidMount() {
  }

  onButtonClick(e) {
    e.preventDefault()
    const statName = e.target.className
    this.props.toggleButton(statName)
  }

  render() {
    let buttons = []
    for(const key in this.props.toggledStats) {
      buttons.push(key)
    }
    
    buttons = buttons.map(keyName => {
      let camelCaseToSentenceCase = this.props.camelCaseStats[keyName].replace( /([A-Z])/g, " $1" );
      camelCaseToSentenceCase = camelCaseToSentenceCase.charAt(0).toUpperCase() + camelCaseToSentenceCase.slice(1)
      return (
        <div key={keyName} className={keyName} onClick={this.onButtonClick.bind(this)}>
          <DisplayButton button={keyName} color={this.props.toggledStats[keyName]} />
          <span className={keyName}>
              {camelCaseToSentenceCase}
          </span>
        </div>
      )
    })
    
    return (
      <div className={'stats-to-display-box'}>
        {/*<span id={'stats-to-display-span'}> Select stat: </span>*/}
        {buttons}
      </div>
    )
  }
}

export default StatsToDisplay