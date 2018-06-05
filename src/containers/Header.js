import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

class Header extends Component {
  render() {
    return(
      <header className={'header'}>
        <span className={'logo-span'}> <Link to={'/'}> LeagueAverages </Link> </span>
        <Search />
      </header>
    )
  }
}

export default Header