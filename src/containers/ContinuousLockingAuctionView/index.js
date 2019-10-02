import React, { Component } from "react";
import { Container, Grid, Typography, TextField, Button } from "@material-ui/core";
import * as providerService from "core/services/providerService";
import * as continuousLocking4RepService from "core/services/continuousLocking4RepService"
import * as contractService from "core/services/contractService"
import IconCard from 'components/IconCard'
import AuctionOverviewTable from 'components/AuctionOverviewTable'
import LocksTable from 'components/LocksTable'
import * as erc20Service from "core/services/erc20Service"
import { styles } from "./styles.scss";
import * as numberLib from "core/libs/lib-number-helpers"

class ContinuousLockingAuctionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      lock: {
        userBalance: '',
        userLocks: {},
        lockingPeriods: '',
        activeLockingPeriod: '',
        auctionData: {},
        timeElapsed: '',
        agreementHash: '',
        startTime: '',
        lockingPeriodLength: '',
        isLoaded: false
      },
      lockForm: {
        amount: '',
        duration: '',
        batchId: ''
      },
      extendLockForm: {
        lockId: '',
        durationToExtend: '',
        batchId: ''
      },
      releaseForm: {
        beneficiary: '',
        lockId: ''
      },
    };
  }

  async componentWillMount() {
    const { address } = this.props.match.params
    this.setState({ address })

    const provider = await providerService.getProvider()
    this.setState({ provider })

    const defaultAccount = await providerService.getDefaultAccount(provider)
    this.setState({ defaultAccount })

    const locking4RepInstance = await contractService.getContinuousLocking4ReputationAddress()
    const necTokenInstance = await contractService.getNectarTokenAddress()

    const userBalance = await erc20Service.balanceOf(provider, necTokenInstance, defaultAccount)
    const agreementHash = await continuousLocking4RepService.getAgreementHash(provider, locking4RepInstance)
    const userLocks = await continuousLocking4RepService.getUserTokenLocks(provider, locking4RepInstance, defaultAccount)
    const lockingPeriods = await continuousLocking4RepService.getNumLockingPeriods(provider, locking4RepInstance)
    const activeLockingPeriod = await continuousLocking4RepService.getActiveLockingPeriod(provider, locking4RepInstance)
    const startTime = await continuousLocking4RepService.getStartTime(provider, locking4RepInstance)
    const lockingPeriodLength = await continuousLocking4RepService.getLockingPeriodLength(provider, locking4RepInstance)
    // const auctionData = await continuousLocking4RepService.getAuctionData(provider, locking4RepInstance)
    const timeElapsed = await continuousLocking4RepService.getTimeElapsed(provider, locking4RepInstance)

    this.setState({
      lock: {
        ...this.state.lock,
        userBalance: numberLib.toEther(userBalance),
        userLocks,
        lockingPeriods,
        activeLockingPeriod,
        agreementHash,
        startTime,
        lockingPeriodLength,
        // auctionData,
        timeElapsed,
        isLoaded: true
      }
    })
  }

  setLockFormProperty = (property, event) => {
    const { lockForm } = this.state
    const newProperty = event.target.value

    lockForm[property] = newProperty

    this.setState({ lockForm })
  }

  lock = async (event) => {
    const {
      provider, address, lockForm
    } = this.state

    const locking4RepInstance = await contractService.getContinuousLocking4ReputationAddress()

    await continuousLocking4RepService.lock(
      provider,
      locking4RepInstance,
      numberLib.toWei(lockForm.amount),
      lockForm.duration,
      lockForm.batchId
    )
  }

  lockForm() {
    const { lockForm } = this.state

    return (
      <Container>
        <form onSubmit={this.lock}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Amount"
                type="number"
                value={lockForm.amount}
                onChange={e => this.setLockFormProperty('amount', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Duration"
                type="number"
                placeholder="0"
                value={lockForm.duration}
                onChange={e => this.setLockFormProperty('duration', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="BatchId"
                type="number"
                placeholder="0"
                value={lockForm.batchId}
                onChange={e => this.setLockFormProperty('batchId', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }

  setExtendLockFormProperty = (property, event) => {
    const { extendLockForm } = this.state
    const newProperty = event.target.value

    extendLockForm[property] = newProperty

    this.setState({ extendLockForm })
  }

  extendLock = async (event) => {
    const {
      provider, extendLockForm
    } = this.state

    const locking4RepInstance = await contractService.getContinuousLocking4ReputationAddress()

    await continuousLocking4RepService.extendLock(
      provider,
      locking4RepInstance,
      extendLockForm.lockId,
      extendLockForm.durationToExtend,
      extendLockForm.batchId
    )
  }

  extendLockForm() {
    const { extendLockForm } = this.state

    return (
      <Container>
        <form onSubmit={this.extendLock}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="LockId"
                type="number"
                value={extendLockForm.lockId}
                onChange={e => this.setExtendLockFormProperty('lockId', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Duration To Extend"
                type="number"
                placeholder="0"
                value={extendLockForm.durationToExtend}
                onChange={e => this.setExtendLockFormProperty('durationToExtend', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="BatchId"
                type="number"
                placeholder="0"
                value={extendLockForm.batchId}
                onChange={e => this.setExtendLockFormProperty('batchId', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }

  setReleaseFormProperty = (property, event) => {
    const { extendLockForm } = this.state
    const newProperty = event.target.value

    extendLockForm[property] = newProperty

    this.setState({ extendLockForm })
  }

  release = async (event) => {
    const {
      provider, releaseForm
    } = this.state

    const locking4RepInstance = await contractService.getContinuousLocking4ReputationAddress()

    await continuousLocking4RepService.release(
      provider,
      locking4RepInstance,
      releaseForm.beneficiary,
      releaseForm.lockId,
    )
  }

  releaseForm() {
    const { releaseForm } = this.state

    return (
      <Container>
        <form onSubmit={this.release}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Beneficiary"
                value={releaseForm.beneficiary}
                onChange={e => this.setReleaseFormProperty('beneficiary', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="LockId"
                type="number"
                placeholder="0"
                value={releaseForm.lockId}
                onChange={e => this.setReleaseFormProperty('lockId', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }

  approvalUnlock = async (event) => {
    const {
      provider
    } = this.state

    const locking4RepInstance = await contractService.getContinuousLocking4ReputationAddress()
    const necTokenInstance = await contractService.getNectarTokenAddress()

    await erc20Service.grantMaxApproval(
      provider,
      necTokenInstance,
      locking4RepInstance,
    )
  }

  approveForm() {
    return (
      <Container>
        <form onSubmit={this.approvalUnlock}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                variant="contained"
              >
                Approval Unlock
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }

  render() {
    const { lock } = this.state;

    if (!lock.isLoaded) {
      return <div />
    }

    return (

      // Current Period
      // User's NEC balance
      // All the user's locks table
      // period Locked in - lockID - amount - duration

      // Total Locked in each period table

      // Lock Form
      // Extend Form
      // Release Form


      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <IconCard title="Active Locking Period" text={lock.activeLockingPeriod} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Time Elapsed" text={lock.timeElapsed} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Total Locking Periods" text={lock.lockingPeriods} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="User NEC Balance" text={lock.userBalance} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Start Time" text={lock.startTime} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Locking Period Length" text={lock.lockingPeriodLength} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <LocksTable data={lock.userLocks} />
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* <AuctionOverviewTable data={lock.auctionData} /> */}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5">Approval Unlock</Typography>
            {this.approveForm()}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5">Lock</Typography>
            {this.lockForm()}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5">Extend Lock</Typography>
            {this.extendLockForm()}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5">Release</Typography>
            {this.releaseForm()}
          </Grid>
        </Grid >
      </Container >
    );
  }
}



export default ContinuousLockingAuctionView
