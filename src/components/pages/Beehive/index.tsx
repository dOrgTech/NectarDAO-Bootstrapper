import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import BeehiveHome from './BeehiveHome'

@inject('root')
@observer
class Beehive extends React.Component<any, any> {
  render() {
    return (
      <BeehiveHome/>
    )
  }
}

export default Beehive