import React from "react";
import { useLocation } from "react-router-dom";
import { observer, inject } from "mobx-react";
import NectarLogoHeader from "assets/svgs/NecLogo.svg";
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import { BeehiveCountdown } from 'components/common/beehive/Countdown'

const Header = styled.div`
  position: fixed;
  display: flex;
  z-index: 10000;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background: transparent;
`;

const HeaderButton = styled.div`
  padding-right: 166px;
  .MuiButton-outlinedPrimary {
    color: #ffffff !important;
  }
`;

const Logo = styled.img`
  padding-left: 166px;
  height: 50px;
  width: 50px;
`;

export const AppHeader = inject("root")(
  observer((props) => {
    const { beehiveStore } = props.root;

    const { showCountdown } = beehiveStore;

    console.log(showCountdown)

    return (
      <Header>
        <Logo src={NectarLogoHeader} />
        <HeaderButton>
          {showCountdown ? (
            <BeehiveCountdown/>
          ) : (
            <Button variant={"outlined"} color={"primary"}>
              <Typography
                variant={"body2"}
                align={"left"}
                color={"textPrimary"}
                style={{ fontWeight: "bold", marginRight: "5px" }}
              >
                DeversiFi
              </Typography>{" "}
              <ArrowForward fontSize={"small"} />
            </Button>
          )}
        </HeaderButton>
      </Header>
    );
  })
);
