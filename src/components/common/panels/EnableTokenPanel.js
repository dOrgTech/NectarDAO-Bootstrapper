import React from 'react'
import styled from 'styled-components'
import ProgressCircle from 'components/common/ProgressCircle'
import checkboxIcon from 'assets/svgs/checkbox.svg'
import * as providerService from 'core/services/providerService'
import * as erc20Service from 'core/services/erc20Service'

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`

const CircleAndTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
`

const Instruction = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-top: 16px;
  color: var(--enable-purple-text);
`

// TODO include SF Pro Text font
const SubInstruction = styled.div`
  font-family: SF Pro Text;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.4px;
  color: var(--enable-purple-border);
`

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 34px;
  margin: 0px 24px;
  background: var(--action-button);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: var(--white-text);
`

const DisableButton = styled(Button)`
  border: 1px solid var(--inactive-border);
  color: var(--inactive-header-text);
  background: none;
`

const EnableTokenPanel = ({
  instruction,
  subinstruction,
  buttonText,
  getToken,
  getSpender,
  onEnable
}) => {
  const [enabled, setEnabled] = React.useState(undefined)
  const [pending, setPending] = React.useState(false)

  // Fetch Initial State
  React.useEffect(() => {
    const fetch = async () => {
      // Token Locking Approval
      const provider = await providerService.getProvider()
      const owner = await providerService.getDefaultAccount(provider)
      const token = getToken()
      const spender = getSpender()
      const approved = await erc20Service.hasMaxApproval(provider, token, owner, spender)
      setEnabled(approved)

      if (approved) {
        onEnable()
      }
    }
    fetch()
  }, [])

  const Enable = () => (
    <React.Fragment>
      <CircleAndTextContainer>
        <ProgressCircle
          value={0} width={"45px"} height={"45px"}
          icon={(<Icon src={checkboxIcon} />)}
        />
        <Instruction>{instruction}</Instruction>
        <SubInstruction>{subinstruction}</SubInstruction>
      </CircleAndTextContainer>
      <Button
        onClick={async () => {
          setPending(true)
          const provider = await providerService.getProvider()

          let approved = false

          try {
            approved = await erc20Service.grantMaxApproval(
              provider, getToken(), getSpender()
            )
          } catch (e) {
            console.log(e)
          }

          if (approved) {
            onEnable()
            setEnabled(true)
          }

          setPending(false)
        }}
      >
        {buttonText}
      </Button>
    </React.Fragment>
  )

  const Pending = () => (
    <React.Fragment>
      <CircleAndTextContainer>
        <ProgressCircle
          value={66} width={"45px"} height={"45px"}
          rotate
        />
        <Instruction>{instruction}</Instruction>
        <SubInstruction>{subinstruction}</SubInstruction>
      </CircleAndTextContainer>
      <DisableButton>{buttonText}</DisableButton>
    </React.Fragment>
  )

  return (
    <PanelWrapper>
      {enabled === undefined ?
        <div>...</div> :
        pending === false ?
          <Enable /> :
          <Pending />
      }
    </PanelWrapper>
  )
}

export default EnableTokenPanel
