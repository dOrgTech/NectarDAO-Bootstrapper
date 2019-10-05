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
  border-top: none;
  border-bottom: none;
  width: 450px;
`

const Button = styled.div`
  background: var(--action-button);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  padding: 10px 0px;
  width: 80%;
  margin-bottom: 20px;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-tems: center;
  margin: 0px 0px 0px 0px;
  width: 80%
`

const InfoTitle = styled.div`
  color: var(--inactive-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  letter-spacing: 1px;
  width: 100%
`

const Info = styled(InfoTitle)`
  color: var(--white-text);
  text-align: right;
`

// TODO: make these dynamic values
const airdropTimer = 'In 12 days, 4 hours'
const nectarBalance = '100.00 NEC'
const votingPower = '175,221.43 REP'
const airdropBlock = '5232134'
const currentBlock = '5235255'

const InfoLine = ({ title, info }) => (
  <InfoWrapper>
    <InfoTitle>{title}</InfoTitle>
    <Info>{info}</Info>
  </InfoWrapper>
)

const Airdrop = () => (
  <CardWrapper>
    <TimelineProgress
      value={12}
      icon={logo}
      title="NectarDAO Reputation Airdrop"
      subtitle={airdropTimer}
    />
    <Divider width="80%" margin="20px 0px 20px 0px" />
    <InfoLine title="Nectar Balance" info={nectarBalance} />
    <InfoLine title="Receive Voting Power" info={votingPower} />
    <Divider width="80%" margin="20px 0px 20px 0px" />
    <InfoLine title="Airdrop Blocknumber" info={airdropBlock} />
    <InfoLine title="Current Blocknumber" info={currentBlock} />
    <Divider width="80%" margin="20px 0px 20px 0px" />
    <Button>Buy NEC</Button>
  </CardWrapper>
)

export default Airdrop
