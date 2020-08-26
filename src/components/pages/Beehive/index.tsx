import React from 'react'
import { observer, inject } from 'mobx-react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RootStore } from 'stores/Root';
import ConnectWallet from 'components/common/ConnectWallet'
import ConnectMainNet from 'components/common/ConnectMainNet'
import BeehiveHeader from 'components/pages/Beehive/BeehiveHeader'
import { ProviderState } from 'stores/Provider';
import BeehivePanel from './BeehivePanel';

const RootWrapper = styled.div`
  width: 932px;
  margin: 0px auto;
  padding: 64px;
`

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border);
`

@inject('root')
@observer
class Beehive extends React.Component<any, any> {

  renderWidgetWindow() {
    return (
      <Switch>
        <Route exact path="/panel">
          <BeehivePanel />
        </Route>
        <Route exact path="/">
          <Redirect to="/panel" />
        </Route>
      </Switch>
    )
  }

  renderContents() {
    const { providerStore } = this.props.root as RootStore

    if (providerStore.getState() === ProviderState.LOADING) {
      return <ConnectWallet />
    }

    if (providerStore.getState() === ProviderState.ERROR) {
      return <ConnectWallet />
    }

    if (providerStore.getState() === ProviderState.SUCCESS) {
      if (providerStore.providerHasCorrectNetwork()) {
        return this.renderWidgetWindow()
      } else {
        return <ConnectMainNet />
      }
    }
  }

  render() {
    return (
      <>
        <BeehiveHeader/>
        <RootWrapper>
          <SectionWrapper>
            {this.renderContents()}
          </SectionWrapper>
        </RootWrapper>
      </>
    )
  }
}

export default Beehive