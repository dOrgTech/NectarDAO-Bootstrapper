import React from 'react'
import { observer, inject } from 'mobx-react'
import { Switch, Route } from 'react-router-dom'
import * as log from 'loglevel';
import styled from 'styled-components'
import Selector from './Selector'
import LockNEC from './LockNEC'
import Airdrop from './Airdrop'
import BidGEN from './BidGEN'
import { RootStore } from 'stores/Root';

const check = {
  defaultAccount: '[Check] Default Account'
}

const RootWrapper = styled.div`
  width:100%;
  max-width: 932px;
  min-width: 932px;
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
  async componentDidMount() {
    const { providerStore } = this.props.root as RootStore
    log.debug(check.defaultAccount, providerStore.getDefaultAccount())
    if (!providerStore.getDefaultAccount()) {
      await providerStore.setWeb3WebClient()
      log.debug(check.defaultAccount, providerStore.getDefaultAccount())
    }
  }

  render() {
    const { providerStore } = this.props.root as RootStore

    if (!providerStore.defaultAccount) {
      return <div>Loading Provider...</div>
    }

    return (
      <RootWrapper>
        <Selector height="196px" />
        <SectionWrapper>
          <Switch>
            <Route exact path="/lock-nec">
              <LockNEC />
            </Route>
            <Route exact path="/airdrop">
              <Airdrop />
            </Route>
            <Route exact path="/bid-gen">
              <BidGEN />
            </Route>
          </Switch>
        </SectionWrapper>
      </RootWrapper>
    )
  }
}

export default ReputationBoostrapper
