import React, { Component } from 'react'
import Search from './Search'

class HomePage extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    //TODO get previous searches
  }

  render() {
    return (
      <div className={'homepage-div'}>
        <Search />
        <div className={'homepage-search-info'}>
          <span>Search for one of the following summoners:</span>
          <span><strong>RIP AP Trist</strong></span>
          <span><strong>Imaqtpie</strong></span>
          <span><strong>qldurtms</strong></span>
        </div>
        <div className={'homepage-about'}>
          <h2>What is LeagueAverages?</h2>
          <span>
            League Averages is a site designed for the game League of Legends. <br />
            League Averages allows you to see your stats averaged by each champion for all games played on that champion.
          </span>
        </div>
      </div>
    )
  }
}

export default HomePage