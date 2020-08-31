import React from 'react'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import 'components/App.scss'
import ReputationBoostrapper from 'components/pages/ReputationBootstrapper'
import Web3Manager from 'components/shell/Web3Manager'
import HomePage from './pages/HomePage'
import Beehive from './pages/Beehive'
import BeehiveGuide from './pages/Beehive/BeehiveGuide'
// window.ethereum.on('accountsChanged', async (accounts) => {
//   window.location.reload()
// })

@inject('root')
@observer
class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Web3Manager>
          <div className="app-shell">
            <Switch>
              <Route path="/beehive">
                <Beehive />
              </Route>
              <Route path="/lock-nec">
                <ReputationBoostrapper />
              </Route>
              <Route path="/beehive-guide">
                <BeehiveGuide />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </Web3Manager>
      </HashRouter>
    )
  }

}

export default App