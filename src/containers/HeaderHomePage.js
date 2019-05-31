import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return(
      <header className={'header-homepage'}>
        <span className={'logo-span-homepage'}> <Link to={'/'}> LeagueAverages </Link> </span>
        <div className={'background'} style={{backgroundImage:"url('background.jpg')"}} />
      </header>
    )
  }
}

export default Header