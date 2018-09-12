import React, { Component } from 'react'

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
        <h1>Welcome to LeagueAverages!</h1>
        <div>
          <span><strong>Note:</strong> Due to the release of <a href='https://na.leagueoflegends.com/en/news/riot-games/editorial/league-stats' rel='noopener noreferrer' target="_blank">League Stats</a>,
          this project will no longer see development.</span><br />
          <span>Use the search bar above to find a summoner.</span>
          <span><strong>RIP AP Trist</strong> (my account)</span>
          <span><strong>Imaqtpie</strong> (professional streamer)</span>
          <span><strong>qldurtms</strong> (professional player)</span>
          <h2>What is LeagueAverages?</h2>
          <span>League Averages allows you to see your stats averaged by each champion for all games played on that champion.</span>
        </div>
      </div>
    )
  }
}

export default HomePage