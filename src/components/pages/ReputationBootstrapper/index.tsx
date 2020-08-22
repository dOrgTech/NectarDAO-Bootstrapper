import React from 'react'
import { observer, inject } from 'mobx-react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Selector from './Selector'
import LockNEC from './LockNEC'
import Airdrop from './Airdrop'
import BidGEN from './BidGEN'
import { RootStore } from 'stores/Root';
import ConnectWallet from 'components/common/ConnectWallet'
import ConnectMainNet from 'components/common/ConnectMainNet'
import { ProviderState } from 'stores/Provider';
import BigHeader from './BigHeader'
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
  border-top: none;
`

@inject('root')
@observer
class ReputationBoostrapper extends React.Component<any, any> {

  renderWidgetWindow() {
    return (
      <Switch>
        <Route exact path="/lock-nec">
          <LockNEC />
        </Route>
        <Route exact path="/connect">
          <BigHeader />
        </Route>
        <Route exact path="/airdrop">
          <Airdrop />
        </Route>
        <Route exact path="/bid-gen">
          <BidGEN />
        </Route>
        <Route exact path="/">
          <Redirect to="/lock-nec" />
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
      <RootWrapper>
        <Selector height="196px" />
        <SectionWrapper>
          {this.renderContents()}
        </SectionWrapper>
      </RootWrapper>
    )
  }
}

export default ReputationBoostrapper
