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
        <h1 className={'homepage-header'}>Welcome to LeagueAverages!</h1>
        <Search />
        <div className={'homepage-subheader-div'}>
          <div className={'homepage-search-info'}>
            <span>Use the search bar above to find a summoner.</span>
            <span><strong>RIP AP Trist</strong> (my account)</span>
            <span><strong>Imaqtpie</strong> (professional streamer)</span>
            <span><strong>qldurtms</strong> (professional player)</span>
          </div>
          <div className={'homepage-about'}>
            <h2>What is LeagueAverages?</h2>
            <span>
              League Averages is a site designed for the game League of Legends. <br />
              League Averages allows you to see your stats averaged by each champion for all games played on that champion.
            </span>
          </div>
          {/*<span><strong>Note:</strong> Due to the release of <a href='https://na.leagueoflegends.com/en/news/riot-games/editorial/league-stats'>League Stats</a>,
          this project will no longer see development.</span>*/}
        </div>
      </div>
    )
  }
}

export default HomePage