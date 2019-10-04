import React, { Component } from 'react'
import { Container, Grid, TextField, Button } from '@material-ui/core'
import IconCard from 'components/IconCard'
import * as providerService from 'core/services/providerService'
import * as necRepAllocationService from 'core/services/necRepAllocationService'
import * as contractService from 'core/services/contractService'
import * as minimeTokenService from 'core/services/minimeTokenService'
import * as numberLib from 'core/libs/lib-number-helpers'

class SnapshotView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
      defaultAccount: null,
      provider: null,
      snapshot: {
        currentBlock: '',
        snapshotBlock: '',
        claimStartTime: '',
        claimEndTime: '',
        currentTime: '',
        userSnapshotBalance: '',
        userSnapshotRep: '',
        totalSupplyAtSnapshot: '',
        totalSnapshotRep: '',
        isLoaded: false
      }
    }
  }

  async componentWillMount() {
    const { address } = this.props.match.params
    this.setState({ address })

    const provider = await providerService.getProvider()
    this.setState({ provider })

    const defaultAccount = await providerService.getDefaultAccount(provider)
    this.setState({ defaultAccount })

    const necRepAllocationInstance = await contractService.getNectarRepAllocationAddress()
    const necTokenInstance = await contractService.getNectarTokenAddress()


    const currentBlock = await necRepAllocationService.getCurrentBlock(provider)
    const snapshotBlock = await necRepAllocationService.getSnapshotBlock(provider, necRepAllocationInstance)
    const userSnapshotBalance = await minimeTokenService.balanceOfAt(provider, necTokenInstance, defaultAccount, snapshotBlock)
    const claimStartTime = await necRepAllocationService.getClaimStartTime(provider, necRepAllocationInstance)
    const claimEndTime = await necRepAllocationService.getClaimEndTime(provider, necRepAllocationInstance)
    const currentTime = await necRepAllocationService.getCurrentTime()
    const userSnapshotRep = await necRepAllocationService.getSnapshotRep(provider, necRepAllocationInstance, defaultAccount)
    const totalSupplyAtSnapshot = await minimeTokenService.totalSupplyAt(provider, necTokenInstance, snapshotBlock)
    const totalSnapshotRep = await necRepAllocationService.getTotalReputationReward(provider, necRepAllocationInstance)

    this.setState({
      snapshot: {
        ...this.state.snapshot,
        currentBlock,
        snapshotBlock,
        claimStartTime,
        claimEndTime,
        currentTime,
        userSnapshotBalance: numberLib.toEther(userSnapshotBalance),
        userSnapshotRep,
        totalSupplyAtSnapshot: numberLib.toEther(totalSupplyAtSnapshot),
        totalSnapshotRep,
        isLoaded: true
      }
    })
  }

  render() {
    const { snapshot } = this.state

    if (!snapshot.isLoaded) {
      return <div />
    }

    return (
      // Current block number
      // Snapshot block number
      // Nectar Balance : user's balance at snapshot
      // Reputation balance: balanceOfRep things
      // There are no actions to take!
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <IconCard title="Current Block" text={snapshot.currentBlock} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconCard title="Snapshot Block" text={snapshot.snapshotBlock} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Claiming Start Time" text={snapshot.claimStartTime} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Claiming End Time" text={snapshot.claimEndTime} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Current Time" text={snapshot.currentTime} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconCard title="User Snapshot NEC Balance" text={snapshot.userSnapshotBalance} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconCard title="User REP Allocated" text={snapshot.userSnapshotRep} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconCard title="Total Snapshot NEC Balance" text={snapshot.totalSupplyAtSnapshot} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconCard title="Total REP Allocated" text={snapshot.totalSnapshotRep} />
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default SnapshotView
