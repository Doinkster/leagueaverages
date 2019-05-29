import React, { Component } from 'react'
import HeaderHomePage from './HeaderHomePage'
import HeaderSummonerPage from './HeaderSummonerPage'

class Header extends Component {
  render() {
    return(
      <React.Fragment>
        {window.location.pathname === '/' ? <HeaderHomePage /> : <HeaderSummonerPage />}
      </React.Fragment>
    )
  }
}

export default Header