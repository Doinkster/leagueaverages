'use strict'

import 'normalize.css'
import css from './app.css'
import React from "react"
import { render } from "react-dom"
import App from './containers/App'
import ErrorBoundary from './containers/ErrorBoundary'
import { BrowserRouter } from 'react-router-dom'
//TODO: NEED THESE?
import 'core-js/es6/map'
import 'core-js/es6/set'
import 'babel-polyfill'
import 'whatwg-fetch'

//TODO: NEED THIS?
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
}

render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById("root")
)