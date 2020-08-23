import React from "react";
import { withRouter } from "react-router-dom";
import Tooltip from "components/common/Tooltip";
import NECLogo from "assets/svgs/necdao-glow.svg";
import styled from "styled-components";
import { lockNEC, bidGEN, airdrop } from "config.json";
import { tooltip } from "strings";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  text-align: center;
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;
const Title = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 60px;
  text-align: center;
  letter-spacing: 1px;
`;
const Timerperiod = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
  height: 5%;
  text-align: center;
  color: var(--white-text);
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
  font-size: 20px;
  line-height: 20px;
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
  flex-flow: row wrap;
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
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

const InstructBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  color: var(--white-text);
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
  color: var(--white-text);
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

const Subtitle = styled.div`
  padding-left: 10px;
`;

const getCurrentSchemeTotalRep = (pathname) => {
  switch (pathname) {
    case "/lock-nec":
      return lockNEC.totalRep;
    case "/bid-gen":
      return bidGEN.totalRep;
    case "/airdrop":
      return airdrop.totalRep;
    case "/":
      return lockNEC.totalRep;
  }
};

const BigHeader = withRouter((props) => {
  const { height } = props;
  const [selected, setSelected] = React.useState(0);

  const currentSchemeTotalRep = getCurrentSchemeTotalRep(
    props.location.pathname
  );

  const Button = withRouter(
    ({ option, route, history, location, children }) => {
      // Handle external route navigation
      if (location.pathname === route) {
        setSelected(option);
      } else if (location.pathname === "/") {
        setSelected(0);
      }

      if (option === selected) {
        return <ActiveButton>{children}</ActiveButton>;
      }
      return (
        <InactiveButton
          onClick={() => {
            setSelected(option);
            history.push(route);
          }}
        >
          {children}
        </InactiveButton>
      );
    }
  );

  return (
    <>
      <HeaderWrapper height={height}>
        <Logo src={NECLogo} />
        <CenterWrapper>
          <Title>Nectar Beehive</Title>
          <Biodiv>
            <Tooltip
              title=""
              content={tooltip.necDAOBasics}
              position="right top"
            />
            <Subtitle>
              Earn $NEC $BAL and Reputation Rewards for Staking into The
              Balancer NEC/wEth Pool
            </Subtitle>
          </Biodiv>

          <StatsHolder>
            <Statsbox>
              <BigNum>10,000,000</BigNum>
              <UsdVal>$2,200,000</UsdVal>
              <UsdVal>Total Nec Rewards</UsdVal>
            </Statsbox>
            <Statsbox>
              <BigNum>10,000,000</BigNum>
              <UsdVal>$2,200,000</UsdVal>
              <UsdVal>Remaining NEC Rewards</UsdVal>
            </Statsbox>
            <Statsbox>
              <BigNum>10,000,000</BigNum>
              <UsdVal>Totat Reputation</UsdVal>
            </Statsbox>
            <Statsbox>
              <BigNum>10,000,000</BigNum>
              <UsdVal>Remaining Reputation</UsdVal>
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
        </CenterWrapper>
        <Timerperiod>
          <Timer>06:23h:59s</Timer>
          <Period>Period 1 out of 10</Period>
        </Timerperiod>
      </HeaderWrapper>

      <NavWrapper></NavWrapper>
    </>
  );
});

export default BigHeader;
