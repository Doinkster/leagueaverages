import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Summoner from './Summoner'

const Main = () => (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/:sumName' component={Summoner} />
      <Route component={HomePage} />
    </Switch>
)

export default Main