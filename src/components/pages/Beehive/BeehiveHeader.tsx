import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Tooltip from "components/common/Tooltip";
import styled from "styled-components";
import { tooltip } from "strings";
import { Title } from "components/common/beehive/Title";
import { Typography, Link } from "@material-ui/core";
import BeehiveGuide from "./BeehiveGuide";

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
  justify-content: space-between;
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
  width: 255px;

  &::after {
    content: "";
    width: 60px;
    height: 3px;
    background: #e2a907;
    position: absolute;
    top: 0px;
  }
`;

const InstructDiv = styled.div`
  width: 100%;
`;

const InstructBox = styled.div`
  background: rgba(5, 15, 22, 0.5);
  position: relative;
  border: 1px solid #404b67;
  box-sizing: border-box;
  border-radius: 6px;
  width: 255px;
  height: 148px;

  &::after {
    content:"";
    position:absolute;
    height:0;
    width:0;
    left: calc(100% - 1px);
    top:0;
    border: 74px solid transparent;
    border-left: 16px solid #041019;
  }

  &::before {
    content:"";
    position:absolute;
    height:0;
    width:0;
    left:100%;
    top:0;
    border: 74px solid transparent;
    border-left: 16px solid #404b67;
  }
`;

const InstructContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  height: 100%;
`;

const SubtitleWrapper = styled.div`
  max-width: 445px;
`;

const SmallSubtitle = styled(Typography)`
  color: #646a7a !important;
  opacity: 0.76;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1110px;
`;

const InstructBoxContent = styled.div`
  padding: 14px 16px 14px 16px;
`;

const InstructText = styled(Typography)`
  padding-top: 16px;
  color: rgba(169, 171, 203, 0.8) !important;
`;

const StatsboxContent = styled.div`
  padding: 15px 20px 15px 0px;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 16px;
  background: linear-gradient(334.96deg, #112233 28.51%, #061620 129.65%);
  border-radius: 100px;
`

const GuideLinkText = styled(Typography)`
  padding-top: 16px;
`

const BigHeader = withRouter((props) => {
  const { height } = props;
  const [isGuideOpen, setIsGuideOpen] = useState(false)

  return (
    <>
      <HeaderWrapper height={height}>
        <Title text={"Nectar Beehive"} afterElement={true} />
        <CenterWrapper>
          <PageContent>
            <SubtitleWrapper>
              <Tooltip
                title=""
                content={tooltip.necDAOBasics}
                position="right top"
              />
              <Typography color={"textSecondary"} variant={"subtitle2"}>
                Earn $NEC $BAL and Reputation Rewards for Staking into The
                Balancer NEC/wEth Pool
              </Typography>
            </SubtitleWrapper>

            <StatsHolder>
              <Statsbox>
                <StatsboxContent>
                  <Typography
                    variant={"body1"}
                    align={"left"}
                    color={"textSecondary"}
                  >
                    Total Nec Rewards
                  </Typography>
                  <Typography
                    variant={"h3"}
                    align={"left"}
                    color={"textPrimary"}
                  >
                    10,000,000
                  </Typography>
                  <SmallSubtitle
                    variant={"body2"}
                    align={"left"}
                    color={"textSecondary"}
                  >
                    $2,200,000
                  </SmallSubtitle>
                </StatsboxContent>
              </Statsbox>
              <Statsbox>
                <StatsboxContent>
                  <Typography
                    variant={"body1"}
                    align={"left"}
                    color={"textSecondary"}
                  >
                    Remaining NEC Rewards
                  </Typography>
                  <Typography
                    variant={"h3"}
                    align={"left"}
                    color={"textPrimary"}
                  >
                    10,000,000
                  </Typography>
                  <SmallSubtitle
                    variant={"body2"}
                    align={"left"}
                    color={"textSecondary"}
                  >
                    $2,200,000
                  </SmallSubtitle>
                </StatsboxContent>
              </Statsbox>
              <Statsbox>
                <StatsboxContent>
                  <Typography
                    variant={"body1"}
                    align={"left"}
                    color={"textSecondary"}
                  >
                    Total Reputation
                  </Typography>
                  <Typography
                    variant={"h3"}
                    align={"left"}
                    color={"textPrimary"}
                  >
                    10,000,000
                  </Typography>
                </StatsboxContent>
              </Statsbox>
              <Statsbox>
                <StatsboxContent>
                  <Typography
                    variant={"body1"}
                    align={"left"}
                    color={"textSecondary"}
                  >
                    Remaining Reputation
                  </Typography>
                  <Typography
                    variant={"h3"}
                    align={"left"}
                    color={"textPrimary"}
                  >
                    10,000,000
                  </Typography>
                </StatsboxContent>
              </Statsbox>
            </StatsHolder>

            <InstructDiv>
              <InstructContent>
                <InstructBox>
                  <InstructBoxContent>
                    <StepWrapper>
                      <StepNumber>
                        <Typography variant={'subtitle1'} color={'textPrimary'}>1</Typography>
                      </StepNumber>
                      <Typography
                        variant={"body2"}
                        align={"left"}
                        color={"textPrimary"}
                        style={{ fontWeight: 'bold' }}
                      >
                        Stake
                      </Typography>
                    </StepWrapper>
                    <InstructText align={"left"} variant={"body2"}>
                      Stake into the NEC/wETH Balancer Pool to Receive BPT
                    </InstructText>
                  </InstructBoxContent>
                </InstructBox>
                <InstructBox>
                  <InstructBoxContent>
                    <StepWrapper>
                      <StepNumber><Typography variant={'subtitle1'} color={'textPrimary'}>2</Typography></StepNumber>
                      <Typography
                        variant={"body2"}
                        align={"left"}
                        color={"textPrimary"}
                        style={{ fontWeight: 'bold' }}
                      >
                        Earn
                      </Typography>
                    </StepWrapper>
                    <InstructText align={"left"} variant={"body2"}>
                      Earn $NEC, $BAL and necDAO Reputation{" "}
                    </InstructText>
                  </InstructBoxContent>
                </InstructBox>
                <InstructBox>
                  <InstructBoxContent>
                    <StepWrapper>
                      <StepNumber><Typography variant={'subtitle1'} color={'textPrimary'}>3</Typography></StepNumber>
                      <Typography
                        variant={"body2"}
                        align={"left"}
                        color={"textPrimary"}
                        style={{ fontWeight: 'bold' }}
                      >
                        Participate
                      </Typography>
                    </StepWrapper>
                    <InstructText align={"left"} variant={"body2"}>
                      Participate in necDAO Governance
                    </InstructText>
                  </InstructBoxContent>
                </InstructBox>
                <InstructBox>
                  <InstructBoxContent>
                    <StepWrapper>
                      <StepNumber><Typography variant={'subtitle1'} color={'textPrimary'}>4</Typography></StepNumber>
                      <Typography
                        variant={"body2"}
                        align={"left"}
                        color={"textPrimary"}
                        style={{ fontWeight: 'bold' }}
                      >
                        Claim
                      </Typography>
                    </StepWrapper>
                    <InstructText align={"left"} variant={"body2"}>
                      Claim your $NEC Rewards in 12 Months
                    </InstructText>
                  </InstructBoxContent>
                </InstructBox>
              </InstructContent>
            </InstructDiv>

            <GuideLinkText variant={'body2'} color={'primary'}>
              <Link underline={'always'} onClick={() => setIsGuideOpen(true)}>Read The Full Beehive Guide Here</Link>
            </GuideLinkText>

          </PageContent>
        </CenterWrapper>
      </HeaderWrapper>

      <BeehiveGuide open={isGuideOpen} onClose={() => setIsGuideOpen(false)}/>
    </>
  );
});

export default BigHeader;
