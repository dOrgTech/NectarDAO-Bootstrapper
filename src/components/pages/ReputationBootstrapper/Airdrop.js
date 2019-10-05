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
import ProgressCircle from '../../common/ProgressCircle'

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid var(--border);
`

const Title = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin: 20px 0px;
  letter-spacing: 1px;
`

const Airdrop = () => (
  <div>
    <ProgressCircle value={55} width="50px" height="50px" />
    <CardWrapper>
      <Title>NectarDAO Reputation Airdrop</Title>
    </CardWrapper>
  </div>
)

export default Airdrop
