import React, { useState } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import NECLogo from "assets/svgs/necdao-glow.svg";
import MetamaskLogo from "assets/svgs/metamask.svg";
import LedgerLogo from "assets/svgs/ledger.svg";
import ActiveButton from "./buttons/ActiveButton";
import LedgerModal from "./LedgerModal";
import { Wallet } from "../../stores/Provider";
import { Typography } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

const ConnectWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media (max-width: 480px) {
    margin:0 auto;
    width:200px;
  }
`;

const ConnectBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 541px;
  height: 364px;
  
`;

const SubTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #7a7f8e;
  margin-bottom: 40px;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 30px;
  justify-content: center;
  @media (max-width: 600px) {
    
    
  }
`;

const ConnectButton = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background: rgba(40, 50, 74, 0.5);
  width: 255px;
  border-radius: 6px;
  height: 104px;
  @media (max-width: 600px) {
    margin-top:10px;
  }
`;

const MetamaskWalletLogo = styled.img`
  width: 150px;
`;

const LedgerWalletLogo = styled.img`
  width: 135px;
`;

const Alert = styled.div`
  background: linear-gradient(
    315deg,
    rgba(255, 136, 0, 0.2) 8.75%,
    rgba(226, 169, 7, 0.2) 100%
  );
  color: #f2994a;
  height: auto;
  width: 100%;
  border-radius: 6px;
`;

const AlertContent = styled.div`
  white-space: pre-wrap;
  padding: 12px;
  display: flex;
  justify-content: center;
`;

const WarningText = styled.span`
  margin: 0;
  font-family: Sen;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
`;
const Metamask = styled.div`
margin-right:15px;
@media (max-width: 480px) {
  margin-right:0px;
}
`



const ConnectWallet = inject("root")(
  observer((props) => {
    const [modal, toggleModal] = useState(false);
    return (
      <ConnectWrapper>
        <ConnectBody>
          <Typography variant={'subtitle2'} color={'textSecondary'}>
            Please connect your Ethereum wallet to continue
          </Typography>
          <SubTitle></SubTitle>
          <Buttons>
          <Metamask>
              <ConnectButton
                onClick={() => {
                  props.root.providerStore.setWallet(Wallet.METAMASK);
                }}
              >
                <MetamaskWalletLogo src={MetamaskLogo} />
              </ConnectButton>
            </Metamask>
            <div>
              <ConnectButton
                onClick={() => {
                  toggleModal(true);
                }}
              >
                <LedgerWalletLogo src={LedgerLogo} />
              </ConnectButton>
            </div>
          </Buttons>
          {modal && <LedgerModal toggleModal={toggleModal} />}
          {props.warning && (
            <Alert>
              <AlertContent>
                <WarningIcon
                  style={{
                    padding: "5px 12px 0 0",
                    color:
                      "linear-gradient(315deg, #FF8800 8.75%, #E2A907 100%);",
                  }}
                />
                <WarningText>
                  Warning: You are on the wrong network, please switch to
                  Ethereum mainnet
                </WarningText>
              </AlertContent>
            </Alert>
          )}
        </ConnectBody>
      </ConnectWrapper>
    );
  })
);

export default ConnectWallet;