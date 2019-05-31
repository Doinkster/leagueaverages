'use strict'

import 'normalize.css'
import css from './app.css'
import React from "react"
import { render } from "react-dom"
import App from './containers/App'
import ErrorBoundary from './containers/ErrorBoundary'
import { BrowserRouter } from 'react-router-dom'
import 'babel-polyfill'
import 'whatwg-fetch'

render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById("root")
);