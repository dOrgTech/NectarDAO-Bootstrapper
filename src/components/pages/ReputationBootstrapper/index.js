import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Selector from './Selector'
import LockNEC from './LockNEC'
import Airdrop from './Airdrop'
import BidGEN from './BidGEN'

const ReputationBoostrapper = () => {
  return (
    <React.Fragment>
      <Selector height="159px" />
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
    </React.Fragment>
  )
}

export default ReputationBoostrapper
