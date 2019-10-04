import React, { Component } from 'react'
import {
  HashRouter
} from 'react-router-dom'
import '../App.scss'
import Header from './shell/Header'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />
      </HashRouter>
    )
  }
}

export default App
