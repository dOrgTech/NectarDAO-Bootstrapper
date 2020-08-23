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
import Beehive from './pages/Beehive'
import BigHeader from './pages/ReputationBootstrapper/BigHeader'

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
              <Route path="/connect">
                <BigHeader/>
              </Route>
              <Route path="/">
                <ReputationBoostrapper />
              </Route>
             
            </Switch>
          </div>
        </Web3Manager>
      </HashRouter>
    )
  }

}

export default App