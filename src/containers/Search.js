import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreviousSummoners from '../components/PreviousSummoners'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router'

class Search extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showPrev: 'none',
      counter: 0,
      keepMenuOpen: false,
      currentTypedName: 'Search for a summoner',
      blankSummonerError: false
    }
    this.onMenuClick = this.onMenuClick.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.submitSummoner = this.submitSummoner.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    prevSearches: PropTypes.array
  }

  componentDidMount()  {
  }

  componentWillUnmount() {

  }

  onMenuClick() {
    if(this.state.currentTypedName === 'Search for a summoner' || this.state.currentTypedName === 'Name can\'t be blank!') {
      this.setState({currentTypedName:''})
    }
    this.setState({showPrev: 'block'})
  }

  onMouseDown(e) {
    this.setState({keepMenuOpen: true})
  }

  onMouseUp(e) {
    this.setState({showPrev : 'none'})
  }

  onBlur(e) {
    e.preventDefault()
    if(!this.state.keepMenuOpen) {
      this.setState({showPrev : 'none'})
    }
    if(this.state.currentTypedName === '' || this.state.currentTypedName === 'Name can\'t be blank!') {
      this.setState({currentTypedName: 'Search for a summoner'})
    }
    this.setState({keepMenuOpen: false})
  }

  submitSummoner(e) {
    e.preventDefault()
    const path = `/${this.state.currentTypedName}`
    if(path === '/') {
      this.setState({blankSummonerError: true, currentTypedName: 'Name can\'t be blank!'})
    } else {
      this.setState({currentTypedName:'', showPrev: 'none'})
      this.props.history.push(path)
    }
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({currentTypedName: e.target.value, blankSummonerError: false})
  }

  render() {
    const { blankSummonerError } = this.state

    return (
      <div className="search-dropdown-box">
        <form acceptCharset="UTF-8" onBlur={this.onBlur} onSubmit={this.submitSummoner}>
          <input type="text" value={this.state.currentTypedName} onClick={this.onMenuClick} onChange={this.handleChange}/>
          <PreviousSummoners showPrev={this.state.showPrev} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}/>
        </form>
      </div>
    )
  }
}

export default withRouter(Search)