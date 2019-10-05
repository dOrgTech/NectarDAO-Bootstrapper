import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Selector from './Selector'
import LockNEC from './LockNEC'
import Airdrop from './Airdrop'
import BidGEN from './BidGEN'

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border);
  border-top: none;
`

const ReputationBoostrapper = () => {
  return (
    <React.Fragment>
      <Selector height="159px" />
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
    </React.Fragment>
  )
}

export default ReputationBoostrapper
