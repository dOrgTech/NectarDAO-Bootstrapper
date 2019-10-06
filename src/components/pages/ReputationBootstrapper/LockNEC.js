import React from 'react'
import styled from 'styled-components'
import TimelineProgress from 'components/common/TimelineProgress'
import Table from 'components/common/Table'

const LockNECWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
  height: 100%;
  width: 425px;
`

const LockNEC = () => {
  const [currentPeriod, setCurrentPeriod] = React.useState(0)
  const [maxPeriods, setMaxPeriods] = React.useState(0)
  const [periodPercentage, setPeriodPercentage] = React.useState(0)
  const [periodTimer, setPeriodTimer] = React.useState('...')
  const [periodData, setPeriodData] = React.useState([])

  if (currentPeriod === 0) {
    // TODO: Remove Mock Data
    setCurrentPeriod(8)
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
      </DetailsWrapper>
      <ActionsWrapper>
        <div style={{ height: '100%' }}>heyyyy</div>
      </ActionsWrapper>
    </LockNECWrapper>
  )
}

export default LockNEC
