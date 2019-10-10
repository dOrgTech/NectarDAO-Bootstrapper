import React from 'react'
import styled from 'styled-components'
import Table from 'components/common/Table'
import LockPanelExtra from 'components/common/panels/LockPanelExtra'
import EnableTokenPanel from 'components/common/panels/EnableTokenPanel'
import TimelineProgress from 'components/common/TimelineProgress'
import LogoAndText from 'components/common/LogoAndText'
import icon from 'assets/svgs/ethfinex-logo.svg'
import * as contractService from 'core/services/contractService'
import * as providerService from 'core/services/providerService'
import * as erc20Service from 'core/services/erc20Service'
import * as lockingService from 'core/services/continuousLocking4RepService'
import * as numberutils from 'core/libs/lib-number-helpers'

const LockNECWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  max-height: 500px;
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

const LockNECExtra = () => {
  const [currentPeriod, setCurrentPeriod] = React.useState(0)
  const [rangeStart, setRangeStart] = React.useState(0)
  const [maxPeriods, setMaxPeriods] = React.useState(0)
  const [periodPercentage, setPeriodPercentage] = React.useState(0)
  const [periodTimer, setPeriodTimer] = React.useState('...')
  const [periodData, setPeriodData] = React.useState([])
  const [tokenApproved, setTokenApproved] = React.useState(false)
  const [necBalance, setNecBalance] = React.useState('...')
  const [necBalanceDisplay, setNecBalanceDisplay] = React.useState('...')

  // TODO: Remove Mock Data
  if (currentPeriod === 0) {
  }

  React.useEffect(() => {
    const fetch = async () => {
      const { BN } = numberutils.BN
      const provider = await providerService.getProvider()
      const defaultAccount = await providerService.getDefaultAccount(provider)
      const necTokenInstance = await contractService.getNectarTokenAddress()

      // Get Auction Staus Data
      const currentPeriod = await lockingService.getActiveLockingPeriod(provider)
      const lockingStart = await lockingService.getStartTime(provider)
      const numPeriods = await lockingService.getNumLockingPeriods(provider)
      const periodLength = await lockingService.getLockingPeriodLength(provider)

      setCurrentPeriod(currentPeriod)
      setMaxPeriods(numPeriods)


      const now = Math.round((new Date()).getTime() / 1000)

      let prefix = 'Next starts in'
      let ended = false

      // Locking Ended
      if (currentPeriod >= numPeriods) {
        if (Date.now() > startTime) {
          setPeriodPercentage(100)
          setPeriodTimer('Locking has ended')
          ended = true
        } else {
          prefix = 'Last auction ends in'
        }
      }

      // Locking In Progress
      if (!ended) {

        const batchTime = new BN(periodLength)
        const currentBatch = new BN(currentPeriod)
        const startTime = new BN(lockingStart)
        const currentBatchEndTime = batchTime.mul(currentBatch.add(new BN(1))).add(startTime)
        const nowTime = new BN(now)


        console.log('batchTime', batchTime.toString())
        console.log('startTime', startTime.toString())
        console.log('nowTime', nowTime.toString())
        console.log('currentBatch', currentBatch.toString())
        console.log('currentBatchEndTime', currentBatchEndTime.toString())
        const timeUntilNextBatch = currentBatchEndTime.sub(nowTime)

        console.log('timeUntilNextBatch', timeUntilNextBatch.toString())

        // setAuctionPercentage((timeUntilNextBatch.toNumber() / auctionLength) * 100)
        setPeriodTimer(`${prefix}, ${timeUntilNextBatch} time units`)
      }



      // NEC Balance
      const currUserBalance = await erc20Service.balanceOf(provider, necTokenInstance, defaultAccount)
      setNecBalance(`${currUserBalance} NEC`)
      setNecBalanceDisplay(`${numberutils.toEther(currUserBalance)} NEC`)

      // User Lock Data
      const data = await lockingService.getUserTokenLocks(provider, defaultAccount)
      const tableData = []

      Object.keys(data).forEach(function (key, index) {

        const row = {
          id: data[key].lockId,
          startPeriod: data[key].lockingPeriod,
          duration: `${data[key].duration} Months`,
          amount: `${numberutils.toEther(data[key].amount)} NEC`
        }

        tableData.push(row)
      })

      tableData.reverse()
      setPeriodData(tableData)
    }
    fetch()
  }, [])

  const SidePanel = () => (
    <React.Fragment>
      {tokenApproved === false ?
        <EnableTokenPanel
          instruction="Enable NEC for locking"
          subinstruction="-"
          buttonText="Enable NEC"
          onEnable={() => setTokenApproved(true)}
          getToken={() =>
            contractService.getNectarTokenAddress()
          }
          getSpender={() =>
            contractService.getContinuousLocking4ReputationAddress()
          }
        /> :
        <div>
          <LockPanelExtra
            currentPeriod={currentPeriod}
            setCurrentPeriod={setCurrentPeriod}
            rangeStart={rangeStart}
            setRangeStart={setRangeStart}
            buttonText="Lock NEC"
          />
        </div>
      }
    </React.Fragment>
  )

  return (
    <LockNECWrapper>
      <DetailsWrapper>
        <TableHeaderWrapper>
          <TimelineProgress
            value={periodPercentage}
            title={`Current Period: ${currentPeriod} of ${maxPeriods}`}
            subtitle={periodTimer}
            width="28px"
            height="28px"
          />
        </TableHeaderWrapper>
        <Table
          highlightTopRow
          columns={[
            { name: 'Period #', key: 'startPeriod', width: '15%', align: 'left' },
            { name: 'Amount', key: 'amount', width: '35%', align: 'right' },
            { name: 'Duration', key: 'duration', width: '25%', align: 'right' },
            { name: 'lockId', key: 'id', width: '20%', align: 'right' }
          ]}
          data={periodData}
        />
      </DetailsWrapper>
      <ActionsWrapper>
        <ActionsHeader>
          <LogoAndText icon={icon} text="Nectar" />
          <div>{necBalanceDisplay}</div>
        </ActionsHeader>
        <SidePanel />
      </ActionsWrapper>
    </LockNECWrapper>


  )
}

export default LockNECExtra
