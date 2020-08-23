import React from 'react'
import styled from 'styled-components'

const TitleWrapper = styled.div`
  padding: 12px 0;
`

const SectionWrapper = styled.div`
  border: 1px solid var(--border);
  margin: 62px;
`

const Title = styled.p`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin: 10px 0px;
  letter-spacing: 1px;
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

const CenterText = styled(Text)`
  text-align: center;
  padding-top: 10px;
`

const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  width: 320px;
  margin: 50px;
  padding: 30px;
  height: 300px;
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

const PanelBodyText = styled(Text)`
  font-size: 13px;
`

const PanelTitle = styled(CenterText)`
  font-weight: bold;
`

const BeehiveHome: React.FC = () => {

  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title>
          Earn Rewards For Staking Nectar $NEC
        </Title>
        <Title>
          Join Our Discord To Discuss NEC Staking
        </Title>
      </TitleWrapper>
      <PageWrapper>
        <Panel>
          <PanelTitle>
            Governance
          </PanelTitle>
          <CenterText>
            Earn necDAO Reputation
          </CenterText>
          <PanelBodyTextWrapper>
            <PanelBodyText>
              Stake your NEC for up to 12 months to earn Reputation
              (voting power) in the necDAO and have your say in how
              17,000 Pledged ETH are managed as well as how DeversiFi
              is governed
            </PanelBodyText>
          </PanelBodyTextWrapper>
          <Button>Ongoing</Button>
          <CenterText>
            Long Term
            </CenterText>
        </Panel>
        <Panel>
          <PanelTitle>
            Beehive
            </PanelTitle>
          <CenterText>
            Earn REP, BAL and necDAO Reputation
            </CenterText>
          <PanelBodyTextWrapper>
            <PanelBodyText>
              Designed to bootstrap $NEC liquidity,
              Stake your $NEC & wETH into the NEC/wETH
              Balancer Labs pool to earn $NEC, $BAL and
              necDAO Reputation
              </PanelBodyText>
          </PanelBodyTextWrapper>
          <Button>Ongoing</Button>
          <CenterText>
            Ten Weeks
          </CenterText>
        </Panel>
      </PageWrapper>
    </SectionWrapper>
  )

}

export default BeehiveHome