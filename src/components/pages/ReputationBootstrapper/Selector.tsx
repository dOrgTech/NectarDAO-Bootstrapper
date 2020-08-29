import React from 'react'
import { withRouter } from 'react-router-dom'
import LogoAndText from 'components/common/LogoAndText'
import Tooltip from 'components/common/Tooltip'
import EthFinexLogo from 'assets/pngs/NECwithoutText.png'
import StarIcon from 'assets/svgs/star.svg'
import styled from 'styled-components'
import { lockNEC, bidGEN, airdrop } from 'config.json'
import { tooltip } from 'strings'
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border);
  height: ${props => props.height};
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin: 32px 0px;
  letter-spacing: 1px;
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
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  padding: 9px 0px;
  width: 156px;
  background-color:#4a20e5;
`

const ButtonExternal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--action-button);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  margin-left: 50px;
  padding: 9px 0px;
  cursor: pointer;
  width: 156px;
`

const InactiveButton = styled(ActiveButton)`
  color: var(--inactive-header-text);
  background-color:#4a20e5;
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

const Selector = withRouter((props) => {
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
    <HeaderWrapper height={height}>
      <Title>
        How do you want to earn Reputation for the necDAO?
        <Tooltip title="" content={tooltip.necDAOBasics} position="right top" />
      </Title>
      <NavWrapper>
        <ButtonExternal>
          <a
            href="https://alchemy.daostack.io/dao/0xe56b4d8d42b1c9ea7dda8a6950e3699755943de7/members/"
            target="_blank"
          >
            <LogoAndText icon={EthFinexLogo} text="Go to DAO" />
          </a>
        </ButtonExternal>
      </NavWrapper>
      <NavWrapper>
      </NavWrapper>
      <TotalRepWrapper>
        <StarWrapper>
          <Star src={StarIcon} />
        </StarWrapper>
        <TotalRepText>{`Total Rewardable Reputation (Voting Power) - ${currentSchemeTotalRep} REP`}</TotalRepText>
      </TotalRepWrapper>
    </HeaderWrapper>
  )
})

export default Selector