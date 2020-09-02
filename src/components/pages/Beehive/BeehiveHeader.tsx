import React from "react";
import { withRouter } from "react-router-dom";
import Tooltip from "components/common/Tooltip";
import NECLogo from "assets/svgs/necdao-glow.svg";
import styled from "styled-components";
import { SubTitle } from 'components/common/beehive/SubTitle';
import { tooltip } from "strings";
import { Title } from 'components/common/beehive/Title'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'
import {Typography} from '@material-ui/core'
import { withStyles, makeStyles , useTheme, withTheme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  color: #A9ABCB;
  text-align: center;
  
`;
const SubText = styled.div`
color: #A9ABCB
font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 18px;
text-align: center;
letter-spacing: 1px;
`
const CenterWrapper = styled.div`
  display: flex;
  width: 1068px;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  margin: 0 auto;
`;

const Logo = styled.img`
  width: 93px;
  height: 93px;
`;

const Timerperiod = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 93px;
  height: 5%;
  text-align: center;
    color: #A9ABCB;

  cursor: pointer;
  border: 1px solid var(--active-border);
  font-size: 7.5px;
  padding: 10px;
`;

const Timer = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  text-align: left;
  letter-spacing: 1px;
`;
const Period = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 200;
  font-size: 10px;
  text-align: left;
  letter-spacing: 1px;
  margin-left: 5px;
`;
const Biodiv = styled.div`
  display: flex;
  justify-content: center;
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  padding: 0 20px;
  letter-spacing: 1px;
`;

const StatsHolder = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row;
  align-items: top;
  width: 100%;
  text-align: center;
  padding-bottom: 2.5%;
  padding-top: 2.5%;
`;

const Statsbox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--white-text);
  cursor: pointer;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  margin: 0 0 0 0;
  width: 150px;
  padding: 0 20px;
`;

const BigNum = styled.div`
  color: white;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: left;
  letter-spacing: 1px;
`;

const UsdVal = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 200;
  font-size: 10px;
  text-align: left;
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

const ActiveButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  cursor: pointer;
  border: 1px solid var(--active-border);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  padding: 9px 0px;
  width: 156px;
`;

const InactiveButton = styled(ActiveButton)`
  border: 1px solid var(--inactive-border);
  color: var(--inactive-header-text);
`;

const TitleBox = styled.div`
width:50%
margin 0 auto;`


const BigHeader = withRouter((props) => {
  const { height } = props;
  const [selected, setSelected] = React.useState(0);
  return (
    <>
    
    <ThemeProvider theme = {theme}>
      <HeaderWrapper height={height}>
      
        <CenterWrapper><TitleBox>
          <Title afterElement = {true}> Nectar Beehive</Title>
          </TitleBox>
          <Biodiv>
            <Tooltip
              title=""
              content={tooltip.necDAOBasics}
              position="right top"
            />
            <SubTitle>
              Earn $NEC $BAL and Reputation Rewards for Staking into The
              Balancer NEC/wEth Pool
            </SubTitle>
          </Biodiv>
          <StatsHolder>
            <Statsbox>
            <UsdVal>Total Nec Rewards</UsdVal>
              <BigNum>10,000,000</BigNum>
              <UsdVal>$2,200,000</UsdVal>
            </Statsbox>
            <Statsbox>
            <UsdVal>Remaining NEC Rewards</UsdVal>
              <BigNum>10,000,000</BigNum>
              <UsdVal>$2,200,000</UsdVal>
             
            </Statsbox>
            <Statsbox>
            <UsdVal>Total Reputation</UsdVal>
              <BigNum>10,000,000</BigNum>
            </Statsbox>
            <Statsbox>
            <UsdVal>Remaining Reputation</UsdVal>
              <BigNum>10,000,000</BigNum>
            </Statsbox>
          </StatsHolder>


        </CenterWrapper>
     
      </HeaderWrapper>

      <NavWrapper></NavWrapper>
      </ThemeProvider>
    </>
  );
});

export default withTheme(BigHeader);
