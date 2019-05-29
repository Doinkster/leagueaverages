import React from 'react'
import { Link } from 'react-router-dom'

const PreviousSummoners = (props) => {
  const prevSearches = []
  for(let i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i) !== 'length') {
      if(localStorage.key(i) !== 'cookieAccepted') {
        prevSearches.push(localStorage.key(i)) 
      }
    }
    if(prevSearches.length === 4) {
      break
    }
  }
  const prevSums = prevSearches.map((summoner) =>
    <Link to={`/${summoner}`} key={summoner}>
      <li className={'prev-search-list-item'}><span className={'prev-search-span'}>{summoner}</span><br /></li>
    </Link>
  )
  return (
    <div className="search-dropdown-content" style={{display: props.showPrev}}>
      <ul className={props.showPrev ? '' : 'hidden'} onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp}>
        {prevSums}
      </ul>
    </div>
  )
}

export default PreviousSummoners