// TODO:
// <Notifications
//   <Header />
//   <InitDialog onInitialized={setInitialized} />
//   {initialized ?
//     <ReputationBootstrap /> :
//     <></>
//   }
// </Notifications>

import React, { Component } from 'react'
import {
  HashRouter
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          hello world
        </div>
      </HashRouter>
    )
  }
}

export default App
