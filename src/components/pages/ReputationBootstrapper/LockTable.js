import React from 'react'
import styled from 'styled-components'
import TimelineProgress from 'components/common/TimelineProgress'
import logo from 'assets/svgs/ethfinex-logo.svg'

const TableWrapper = styled.div`
  width: 607px;
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

const CurrentPeriodWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const NavButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ActiveButton = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;
  padding: 7.5px 14px;
  border: 1px solid var(--active-border);
`

const InactiveButton = styled(ActiveButton)`
  color: var(--inactive-text);
  border: 1px solid var(--inactive-border);
`

const Table = styled.div`
  height: 260px;
  border-right: 1px solid var(--border);
`

const ActiveRow = styled.div`
`

const InactiveRow = styled.div`
`

const LockTable = () => {
  return (
    <TableWrapper>
      <TableHeaderWrapper>
        <TimelineProgress
          value='30'
          title='Current Period: 8 of 10'
          subtitle='Next starts in 1 day, 6 hours'
          width='28px'
          height='28px'
        />
        <NavButtons>
          <InactiveButton>Your Lock</InactiveButton>
          <ActiveButton>All Periods</ActiveButton>
        </NavButtons>
      </TableHeaderWrapper>
      <Table />
    </TableWrapper>
  )
}

export default LockTable
