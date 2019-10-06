import React from 'react'
import styled from 'styled-components'
import LockTable from './LockTable'
import LockPanel from './LockPanel'

const LockNECWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const LockNEC = () => {
  return (
    <LockNECWrapper>
      <LockTable />
      <LockPanel />
    </LockNECWrapper>
  )
}

export default LockNEC

// TODO:
/*
<div flow horizontally>
  <div 70% width flow vertically>
    <div 200px height>
      <TimelineProgress
        topText={'Current Period: ${getCurrentPeriod()} of ${getTotalPeriods()}'}
        bottomText={'Next starts in ${format(getPeriodTimeLeft())}'}
      />
      <NavButton>Your Lock</NavButton>
      <NavButton>All Periods</NavButton>
    </div>
    <Table
      columns={[
        'Period #',
        'You Locked',
        'Total Locked',
        'You Received'
      ]}
      data={allPeriods()}
    />
  </div>
  <div flow vertically>
    <Icon svg={nectar.svg} />
    <Text>Nectar</Text>
    <Text>${nectarBalance} NEC</Text>
    <divider />
    ...
  </div>
</div>
*/
