import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

class Header extends Component {
  render() {
    return(
      <header className={'header-summonerpage'}>
        <span className={'logo-span-summonerpage'}> <Link to={'/'}> LeagueAverages </Link> </span>
        <Search />
      </header>
    )
  }
}

export default Header;