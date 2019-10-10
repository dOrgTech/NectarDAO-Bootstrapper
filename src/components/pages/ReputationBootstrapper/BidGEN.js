import React from 'react'
import styled from 'styled-components'
import Table from 'components/common/Table'
import TimelineProgress from 'components/common/TimelineProgress'
import EnableTokenPanel from 'components/common/panels/EnableTokenPanel'
import BidPanel from 'components/common/panels/BidPanel'
import LogoAndText from 'components/common/LogoAndText'
import { toEther } from 'core/libs/lib-number-helpers'
// TODO: change to GEN
import icon from 'assets/svgs/ethfinex-logo.svg'
import * as contractService from 'core/services/contractService'
import * as providerService from 'core/services/providerService'
import * as erc20Service from 'core/services/erc20Service'
import * as auctionService from 'core/services/auction4RepService'
import * as numberUtils from 'core/libs/lib-number-helpers'
import { max } from 'date-fns'

const BidGENWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 500px;Screenshot from 2019-10-08 23-01-15
`

const DetailsWrapper = styled.div`
  width: 80%;
  border-right: 1px solid var(--border);
`

const TableHeaderWrapper = styled.div`
  height: 103px
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 24px;
  border-bottom: 1px solid var(--border);
`
const ActionsWrapper = styled.div`
  width: 425px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
`
const ActionsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  margin: 0px 24px;
  color: var(--white-text);
  border-bottom: 1px solid var(--border);
`

const BidGEN = () => {
  const [currentAuction, setCurrentAuction] = React.useState(0)
  const [maxAuction, setMaxAuction] = React.useState(0)
  const [auctionPercentage, setAuctionPercentage] = React.useState(0)
  const [auctionTimer, setAuctionTimer] = React.useState('...')
  const [auctionData, setAuctionData] = React.useState([])
  const [tokenApproved, setTokenApproved] = React.useState(false)
  const [genBalance, setGenBalance] = React.useState('...')
  const [genBalanceDisplay, setGenBalanceDisplay] = React.useState('...')

  React.useEffect(() => {
    const fetch = async () => {
      const provider = await providerService.getProvider()
      const defaultAccount = await providerService.getDefaultAccount(provider)

      // Max Auctions
      const maxAuction = await auctionService.getNumAuctions(provider)
      setMaxAuction(maxAuction)

      // Current Auction
      const currentAuction = await auctionService.getActiveAuction(provider)
      setCurrentAuction(currentAuction)

      // Auction Percentage & Auction Timer
      const auctionLength = await auctionService.getAuctionLength(provider)
      const nextStartTime = await auctionService.getNextAuctionStartTime(provider)
      const timeTillNextAuction = await auctionService.getTimeUntilNextAuction(provider)

      const now = Date.now()

      let prefix = 'Next starts in'
      let ended = false

      if (currentAuction === maxAuction) {
        if (Date.now() > nextStartTime) {
          setAuctionPercentage(100)
          setAuctionTimer('Auctions have ended')
          ended = true
        } else {
          prefix = 'Last auction ends in'
        }
      }

      if (!ended) {
        setAuctionPercentage((timeTillNextAuction / auctionLength) * 100)

        const seconds = timeTillNextAuction / 1000
        let hours = (seconds / 60) / 60
        // const days = Math.fround(hours / 24)
        // hours -= days * 24
        // hours = Math.fround(hours)
        setAuctionTimer(`${prefix}, ${timeTillNextAuction} time units`)
      }

      // Auction Data
      const data = await auctionService.getAllAuctionData(provider)

      setAuctionData(data.map((auction, index) => {
        const userBid = auction.bids[defaultAccount] ? auction.bids[defaultAccount] : '0'
        const totalBid = auction.totalBids ? auction.totalBids : '0'

        return {
          id: Number(index) + 1,
          userBid: `${toEther(userBid)} GEN`,
          totalBid: `${toEther(totalBid)} GEN`,
          status: auction.status
        }
      }).reverse())

      // GEN Balance
      const genTokenInstance = await contractService.getGenTokenAddress()
      const currUserBalance = await erc20Service.balanceOf(provider, genTokenInstance, defaultAccount)
      setGenBalance(`${currUserBalance} GEN`)
      setGenBalanceDisplay(`${numberUtils.toEther(currUserBalance)} GEN`)
    }
    fetch()
  }, [])

  const SidePanel = () => (
    <React.Fragment>
      {tokenApproved === false ?
        <EnableTokenPanel
          instruction="Enable GEN to bid on Auctions"
          subinstructions="-"
          buttonText="Enable GEN"
          onEnable={() => setTokenApproved(true)}
          getToken={() =>
            contractService.getGenTokenAddress()
          }
          getSpender={() =>
            contractService.getAuction4ReputationAddress()
          }
        /> :
        <div>
          <BidPanel
            currentAuction={currentAuction}
            setCurrentAuction={setCurrentAuction}
            instruction="Enable NEC for locking"
            subinstruction="-"
            buttonText="Bid GEN"
            onEnable={() => setTokenApproved(true)}
            getToken={() =>
              contractService.getGenTokenAddress()
            }
            getSpender={() =>
              contractService.getAuction4ReputationAddress()
            }
          />
        </div>
      }
    </React.Fragment>
  )

  return (
    <BidGENWrapper>
      <DetailsWrapper>
        <TableHeaderWrapper>
          <TimelineProgress
            value={auctionPercentage}
            title={`Current Auction: ${currentAuction} of ${maxAuction}`}
            subtitle={auctionTimer}
            width="28px"
            height="28px"
          />
        </TableHeaderWrapper>
        <Table
          highlightTopRow
          columns={[
            { name: 'Auction #', key: 'id', width: '15%', align: 'left' },
            { name: 'You Have Bid', key: 'userBid', width: '25%', align: 'right' },
            { name: 'Total Bid', key: 'totalBid', width: '30%', align: 'right' },
            { name: 'Status', key: 'status', width: '25%', align: 'right' }
          ]}
          data={auctionData}
        />
      </DetailsWrapper>
      <ActionsWrapper>
        <ActionsHeader>
          <LogoAndText icon={icon} text="GEN" />
          <div>{genBalanceDisplay}</div>
        </ActionsHeader>
        <SidePanel />
      </ActionsWrapper>
    </BidGENWrapper>
  )
}

export default BidGEN
