import React, { Component } from 'react'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import '../App.scss'
import ReputationBoostrapper from './pages/ReputationBootstrapper'

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <HashRouter history={history}>
        <Switch>
          <Route path="/">
            <ReputationBoostrapper />
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}

export default App
