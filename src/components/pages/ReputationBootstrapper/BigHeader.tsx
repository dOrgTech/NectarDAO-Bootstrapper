import React from 'react'
import { withRouter } from 'react-router-dom'
import LogoAndText from 'components/common/LogoAndText'
import Tooltip from 'components/common/Tooltip'
import EthFinexLogo from 'assets/pngs/NECwithoutText.png'
import NECLogo from 'assets/svgs/necdao-glow.svg'
import GENLogo from 'assets/svgs/GEN-logo.svg'
import StarIcon from 'assets/svgs/star.svg'
import styled from 'styled-components'
import { lockNEC, bidGEN, airdrop } from 'config.json'
import { tooltip } from 'strings'


const BigWrap = styled.div`
`
const HeaderWrapper = styled.div`
  display: inline-block;
  width:100%;
  flex-direction: column;
  align-self: top;
  text-align:center;
  margin: 0 auto;
  float:center;
  
`
const TopBarWrapper = styled.div`
width:50%;
position:static;
display:inline-block;
float:center;
margin 0 auto;

`
const Logo = styled.img`
  width: 80px;
  height: 80px;
  position:relative;
  float:left;
  margin-top:10px
`
const Title = styled.div`
  display: inline-block;
  position:relative;
  color: var(--white-text);
  white-space:wrap;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 60px;
  text-align: center;
  letter-spacing: 1px;
  width:50%;
  margin-left:auto;
 overflow:hidden;
`
const Timerperiod = styled.div`
 width:20%;
 height:5%;
 
 position:relative;
 display: inline-block;
  flex-direction: column;
  color: var(--white-text);
  cursor: pointer;
  margin-left:auto;
  border: 1px solid var(--active-border);
  font-size: 7.5px;
  margin-top:10px;
  float:right;
  overflow:hidden;
  vertical-align:bottom;
 `

 const Timer = styled.div`
 display: block;
 position:relative;
 color: var(--white-text);
 white-space:wrap;
 font-family: Montserrat;
 font-style: normal;
 font-weight: 400;
 font-size: 20px;
 line-height: 20px;
 text-align: left;
 letter-spacing: 1px;
 width:100%;
 margin-top: 5px;
overflow:hidden;
margin-left:5px
`
const Period = styled.div`
display: flex;
position:relative;
  flex-direction: row;
  width: 70%
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 200;
  font-size: 10px;
  line-height: 14px;
  text-align: left;
  letter-spacing: 1px;
  margin-left:5px;
  margin-right:auto;
  vertical-align:top;
  float:left;
`
const Biodiv = styled.div `
display: flex;
position:static;
  flex-direction: row;
  width: 40%
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  text-align: left;
  letter-spacing: 1px;
  float:center;
  margin-left:auto;
  margin-right:35%;
  bottom:10px;
`

const StatsHolder = styled.div`
position:relative;
 align-items:center;
 width:40%;
 text-align:center;
 float:center;
 margin-left:auto;
 margin-right:auto;
 margin-bottom:2.5%;
 margin-top:2.5%;
 overflow:hidden;
 `



const Statsbox = styled.div`
 display: inline-block;
  flex-direction: column;
  overflow:hidden;
  color: var(--white-text);
  cursor: pointer;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  height: 10%;
  margin: 0 0 0 0;
  white-space:wrap;
  padding: 0px 0px;
  vertical-align:top;
  float: center;
 width:20%;
  `
 
  const BigNum = styled.div`
display: flex;
position:relative;
  flex-direction: row;
  width: 70%
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 14px;
  text-align: left;
  letter-spacing: 1px;
  margin-left:5px;
  margin-bottom:10px
  vertical-align:top;
  float:left;
`

const UsdVal = styled.div`
display: flex;
position:relative;
  flex-direction: row;
  width: 70%
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 200;
  font-size: 10px;
  line-height: 14px;
  text-align: left;
  letter-spacing: 1px;
  margin-left:5px;
  margin-right:auto;
  vertical-align:top;
  margin-bottom:10px
  float:left;
`
  
const InstructDiv = styled.div`
align-items:center;
width:100%;
text-align:center;
float:center;
margin:auto;
  `

  
 const InstructBox = styled.div`

 display: inline-block;
  flex-direction: column;
  align-items: inline;
  color: var(--white-text);
  cursor: pointer;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  border: 1px solid var(--active-border);
  vertical-align:top;
  font-size: 10px;
  line-height: 15px;
  margin: 5px;
  float: center;
  width: 156px;
  height:30px;
  white-space:wrap;

 `
 const RepText = styled.div`
 margin-top:25%
 `
 const InstructText = styled.div`
 margin:2px 2px 2px 2px
 `

 
const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const TotalRepWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const TotalRepText = styled.div`
  color: var(--enable-purple-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin: 24px 0px;
  letter-spacing: 1px;
`

const Star = styled.img`
  height: 12px;
  width: 12px;
`

const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  margin: 24px 12px 24px 0px;
  border-radius: 12px;
  border: 1px solid var(--enable-purple-text);
`

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
`

const InactiveButton = styled(ActiveButton)`
  border: 1px solid var(--inactive-border);
  color: var(--inactive-header-text);
`

const getCurrentSchemeTotalRep = (pathname) => {
  switch (pathname) {
    case '/lock-nec':
      return lockNEC.totalRep
    case '/bid-gen':
      return bidGEN.totalRep
    case '/airdrop':
      return airdrop.totalRep
    case '/':
      return lockNEC.totalRep
  }
}

const BigHeader = withRouter((props) => {
  const { height } = props
  const [selected, setSelected] = React.useState(0)

  const currentSchemeTotalRep = getCurrentSchemeTotalRep(props.location.pathname)

  const Button = withRouter(
    ({
      option, route, history, location, children
    }) => {
      // Handle external route navigation
      if (location.pathname === route) {
        setSelected(option)
      } else if (location.pathname === '/') {
        setSelected(0)
      }

      if (option === selected) {
        return (
          <ActiveButton>
            {children}
          </ActiveButton>
        )
      }
      return (
        <InactiveButton onClick={() => {
          setSelected(option)
          history.push(route)
        }}
        >
          {children}
        </InactiveButton>
      )
    }
  )

  return (
    <BigWrap>

        <HeaderWrapper height={height}>
            <TopBarWrapper>
        <Logo src={NECLogo} />
        <Timerperiod>
            <Timer>06:23h:59s</Timer>
            <Period>Period 1 out of 10</Period>
        </Timerperiod>
      <Title>
        Nectar Beehive
      </Title>
      <Biodiv>

<Tooltip title="" content={tooltip.necDAOBasics} position="right top" />

    Earn $NEC $BAL and Reputation Rewards for Staking into 
   The Balancer NEC/wEth Pool
  </Biodiv>
      </TopBarWrapper>
     
        </HeaderWrapper>
        
    <StatsHolder><Statsbox><BigNum>10,000,000</BigNum><UsdVal>$2,200,000</UsdVal><UsdVal>Total Nec Rewards</UsdVal></Statsbox>
                <Statsbox><BigNum>10,000,000</BigNum><UsdVal>$2,200,000</UsdVal><UsdVal>Remaining NEC Rewards</UsdVal></Statsbox>
                <Statsbox><BigNum>10,000,000</BigNum><UsdVal><RepText>Totat Reputation</RepText></UsdVal></Statsbox>
                <Statsbox><BigNum>10,000,000</BigNum><UsdVal><RepText>Remaining Reputation</RepText></UsdVal></Statsbox>


    </StatsHolder>
    <InstructDiv><InstructBox><InstructText>Stake into the NEC/wETH Balancer Pool to Receive BPT </InstructText></InstructBox>
               <InstructBox><InstructText>Earn $NEC, $BAL and necDAO Reputation</InstructText> </InstructBox>
               <InstructBox><InstructText>Participate in necDAO Governance</InstructText></InstructBox>
               <InstructBox><InstructText>Claim your $NEC Rewards in 12 Months</InstructText></InstructBox>
               <InstructBox><InstructText>Read the Full Beehive Guide</InstructText></InstructBox>
    </InstructDiv>
      <NavWrapper>
      
      </NavWrapper>
     
    </BigWrap>
  )
})

export default BigHeader
