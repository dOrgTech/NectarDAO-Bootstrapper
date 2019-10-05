// TODO:
/*
<TimelineProgress
  topText={"NectarDAO Reputation Airdrop"}
  bottomText={"In ${airdropCountdown()}"}
  Icon={nec.svg}
/>
<divider />
<text>Nectar Balance</Text>
...
*/
import React from 'react'
import styled from 'styled-components'
import TimelineProgress from '../../common/TimelineProgress'
import Divider from '../../common/Divider'
import logo from '../../../assets/svgs/ethfinex-logo.svg'

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border);
  width: 450px;
`

const title = 'NectarDAO Reputation Airdrop'
const subtitle = 'In 12 days, 4 hours'

const Airdrop = () => (
  <CardWrapper>
    <TimelineProgress value={12} icon={logo} title={title} subtitle={subtitle} />
    <Divider width="80%" margin="20px 0px 20px 0px" />
  </CardWrapper>
)

export default Airdrop
