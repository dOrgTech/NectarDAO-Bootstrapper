import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../../../components/common/beehive/Title";
import { Modal, Button, Link, IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 65px 95px 65px;
  @media (max-width: 480px) {
    justify-content:left;
    padding-left:40px;
    
  }
`;

const TitleHolder = styled.div`
  text-align: center;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  min-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  background: #e2a907;
  border-radius: 100px;
  @media (max-width: 480px) {
    margin-top:-50px;
    margin-right:-25px;
  }
`;

const StepBox = styled.div`
  padding-top: 40px;
  @media (max-width: 480px) {
    padding-top:50px;
    padding-bottom:50px;

  }
`;

const StepWrapper = styled.div`
  display: flex;
`;

const GuideHead = styled.div``;
const Subtitle = styled.div`
  color: #a9abcb;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  margin-top: 10px;
`;

const StyledModal = styled(Modal)`
  max-width: 1068px;
  margin: auto;
  height: 815px;
  overflow-y: auto;
   @media (max-width: 800px) {
    width:90%;
  }
  @media (max-width: 480px) {
    width:100%;
  }
`;

const StepTextWrapper = styled.div`
  padding-left: 17px;
  @media (max-width: 480px) {
    padding-left:0px;
  }
`;

const GoToNecButton = styled(Button)`
  width: 300px;
  margin-top: 12px !important;
`;

const BodyText = styled(Typography)`
  padding-top: 15px;
  color: rgba(169, 171, 203, 0.8) !important;
`;

const BalanceText = styled(BodyText)`
  padding: 16px;
`;

const BalanceNumberText = styled(Typography)`
  padding-left: 8px;
  display: inline-block;
`;

const BPTBalance = styled.div`
  background: rgba(5, 15, 22, 0.5);
  border: 1px solid #404b67;
  box-sizing: border-box;
  border-radius: 6px;
  width: fit-content;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0 20px 0;
`;

const CloseIconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 480px) {
    margin-right:40px;
    padding-top:40px;
  }
`;

const BackgroundWrapper = styled.div`
  background-color: #222b42;
  outline: none;
`;

const CloseIcon = styled(IconButton)`
  padding: 16px;
  color: #FFFFFF !important;
  font-size: 16px;
  
`;

const BeehiveGuide: React.FC<any> = withRouter((props) => {
  const [bptBalance, setBptBalance] = useState(0);

  return (
    <StyledModal
      {...props}
      aria-labelledby="beehive-guide"
      disableAutoFocus={true}
    >
      <BackgroundWrapper>
        <CloseIconContainer>
          <CloseIcon onClick={props.onClose}>
            <Close />
          </CloseIcon>
        </CloseIconContainer>
        <CenterWrapper>
          <GuideHead>
            <TitleHolder>
              <Title text={"Walkthrough guide"} afterElement={true} />

              <Subtitle>
                Join Our
                <a
                  style={{ color: "#E2A907" }}
                  href="https://alchemy.daostack.io/dao/0xe56b4d8d42b1c9ea7dda8a6950e3699755943de7/members/"
                  target="_blank"
                >
                  Discord{" "}
                </a>{" "}
                to Discuss Beehive
              </Subtitle>
            </TitleHolder>
          </GuideHead>
          <br />
          <StepBox>
            <StepWrapper>
              <StepNumber>
                <Typography variant={"h4"} color={"textPrimary"}>
                  1
                </Typography>
              </StepNumber>
              <StepTextWrapper>
                <Typography
                  variant={"h4"}
                  align={"left"}
                  color={"textPrimary"}
                  style={{ fontWeight: "bold" }}
                >
                  Stake NEC & wETH into the Balancer Pool
                </Typography>
                <BodyText variant={"body2"}>
                  Buy NEC and ETH at app.deversifi.com, or Balancer if you don't
                  already have NEC or ETH
                </BodyText>

                <BodyText variant={"body2"}>
                  <Link href="https://pools.balancer.exchange/#/">
                    https://pools.balancer.exchange/#/
                  </Link>
                </BodyText>
              </StepTextWrapper>
            </StepWrapper>
          </StepBox>

          <StepBox>
            <StepWrapper>
              <StepNumber>
                <Typography variant={"h4"} color={"textPrimary"}>
                  2
                </Typography>
              </StepNumber>
              <StepTextWrapper>
                <Typography
                  variant={"h4"}
                  align={"left"}
                  color={"textPrimary"}
                  style={{ fontWeight: "bold" }}
                >
                  Hold the BPT in your Private Wallet
                </Typography>
                <BPTBalance>
                  <BalanceText variant={"body2"}>
                    Your BPT Balance:{" "}
                    <BalanceNumberText variant={"body2"} color={"textPrimary"}>
                      {bptBalance}
                    </BalanceNumberText>
                  </BalanceText>
                </BPTBalance>
                <BodyText variant={"body2"}>
                  Simply hold the BPT tokens in your private wallet. You do not
                  need to do anything else with them
                </BodyText>
              </StepTextWrapper>
            </StepWrapper>
          </StepBox>

          <StepBox>
            <StepWrapper>
              <StepNumber>
                <Typography variant={"h4"} color={"textPrimary"}>
                  3
                </Typography>
              </StepNumber>
              <StepTextWrapper>
                <Typography
                  variant={"h4"}
                  align={"left"}
                  color={"textPrimary"}
                  style={{ fontWeight: "bold" }}
                >
                  Wait for Weekly Snapshot 1
                </Typography>
                <BodyText variant={"body2"}>
                  Once per week a snapshot of BPT token holders will be taken
                  and necDAO Reputation distributed
                </BodyText>
              </StepTextWrapper>
            </StepWrapper>
          </StepBox>

          <StepBox>
            <StepWrapper>
              <StepNumber>
                <Typography variant={"h4"} color={"textPrimary"}>
                  4
                </Typography>
              </StepNumber>
              <StepTextWrapper>
                <Typography
                  variant={"h4"}
                  align={"left"}
                  color={"textPrimary"}
                  style={{ fontWeight: "bold" }}
                >
                  Have your say in the NEC DAO
                </Typography>
                <BodyText variant={"body2"}>
                  You can submit proposals and vote on proposals governing the
                  Nectar and DeversiFi in the necDAO from the moment that you
                  have received your Reputation
                </BodyText>

                <Link
                  href={
                    "https://alchemy.daostack.io/dao/0xe56b4d8d42b1c9ea7dda8a6950e3699755943de7/members/"
                  }
                >
                  <GoToNecButton variant={"outlined"} color={"primary"}>
                    Go to the necDAO
                  </GoToNecButton>
                </Link>
                <BodyText variant={"body2"}>
                  Participation in the necDAO does not impact NEC Beehive
                  rewards, but we hope you will participate
                </BodyText>
              </StepTextWrapper>
            </StepWrapper>
          </StepBox>

          <StepBox>
            <StepWrapper>
              <StepNumber>
                <Typography variant={"h4"} color={"textPrimary"}>
                  5
                </Typography>
              </StepNumber>
              <StepTextWrapper>
                <Typography
                  variant={"h4"}
                  align={"left"}
                  color={"textPrimary"}
                  style={{ fontWeight: "bold" }}
                >
                  Wait for Weekly Snapshot 2
                </Typography>
                <BodyText variant={"body2"}>
                  Once per week, at a random interval, a snapshot of BPT token
                  holders will be taken to calculate NEC rewards The snapshot
                  details will be published after the end of each week to
                  prevent cheating. NEC is locked up for 12 months in a smart
                  contract. In 12 months time you will be able to unlock your
                  NEC rewards
                </BodyText>
              </StepTextWrapper>
            </StepWrapper>
          </StepBox>

          <StepBox>
            <StepWrapper>
              <StepNumber>
                <Typography variant={"h4"} color={"textPrimary"}>
                  6
                </Typography>
              </StepNumber>
              <StepTextWrapper>
                <Typography
                  variant={"h4"}
                  align={"left"}
                  color={"textPrimary"}
                  style={{ fontWeight: "bold" }}
                >
                  BPT Rewards sent directly to your wallet
                </Typography>
                <BodyText variant={"body2"}>
                  BPT is sent directly to your wallet by Balancer Labs
                </BodyText>
              </StepTextWrapper>
            </StepWrapper>
          </StepBox>
        </CenterWrapper>
      </BackgroundWrapper>
    </StyledModal>
  );
});

export default BeehiveGuide;
