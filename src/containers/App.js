import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Main from './Main'
import Header from './Header'
import Cookie from '../components/CookiePolicy'

class App extends Component {
  constructor() {
    super()
    this.state = {
      cookieAccepted: false
    }
    this.onCookieOk = this.onCookieOk.bind(this)
  }
 
  componentDidMount() {
    const cookieStatus = JSON.parse(localStorage.getItem('cookieAccepted'))
    this.setState({cookieAccepted: cookieStatus})
  }

  onCookieOk() {
    this.setState({cookieAccepted: true})
    localStorage.setItem('cookieAccepted', true)
  }

  render() {
    return (
      <div className={'app-div'}>
        <Header />
        <div className={'background'} style={{backgroundImage:"url('background.jpg')"}} />
        <div className={'main-div'}>
          <Main />
          {this.state.cookieAccepted ? null : <Cookie onCookieOk={this.onCookieOk} />}
          <footer>LeagueAverages isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or 
            managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</footer>
        </div>
      </div>
    ) 
  }
}


export default App