import React from "react";
import { withRouter } from "react-router-dom";
import Tooltip from "components/common/Tooltip";
import styled from "styled-components";
import { tooltip } from "strings";
import { Title } from "components/common/beehive/Title";
import { Typography } from "@material-ui/core";

const HeaderWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const CenterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StatsHolder = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  align-items: top;
  width: 100%;
  text-align: center;
  padding-bottom: 2.5%;
  padding-top: 65px;
`;

const Statsbox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px 20px 15px 20px;

  &::after {
    content: '';
    width: 60px;
    height: 3px;
    background: #E2A907;
    position: absolute;
    top: 0px;
  }
`;

const BigNum = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  letter-spacing: 1px;
`;

const UsdVal = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 200;
  font-size: 10px;
  text-align: center;
  letter-spacing: 1px;
`;

const InstructDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

const InstructBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  color: var(--white-text);
  justify-content: center;
  cursor: pointer;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  border: 1px solid var(--active-border);
  font-size: 12px;
  padding: 8px;
  margin: 5px;
  width: 156px;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubtitleWrapper = styled.div`
  max-width: 445px;
`

const SmallSubtitle = styled(Typography)`
  color: #646A7A !important;
  opacity: 0.76;
`

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1110px;
`

const BigHeader = withRouter((props) => {
  const { height } = props;
  const [selected, setSelected] = React.useState(0);

  return (
    <>
      <HeaderWrapper height={height}>
        <Title text={'Nectar Beehive'} afterElement={true}/>
        <CenterWrapper>
          <PageContent>
            <SubtitleWrapper>
              <Tooltip
                title=""
                content={tooltip.necDAOBasics}
                position="right top"
              />
              <Typography color={'textSecondary'} variant={'subtitle2'}>
                Earn $NEC $BAL and Reputation Rewards for Staking into The
                Balancer NEC/wEth Pool
              </Typography>
            </SubtitleWrapper>

            <StatsHolder>
              <Statsbox>
                <Typography variant={'body1'} align={'left'} color={'textSecondary'}>Total Nec Rewards</Typography>
                <Typography variant={'h3'} align={'left'} color={'textPrimary'}>10,000,000</Typography>
                <SmallSubtitle variant={'body2'} align={'left'} color={'textSecondary'}>$2,200,000</SmallSubtitle>
              </Statsbox>
              <Statsbox>
                <Typography variant={'body1'} align={'left'} color={'textSecondary'}>Remaining NEC Rewards</Typography>
                <Typography variant={'h3'} align={'left'} color={'textPrimary'}>10,000,000</Typography>
                <SmallSubtitle variant={'body2'} align={'left'} color={'textSecondary'}>$2,200,000</SmallSubtitle>
              </Statsbox>
              <Statsbox>
                <Typography variant={'body1'} align={'left'} color={'textSecondary'}>Total Reputation</Typography>
                <Typography variant={'h3'} align={'left'} color={'textPrimary'}>10,000,000</Typography>
              </Statsbox>
              <Statsbox>
                <Typography variant={'body1'} align={'left'} color={'textSecondary'}>Remaining Reputation</Typography>
                <Typography variant={'h3'} align={'left'} color={'textPrimary'}>10,000,000</Typography>
              </Statsbox>
            </StatsHolder>

            <InstructDiv>
              <InstructBox>
                Stake into the NEC/wETH Balancer Pool to Receive BPT{" "}
              </InstructBox>
              <InstructBox>Earn $NEC, $BAL and necDAO Reputation </InstructBox>
              <InstructBox>Participate in necDAO Governance</InstructBox>
              <InstructBox>Claim your $NEC Rewards in 12 Months</InstructBox>
              <InstructBox>Read the Full Beehive Guide</InstructBox>
            </InstructDiv>
          </PageContent>

        </CenterWrapper>
      </HeaderWrapper>

      <NavWrapper></NavWrapper>
    </>
  );
});

export default BigHeader;
