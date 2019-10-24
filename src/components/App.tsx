import React from 'react'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import 'components/App.scss'
import ReputationBoostrapper from 'components/pages/ReputationBootstrapper'

// window.ethereum.on('accountsChanged', async (accounts) => {
//   window.location.reload()
// })

@inject('root')
@observer
class App extends React.Component<any, any>{
  render() {
    return (
      <HashRouter>
        <div className="app-shell">
          <Switch>
            <Route path="/">
              <ReputationBoostrapper />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    )
  }

}

export default App
