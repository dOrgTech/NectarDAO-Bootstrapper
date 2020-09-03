import React from "react";
import { withRouter } from "react-router-dom";
import Tooltip from "components/common/Tooltip";
import NECLogo from "assets/svgs/necdao-glow.svg";
import styled from "styled-components";
import {Title} from "../../../components/common/beehive/Title"
import { tooltip } from "strings";
import BeehiveHeader from "./BeehiveHeader";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const Back = styled.button``;
const GuideWrapper = styled.div``;

const CenterWrapper = styled.div`
  display: flex;
  width: 1068px;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  margin: 0 auto;
  background-color:#162131
`;
const TitleHolder = styled.div`
text-align:center;`
const Title2 = styled.div`
color: white;
font-family: Montserrat;
font-style: normal;
font-weight: 500;
font-size: 15px;
margin-top: 10px;
margin-bottom:20px;
`

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  background: #E2A907;
  border-radius: 100px;
  position:absolute;
  margin-left:-50px;
  text-align:center;
`
const StepBox = styled.div`
margin-left:160px;
margin-top:40px;
`;
const OrangeBox = styled.div`
border:1px solid #E2A907
width:200px;
margin:20px;
text-align:center;`
const GuideHead = styled.div`
`;
const Subtitle = styled.div`
  color: #A9ABCB;
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
          <TitleHolder>
        <Title text={"Walkthrough guide"} afterElement={true} />
       
          <Subtitle>Join Our
          <a style ={{color:'#E2A907'}}
            href="https://alchemy.daostack.io/dao/0xe56b4d8d42b1c9ea7dda8a6950e3699755943de7/members/"
            target="_blank"
          >
         Discord </a> to Discuss Beehive</Subtitle>
          </TitleHolder>
        </GuideHead>
        <StepBox>
          
           <StepNumber>
                        <Typography variant={'h4'} color={'textPrimary'}>1</Typography>
                      </StepNumber>
                      <Typography
                        variant={"h4"}
                        align={"left"}
                        color={"textPrimary"}
                        style={{ fontWeight: 'bold' }}
                      >
                        
                      Stake NEC & wETH into the Balancer Pool</Typography>
          <Subtitle>
            Buy NEC and ETH at app.deversifi.com, or Balancer if you dont
            already have NEC or ETH
          </Subtitle>
          <Subtitle>  <a style ={{color:'#E2A907'}}
            href="https://pools.balancer.exchange/#/"
            target="_blank"
          >https://pools.balancer.exchange/#/
            </a>
          </Subtitle>
        </StepBox>

      


        <StepBox><StepNumber>
        <Typography variant={'h4'} color={'textPrimary'}>2</Typography>
                      </StepNumber>
                      <Typography
                        variant={"h4"}
                        align={"left"}
                        color={"textPrimary"}
                        style={{ fontWeight: 'bold' }}
                      >
                        
                      Hold the BPT in your Private Wallet</Typography>
          <Subtitle>Your BPT Balance</Subtitle>
          <Subtitle>
            Simply hold the BPT tokens in your private wallet. You do not need
            to do anything else with them
          </Subtitle>
        
        </StepBox>
        <StepBox>
        <StepNumber>
        <Typography variant={'h4'} color={'textPrimary'}>3</Typography>
                      </StepNumber>
                      <Typography
                        variant={"h4"}
                        align={"left"}
                        color={"textPrimary"}
                        style={{ fontWeight: 'bold' }}
                      >
                        
                      Wait for Weekly Snapshot 1</Typography>
          <Subtitle>
            Once per week a snapshot of BPT token holders will be taken and
            necDAO Reputation distributed
          </Subtitle>
        
        </StepBox>
        <StepBox><StepNumber>
        <Typography variant={'h4'} color={'textPrimary'}>4</Typography>
                      </StepNumber>
                      <Typography
                        variant={"h4"}
                        align={"left"}
                        color={"textPrimary"}
                        style={{ fontWeight: 'bold' }}
                      >
                        
                      Have your say in the NEC DAO</Typography>
          <Subtitle>
            You can submit proposals and vote on proposals governing the Nectar
            and DeversiFi in the necDAO from the moment that you have received
            your Reputation
          </Subtitle>
          <OrangeBox>
          <Subtitle>  <a style ={{color:'#E2A907'}}
            href="https://alchemy.daostack.io/dao/0xe56b4d8d42b1c9ea7dda8a6950e3699755943de7/members/"
            target="_blank"
          >
            Go to the necDAO
          </a></Subtitle></OrangeBox>
          <Subtitle>
            Participation in the necDAO does not impact NEC Beehive rewards, but
            we hope you will participate
          </Subtitle>
        </StepBox>
        <StepBox>    <StepNumber>
        <Typography variant={'h4'} color={'textPrimary'}>5</Typography>
                      </StepNumber>
                      <Typography
                        variant={"h4"}
                        align={"left"}
                        color={"textPrimary"}
                        style={{ fontWeight: 'bold' }}
                      >
                        
                      Wait for Weekly Snapshot 2</Typography>
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
          <Title2>BPT Rewards sent directly to your wallet</Title2>
          <Subtitle>
            BPT is sent directly to your wallet by Balancer Labs
          </Subtitle>
        </StepBox>
      </CenterWrapper>
    </Modal>
  );
});

export default BeehiveGuide;
