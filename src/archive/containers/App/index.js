import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'
import theme from 'configs/theme/config-theme'
import LogView from 'containers/LogView'
import ContinuousLockingAuctionView from 'containers/ContinuousLockingAuctionView'
import SnapshotView from 'containers/SnapshotView'
import GenAuctionView from 'containers/GenAuctionView'
import Header from './components/Header'
import Footer from './components/Footer'
import Notification from './components/Notification'

import './styles.scss' // global styles

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <div>
            <Header />
            <Footer />
            <Notification />
            <div className="app-shell">
              <Switch>
                <Route path="/lock/" component={ContinuousLockingAuctionView} />
                <Route path="/snapshot/" component={SnapshotView} />
                <Route path="/auction/" component={GenAuctionView} />
                <Route path="/logs/" component={LogView} />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
