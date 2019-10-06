// TODO:
/*
<div flow horizontally>
  <div 70% width flow vertically>
    <div 200px height>
      <TimelineProgress
        topText={'Current Auction: ${getCurrentAuction()} of ${getTotalAuctions()}'}
        bottomText={'Next starts in ${format(getAuctionTimeLeft())}'}
      />
    </div>
    <Table
      columns={[
        'Auction #',
        'You Have Bid',
        'Total Bid',
        'Status'
      ]}
      data={allAuctions()}
    />
  </div>
  <div flow vertically>
    <Icon svg={gen.svg} />
    <Text>Gen Token</Text>
    <Text>${genBalance} GEN</Text>
    <divider />
    ...
  </div>
</div>
*/

import React from 'react'
import styled from 'styled-components'
import TimelineProgress from 'components/common/TimelineProgress'
import Updater from 'components/common/Updater'
import Table from 'components/common/Table'
import { toEther } from 'core/libs/lib-number-helpers'
import * as providerService from 'core/services/providerService'
import * as auctionService from 'core/services/auction4RepService'

const BidGENWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 500px;
`

const DetailsWrapper = styled.div`
  width: 80%;
`

const TableHeaderWrapper = styled.div`
  height: 103px
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid var(--border);
  border-top: none;
  border-left: none;
  padding: 0px 24px;
`

const ActionsWrapper = styled.div`
  height: 100%;
  width: 425px;
  border: 1px solid var(--border);
  border-top: none;
  border-right: none;
  border-bottom: none;
`

const BidGEN = () => {
  const [currentAuction, setCurrentAuction] = React.useState(0)
  const [maxAuction, setMaxAuction] = React.useState(0)
  const [auctionPercentage, setAuctionPercentage] = React.useState(0)
  const [auctionTimer, setAuctionTimer] = React.useState('...')
  const [auctionData, setAuctionData] = React.useState([])

  const UpdateLoop = () => (
    <Updater
      ms={3000}
      fn={async () => {
        const provider = await providerService.getProvider()
        const defaultAccount = await providerService.getDefaultAccount(provider)

        // Max Auctions
        setMaxAuction(await auctionService.getNumAuctions(provider))

        // Current Auction
        setCurrentAuction(await auctionService.getActiveAuction(provider))

        // Auction Percentage & Auction Timer
        const auctionLength = await auctionService.getAuctionLength(provider)
        const startTime = await auctionService.getNextAuctionStartTime(provider)
        const now = Date.now()

        let prefix = 'Next starts in'

        if (maxAuction === currentAuction) {
          if (Date.now() > startTime) {
            setAuctionPercentage(100)
            setAuctionTimer('Auctions have ended')
            return
          }
            prefix = 'Last auction ends in'
        }

        setAuctionPercentage(((startTime - now) / auctionLength) * 100)

        const seconds = (startTime - now) / 1000
        let hours = (seconds / 60) / 60
        const days = Math.fround(hours / 24)
        hours -= days * 24
        hours = Math.fround(hours)
        setAuctionTimer(`${prefix} ${days} days, ${hours} hours`)

        // Auction Data
        const data = await auctionService.getAllAuctionData(provider)

        setAuctionData(data.map((auction, index) => {
          const userBid = auction.bids[defaultAccount] ? auction.bids[defaultAccount] : '0'
          const totalBid = auction.totalBid ? auction.totalBid : '0'

          return {
            id: index,
            userBid: `${toEther(userBid)} GEN`,
            totalBid: `${toEther(totalBid)} GEN`,
            status: auction.status
          }
        }).reverse())
      }}
    />
  )

  return (
    <BidGENWrapper>
      <UpdateLoop />
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
            {
 name: 'Auction #', key: 'id', width: '15%', align: 'left'
},
            {
 name: 'You Have Bid', key: 'userBid', width: '25%', align: 'right'
},
            {
 name: 'Total Bid', key: 'totalBid', width: '30%', align: 'right'
},
            {
 name: 'Status', key: 'status', width: '25%', align: 'right'
}
          ]}
          data={auctionData}
        />
      </DetailsWrapper>
      <ActionsWrapper>
        <div style={{ height: '100%' }}>heyyyy</div>
      </ActionsWrapper>
    </BidGENWrapper>
  )
}

export default BidGEN
