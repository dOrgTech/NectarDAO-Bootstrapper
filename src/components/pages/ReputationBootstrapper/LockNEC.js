import React from 'react'
import styled from 'styled-components'
import Table from 'components/common/Table'
import LockPanel from 'components/common/panels/LockPanel'
import EnableTokenPanel from 'components/common/panels/EnableTokenPanel'
import TimelineProgress from 'components/common/TimelineProgress'
import LogoAndText from 'components/common/LogoAndText'
import icon from 'assets/svgs/ethfinex-logo.svg'
import * as contractService from 'core/services/contractService'
import * as providerService from 'core/services/providerService'
import * as erc20Service from 'core/services/erc20Service'
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

const LockNEC = () => {
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
    setCurrentPeriod(8)
    setRangeStart(0)
    setMaxPeriods(10)
    setPeriodPercentage(75)
    setPeriodTimer('Next starts in 1 day, 6 hours')
    setPeriodData([
      {
        id: '8',
        userLocked: '0',
        totalLocked: '23,523.22 NEC',
        repReceived: 'In Progress'
      },
      {
        id: '7',
        userLocked: '0',
        totalLocked: '44,523.22 NEC',
        repReceived: '0.00 REP'
      },
      {
        id: '6',
        userLocked: '0',
        totalLocked: '523.22 NEC',
        repReceived: '0.00 REP'
      },
      {
        id: '5',
        userLocked: '0',
        totalLocked: '3,323.22 NEC',
        repReceived: '0.00 REP'
      },
      {
        id: '4',
        userLocked: '0',
        totalLocked: '23,523.22 NEC',
        repReceived: '0.00 REP'
      }
    ])
  }

  React.useEffect(() => {
    const fetch = async () => {
      const provider = await providerService.getProvider()
      const defaultAccount = await providerService.getDefaultAccount(provider)
      const necTokenInstance = await contractService.getNectarTokenAddress()

      // NEC Balance
      const currUserBalance = await erc20Service.balanceOf(provider, necTokenInstance, defaultAccount)
      setNecBalance(`${currUserBalance} NEC`)
      setNecBalanceDisplay(`${numberutils.toEther(currUserBalance)} NEC`)
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
          <LockPanel
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
            { name: 'Period #', key: 'id', width: '15%', align: 'left' },
            { name: 'You Locked', key: 'userLocked', width: '25%', align: 'right' },
            { name: 'Total Locked', key: 'totalLocked', width: '30%', align: 'right' },
            { name: 'You Received', key: 'repReceived', width: '25%', align: 'right' }
          ]}
          data={periodData}
        />
        <Table
          highlightTopRow
          columns={[
            { name: 'Period #', key: 'id', width: '15%', align: 'left' },
            { name: 'Amount', key: 'amount', width: '25%', align: 'right' },
            { name: 'Redeemed?', key: 'isRedeemed', width: '30%', align: 'right' },
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

export default LockNEC
