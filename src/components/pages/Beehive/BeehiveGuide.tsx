import React from "react";
import { withRouter } from "react-router-dom";
import Tooltip from "components/common/Tooltip";
import NECLogo from "assets/svgs/necdao-glow.svg";
import styled from "styled-components";
import { tooltip } from "strings";
import BeehiveHeader from "./BeehiveHeader";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
const Back = styled.button``;
const GuideWrapper = styled.div``;

const CenterWrapper = styled.div`
  display: flex;
  width: 1068px;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  text-align: left;
  margin: 0 auto;
`;

const Title = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 60px;
  letter-spacing: 1px;
`;

const StepBox = styled.div``;

const GuideHead = styled.div``;
const Subtitle = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  margin-top: 10px;
`;

const BeehiveGuide = withRouter((props) => {

  return (
    <Modal
      {...props}
      aria-labelledby="beehive-guide"
    >
      <CenterWrapper>
        <Button component={Link} to="/beehive">
          Back
        </Button>
        <GuideHead>
          <Title>Walkthrough guide</Title>
          <Subtitle>Join Our Discord to Discuss Beehive</Subtitle>
        </GuideHead>
        <StepBox>
          <Title>Stake NEC & wETH into the Balancer Pool</Title>
          <Subtitle>
            Buy NEC and ETH at app.deversifi.com, or Balancer if you dont
            already have NEC or ETH
          </Subtitle>
          <Subtitle>
            Convert ETH into wETH. You can do this from the UI in Balancer
          </Subtitle>
          <Subtitle>
            Stake NEC & wETH into the Balancer Pool in a 50/50 Ratio to receive
            BPT
          </Subtitle>
          <Subtitle>(balancer pool link)</Subtitle>
        </StepBox>
        <StepBox>
          <Title>Hold the BPT in your Private Wallet</Title>
          <Subtitle>Your BPT Balance</Subtitle>
          <Subtitle>
            Simply hold the BPT tokens in your private wallet. You do not need
            to do anything else with them
          </Subtitle>
          <Subtitle>
            BPT tokens are evidence that you have provided liquidity to the
            NEC/wEth Balancer Pool
          </Subtitle>
        </StepBox>
        <StepBox>
          <Title>Wait for Weekly Snapshot 1</Title>
          <Subtitle>
            Once per week a snapshot of BPT token holders will be taken and
            necDAO Reputation distributed
          </Subtitle>
          <Subtitle>
            Reputation is the voting power in the necDAO. You can use it to
            submit and vote on NEC & DeversiFi proposals
          </Subtitle>
        </StepBox>
        <StepBox>
          <Title>Have your say in the NEC DAO</Title>
          <Subtitle>
            You can submit proposals and vote on proposals governing the Nectar
            and DeversiFi in the necDAO from the moment that you have received
            your Reputation
          </Subtitle>
          <Subtitle>(go to necDAO)</Subtitle>
          <Subtitle>
            Participation in the necDAO does not impact NEC Beehive rewards, but
            we hope you will participate
          </Subtitle>
        </StepBox>
        <StepBox>
          <Title>Wait for Weekly BPT Snapshot 2</Title>
          <Subtitle>
            Once per week, at a random interval, a snapshot of BPT token holders
            will be taken to calculate NEC rewards
          </Subtitle>
          <Subtitle>
            The snapshot details will be published after the end of each week to
            prevent cheating.
          </Subtitle>
          <Subtitle>
            NEC is locked up for 12 months in a smart contract. In 12 months
            time you will be able to unlock your NEC rewards
          </Subtitle>
        </StepBox>
        <StepBox>
          <Title>BPT Rewards sent directly to your wallet</Title>
          <Subtitle>
            BPT is sent directly to your wallet by Balancer Labs
          </Subtitle>
        </StepBox>
      </CenterWrapper>
    </Modal>
  );
});

export default BeehiveGuide;
