import React, { Component } from 'react'
import {
  HashRouter
} from 'react-router-dom'
import '../App.scss'
import ReputationBoostrapper from './pages/ReputationBootstrapper'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <ReputationBoostrapper />
      </HashRouter>
    )
  }
}

export default App
