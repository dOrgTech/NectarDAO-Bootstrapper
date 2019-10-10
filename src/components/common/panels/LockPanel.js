import React from 'react'
import styled from 'styled-components'

import * as contractService from 'core/services/contractService'
import * as providerService from 'core/services/providerService'
import * as erc20Service from 'core/services/erc20Service'
import * as lockingService from 'core/services/continuousLocking4RepService'
import * as numberLib from 'core/libs/lib-number-helpers'

const PanelWrapper = styled.div`
`

const LockingPeriodSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--inactive-text);
  margin: 24px;
`

const LockingPeriodSelector = styled.div`
  display: flex;
  flex-direction: row;
  color: var(--inactive-header-text);
  margin-top: 12px;
`

const LockingPeriodCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 34px;
  border: 1px solid var(--inactive-border);
`

const ActiveLockingPeriodCell = styled(LockingPeriodCell)`
  color: var(--white-text);
  border: 1px solid var(--active-border);
`

const LockingPeriodStartCell = styled(LockingPeriodCell)`
  border-radius: 4px 0px 0px 4px;
`

const LockingPeriodEndCell = styled(LockingPeriodCell)`
  border-radius: 0px 4px 4px 0px;
`

const LockAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 24px;
  font-weight: 600;
  color: var(--inactive-text);
  height: 87px;
`

const LockAmountForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0px 20px 6px 20px;
  border-bottom: 1px solid var(--inactive-border);
`

const ReleaseableDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px;
  color: var(--inactive-text);
`

const ReleaseableDate = styled.div`
  color: var(--white-text);  
`

const LockNECButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 34px;
  margin: 0px 24px;
  color: var(--inactive-text);
  border: 1px solid var(--border);
`

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 34px;
  margin: 0px 24px;
  background: var(--action-button);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: var(--white-text);
`

const DisableButton = styled(Button)`
  border: 1px solid var(--inactive-border);
  color: var(--inactive-header-text);
  background: none;
`

const LockPanel = ({
  currentPeriod,
  setCurrentPeriod,
  rangeStart,
  setRangeStart,
  buttonText,
  getToken,
  getSpender,
  onEnable }) => {

  const [enabled, setEnabled] = React.useState(undefined)
  const [pending, setPending] = React.useState(false)
  const [lockDuration, setLockDuration] = React.useState(1)
  const [lockAmount, setLockAmount] = React.useState(0)
  const [releaseableTime, setReleaseableTime] = React.useState(0)
  const [releaseableDate, setReleaseableDate] = React.useState('12.04.2019')

  const changeLockDuration = (value) => {
    console.log('new lock duration', value)
    setLockDuration(value)
  }

  const changeLockAmount = (event) => {
    console.log('new lock amount', event.target.value)
    setLockAmount(event.target.value)
  }

  const LockingPeriod = () => {
    const cells = []
    for (let i = rangeStart; i < rangeStart + 5; i += 1) {
      if (i === lockDuration) {
        cells.push(<ActiveLockingPeriodCell>{i}</ActiveLockingPeriodCell>)
      } else {
        cells.push(
          <LockingPeriodCell onClick={() => { changeLockDuration(i) }}>
            {i}
          </LockingPeriodCell>
        )
      }
    }

    return (
      <LockingPeriodSelectorWrapper>
        <div>Lock Duration</div>
        <LockingPeriodSelector>
          <LockingPeriodStartCell onClick={() => {
            setRangeStart(rangeStart > 0 ? rangeStart - 1 : 0)
          }}
          >
            {'<'}
          </LockingPeriodStartCell>
          {cells}
          <LockingPeriodEndCell
            onClick={() => { setRangeStart(rangeStart + 1) }}
          >
            {'>'}
          </LockingPeriodEndCell>
        </LockingPeriodSelector>
      </LockingPeriodSelectorWrapper>
    )
  }

  return (
    <PanelWrapper>
      <LockingPeriod />
      <LockAmountWrapper>
        <div>Lock Amount</div>
        <LockAmountForm>
          <input type="text" name="name" value={lockAmount} onChange={changeLockAmount} />
          <div>NEC</div>
        </LockAmountForm>
      </LockAmountWrapper>
      <ReleaseableDateWrapper>
        <div>Releasable</div>
        <ReleaseableDate>{releaseableDate}</ReleaseableDate>
      </ReleaseableDateWrapper>
      <Button
        onClick={async () => {
          setPending(true)
          const provider = await providerService.getProvider()

          const weiValue = numberLib.toWei(lockAmount)
          console.log('lock', provider, weiValue, lockDuration, currentPeriod)

          try {
            await lockingService.lock(
              provider, weiValue, lockDuration, currentPeriod
            )
          } catch (e) {
            console.log(e)
          }

          setPending(false)
        }}
      >
        {buttonText}
      </Button>
      {/* <div>Extend Lock</div>
      <input type="text" name="name" value={lockAmount} onChange={changeLockAmount} />
      <Button>Extend Lock</Button>
      <div>Release Lock</div>
      <input type="text" name="name" value={lockAmount} onChange={changeLockAmount} />
      <Button>Release Lock</Button> */}
    </PanelWrapper>
  )
}

export default LockPanel
