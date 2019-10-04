import React, { Component } from 'react'
import { Container, Grid, Typography, TextField, Button } from '@material-ui/core'
import * as providerService from 'core/services/providerService'
import * as auction4RepService from 'core/services/auction4RepService'
import * as contractService from 'core/services/contractService'
import IconCard from 'components/IconCard'
import AuctionOverviewTable from 'components/AuctionOverviewTable'
import LocksTable from 'components/LocksTable'
import * as erc20Service from 'core/services/erc20Service'
import { styles } from './styles.scss'
import * as numberLib from 'core/libs/lib-number-helpers'

class GenAuctionView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
      provider: null,
      defaultAccount: null,
      auction: {
        userBalance: '',
        currentAuction: '',
        nextAuctionStartTime: '',
        timeUntilNextAuction: '',
        auctionsStartTime: '',
        auctionsEndTime: '',
        redeemEnableTime: '',
        numAuctions: '',
        auctionLength: '',
        auctionReward: '',
        totalRewardLeft: '',
        auctionData: {},
        isLoaded: false
      },
      bidForm: {
        amount: '',
        auctionId: ''
      },
      redeemForm: {
        beneficiary: '',
        auctionId: ''
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

    const genTokenInstance = await contractService.getGenTokenAddress()

    const userBalance = await erc20Service.balanceOf(provider, genTokenInstance, defaultAccount)
    const currentAuction = await auction4RepService.getActiveAuction(provider, defaultAccount)
    const nextAuctionStartTime = await auction4RepService.getNextAuctionStartTime(provider)
    const timeUntilNextAuction = await auction4RepService.getTimeUntilNextAuction(provider)

    const auctionsStartTime = await auction4RepService.getAuctionsStartTime(provider)
    const auctionsEndTime = await auction4RepService.getAuctionsEndTime(provider)
    const redeemEnableTime = await auction4RepService.getRedeemEnableTime(provider)
    const numAuctions = await auction4RepService.getNumAuctions(provider)
    const auctionLength = await auction4RepService.getAuctionLength(provider)
    const auctionReward = await auction4RepService.getAuctionReputationReward(provider)
    const totalRewardLeft = await auction4RepService.getTotalReputationRewardLeft(provider)

    const auctionData = await auction4RepService.getAllAuctionData(provider)

    this.setState({
      auction: {
        ...this.state.auction,
        userBalance,
        currentAuction,
        nextAuctionStartTime,
        timeUntilNextAuction,
        auctionsStartTime,
        auctionsEndTime,
        redeemEnableTime,
        numAuctions,
        auctionLength,
        auctionReward,
        totalRewardLeft,
        auctionData,
        isLoaded: true
      }
    })
  }

  setBidFormProperty = (property, event) => {
    const { bidForm } = this.state
    const newProperty = event.target.value

    bidForm[property] = newProperty

    this.setState({ bidForm })
  }

  setRedeemFormProperty = (property, event) => {
    const { redeemForm } = this.state
    const newProperty = event.target.value

    redeemForm[property] = newProperty

    this.setState({ redeemForm })
  }

  bid = async (event) => {
    const {
      provider, bidForm
    } = this.state

    await auction4RepService.bid(
      provider,
      numberLib.toWei(bidForm.amount),
      bidForm.auctionId
    )
  }

  redeem = async (event) => {
    const {
      provider, redeemForm
    } = this.state

    await auction4RepService.redeem(
      provider,
      redeemForm.beneficiary,
      redeemForm.auctionId
    )
  }

  bidForm() {
    const { bidForm } = this.state

    return (
      <Container>
        <form onSubmit={this.bid}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount"
                type="number"
                value={bidForm.amount}
                onChange={e => this.setBidFormProperty('amount', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Auction #"
                type="number"
                placeholder="0"
                value={bidForm.auctionId}
                onChange={e => this.setBidFormProperty('auctionId', e)}
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

  redeemForm() {
    const { redeemForm } = this.state

    return (
      <Container>
        <form onSubmit={this.redeem}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Beneficiary"
                type="number"
                value={redeemForm.beneficiary}
                onChange={e => this.setRedeemFormProperty('beneficiary', e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Auction #"
                type="number"
                placeholder="0"
                value={redeemForm.auctionId}
                onChange={e => this.setRedeemFormProperty('auctionId', e)}
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

    const auctionInstance = await contractService.getAuction4ReputationAddress()
    const genTokenInstance = await contractService.getGenTokenAddress()

    await erc20Service.grantMaxApproval(
      provider,
      genTokenInstance,
      auctionInstance,
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
    const { defaultAccount, auction } = this.state

    if (!auction.isLoaded) {
      return <div />
    }

    return (

      // Current Auction #
      // Time until next Auction
      // User's GEN balance

      // For each auction: auction# - your bid - total bidf
      // Approve GEN
      // Bid GEN in current auction

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <IconCard title="Current Auction #" text={auction.currentAuction} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Next Auction Start Time" text={auction.nextAuctionStartTime} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Time Until Next Auction" text={auction.timeUntilNextAuction} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <IconCard title="Start Time" text={auction.auctionsStartTime} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <IconCard title="End Time" text={auction.auctionsEndTime} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <IconCard title="Auction Length" text={auction.auctionLength} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <IconCard title="Num Auctions" text={auction.numAuctions} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Redeem Enable Time" text={auction.redeemEnableTime} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Auction Reward" text={auction.auctionReward} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <IconCard title="Total Reward Left" text={auction.totalRewardLeft} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AuctionOverviewTable data={auction.auctionData} user={defaultAccount} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5">
              Approve
            </Typography>
            {this.approveForm()}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5">
              Bid
            </Typography>
            {this.bidForm()}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5">
              Redeem
            </Typography>
            {this.redeemForm()}
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default GenAuctionView
