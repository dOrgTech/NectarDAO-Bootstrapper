import React from 'react'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import 'components/App.scss'
import ReputationBoostrapper from './pages/ReputationBootstrapper'

const App = () => (
  <HashRouter>
    <Switch>
      <Route path="/">
        <ReputationBoostrapper />
      </Route>
    </Switch>
  </HashRouter>
)

export default App
