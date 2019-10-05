import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border);
  height: ${props => props.height};
`

const Title = styled.div`
  color: var(--white-text);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin: 20px 0px;
  letter-spacing: 1px;
`

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const ActiveButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white-text);
  border: 1px solid var(--active-border);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  padding: 18px 0px;
  width: 156px;
`

const InactiveButton = styled(ActiveButton)`
  border: 1px solid var(--inactive-border);
  color: var(--inactive-text);
`

const Selector = ({ height }) => {
  const [selected, setSelected] = React.useState(0)

  const Button = withRouter(({
 option, route, history, children
}) => {
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
  })

  return (
    <HeaderWrapper height={height}>
      <Title>How do you want to earn Reputation for the NectarDAO?</Title>
      <NavWrapper>
        <Button option={0} route="/lock-nec">
          Lock NEC
        </Button>
        <Button option={1} route="/airdrop">
          Airdrop
        </Button>
        <Button option={2} route="/bid-gen">
          Bid GEN
        </Button>
      </NavWrapper>
    </HeaderWrapper>
  )
}

export default Selector
