import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Title } from 'components/common/beehive/Title'

const TitleWrapper = styled.div`
  padding: 12px 0;
`

const Text = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  text-align: left;
`

const PanelContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 17px;
`

const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: 445px;
  height: 440px;
  margin: 15px;
  min-width: 290px;
  background: #172333;
  border-radius: 6px;
  padding: 15px;
`

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 34px;
  background: var(--action-button);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: var(--white-text);
`

const PanelBodyTextWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const BadgeContainer = styled.div`
  display: flex;
`

const PanelBodyText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  padding: 0 17px 54px 17px;
  text-align: center;
  margin: 0;
  color: #A9ABCB;
`

const Badge = styled.div`
  background: linear-gradient(315deg, #FF8800 8.75%, #E2A907 100%);
  border-radius: 4px;
`

const BadgeText = styled.div`
  padding: 8px;
  letter-spacing: -0.02em;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #FFFFFF;

`

const PanelTitle = styled.div`
  color: #A9ABCB;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  padding: 5px 0 24px 0;
  font-size: 18px;
`

const SubTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  padding-bottom: 24px;
`

const MainTitle = styled.div`
  width: 100%;
  text-align: center;
`

const TermContainer = styled.div`
  background: #1F2A3E;
  border-radius: 6px;
  padding: 12px 25px;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #FFFFFF;
  justify-self: flex-end;
  margin-bottom: 41px;
`

const HomePage: React.FC = () => {

  const history = useHistory()

  const goToBeehive = () => history.push('/beehive')

  const goToLockNec = () => history.push('/lock-nec')

  return (
    <>
      <TitleWrapper>
        <MainTitle>
          <Title afterElement={true}> Earn Rewards</Title> <Title>For Staking Nectar $NEC</Title>
        </MainTitle>
        <SubTitle>
          Join Our Discord To Discuss NEC Staking
        </SubTitle>
      </TitleWrapper>
      <PageWrapper>
        <Panel>
          <BadgeContainer>
            <Badge><BadgeText>Ongoing</BadgeText></Badge>
          </BadgeContainer>
          <PanelContent>
            <PanelTitle>
              Governance
            </PanelTitle>
            <SubTitle>
              Earn necDAO <br/> Reputation
            </SubTitle>
            <PanelBodyTextWrapper>
              <PanelBodyText>
                Stake your NEC for up to 12 months to earn Reputation
                (voting power) in the necDAO and have your say in how
                17,000 Pledged ETH are managed as well as how DeversiFi
                is governed
              </PanelBodyText>
            </PanelBodyTextWrapper>
            <TermContainer onClick={goToLockNec}>
              Long Term
            </TermContainer>
          </PanelContent>  
        </Panel>
        <Panel>
          <BadgeContainer>
            <Badge><BadgeText>Ongoing</BadgeText></Badge>
          </BadgeContainer>
          <PanelContent>
            <PanelTitle>
              Beehive
              </PanelTitle>
            <SubTitle>
              Earn REP, BAL and necDAO Reputation
              </SubTitle>
            <PanelBodyTextWrapper>
              <PanelBodyText>
                Designed to bootstrap $NEC liquidity,
                Stake your $NEC & wETH into the NEC/wETH
                Balancer Labs pool to earn $NEC, $BAL and
                necDAO Reputation
                </PanelBodyText>
            </PanelBodyTextWrapper>
            <TermContainer onClick={goToBeehive}>
              Ten Weeks
            </TermContainer>
          </PanelContent> 
        </Panel>
      </PageWrapper>
    </>
  )

}

export default HomePage