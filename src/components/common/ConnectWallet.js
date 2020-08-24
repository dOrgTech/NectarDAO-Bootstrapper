import React from 'react'
import styled from 'styled-components'
import NECLogo from 'assets/svgs/necdao-glow.svg'
import ActiveButton from './buttons/ActiveButton'

const ConnectWrapper = styled.div`
  display: inline-block;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align:center;
  width: 100%;
  height: 364px;
`

const Logo = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
`
const MetamaskBox = styled.div `
  
  border: 1px solid var(--active-border);
 width:30%;
 height:50%;
 margin 0 auto;
 float:left;
 margin-left:15%
`
const LedgerBox = styled.div `
  
 border: 1px solid var(--active-border);
 width:30%;
 height:50%;
 margin 0 auto;
 float:right;
 margin-right:15%
`

const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.4px;
  color: var(--white-text);
  margin-bottom: 14px;
`

const SubTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #7A7F8E;
  margin-bottom: 40px;
`

const ButtonWrapper = styled.div`
  width: 200px;
  float:center
  margin: auto;
  margin-top:25%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ConnectWallet = () => {
  return (
    <ConnectWrapper>
       <Title>
        Please connect your Ethereum wallet to continue
      </Title>
      <MetamaskBox>
     
     
      <ButtonWrapper>
       
        <ActiveButton onClick={() => { window.location.reload() }}>
          MetaMask
        </ActiveButton>
      </ButtonWrapper>
      </MetamaskBox>
      <LedgerBox>
     
      <ButtonWrapper>
       
       <ActiveButton onClick={() => { window.location.reload() }}>
         Ledger
       </ActiveButton>
     </ButtonWrapper>
     
      <SubTitle>
      </SubTitle>
      </LedgerBox>
    </ConnectWrapper>
  )
}

export default ConnectWallet;