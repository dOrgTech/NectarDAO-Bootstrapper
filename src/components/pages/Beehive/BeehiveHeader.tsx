import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { RootStore } from "stores/Root";
import Tooltip from "components/common/Tooltip";
import styled from "styled-components";
import { tooltip } from "strings";
import { Title } from "components/common/beehive/Title";
import { Typography, Link, Box, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import BeehiveGuide from "./BeehiveGuide";
import { NecRewardsDTO, PoolDataDTO } from "types";

const Statsbox = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 255px;
  padding: 15px 20px 15px 0px;
  box-sizing: border-box;

  &::before {
    content: "";
    width: 60px;
    height: 3px;
    background: #e2a907;
    position: relative;
    top: 0px;
    margin: ${({ centered }: { centered: boolean }) => centered && 'auto'}
  }
`;

const InstructBox = styled(Box)`
  background: rgba(5, 15, 22, 0.5);
  position: relative;
  border: 1px solid #404b67;
  box-sizing: border-box;
  border-radius: 6px;
  width: 255px;
  height: 148px;
  padding: 14px 16px;

  ${({ shaped }: { shaped: boolean }) => shaped && `
    &::after {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    left: calc(100% - 1px);
    top: 0;
    border: 74px solid transparent;
    border-left: 16px solid #041019;
  }

  &::before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    left: 100%;
    top: 0;
    border: 74px solid transparent;
    border-left: 16px solid #404b67;
  }

  @media (max-width: 599px) {
    &::after {
      content: "";
      position: absolute;
      height: 0;
      width: 0;
      left: 0;
      top: calc(100% - 1px);
      border: 127.5px solid transparent;
      border-top: 16px solid #041019;
    }

    &::before {
      content: "";
      position: absolute;
      height: 0;
      width: 0;
      left: 0;
      top: 100%;
      border: 127.5px solid transparent;
      border-top: 16px solid #404b67;
    }
  `}
  }
`;

const SmallSubtitle = styled(Typography)`
  color: #646a7a !important;
  opacity: 0.76;
`;

const InstructText = styled(Typography)`
  padding-top: 16px;
  color: rgba(169, 171, 203, 0.8) !important;
`;

const StepNumber = styled(Box)`
  width: 32px;
  height: 32px;
  margin-right: 16px;
  background: linear-gradient(334.96deg, #112233 28.51%, #061620 129.65%);
  border-radius: 100px;
`;

const instructions = [
  {
    title: "Stake",
    text: "Stake into the NEC/wETH Balancer Pool to Receive BPT.",
    shaped: true
  },
  {
    title: "Earn",
    text: "Earn $NEC Rewards Weekly, Locked for 12 months.",
    shaped: true
  },
  {
    title: "EARN",
    text: "Earn $BAL Rewards Weekly.",
    shaped: true
  },
  {
    title: "Claim",
    text: "Unlock Your $NEC Rewards in 12 Months.",
    shaped: false
  },
];

interface InstructionBoxProps {
  number: number;
  title: string;
  text: string;
  shaped?: boolean;
}

const InstructionBox: React.FC<InstructionBoxProps> = ({
  number,
  title,
  text,
  shaped
}) => {

  return (
    <Grid item container xs={12} sm={6} md={3} justify='center'>
      <InstructBox shaped={shaped}>
        <Box display="flex" alignItems="center">
          <StepNumber>
            <Typography variant={"subtitle1"} color={"textPrimary"}>
              {number}
            </Typography>
          </StepNumber>
          <Typography
            variant={"body2"}
            align={"left"}
            color={"textPrimary"}
            style={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
        </Box>
        <InstructText align={"left"} variant={"body2"}>
          {text}
        </InstructText>
      </InstructBox>
    </Grid>
  );
};

interface StatisticsBoxProps {
  title: string;
  number: number;
  subnumber?: number;
}

const StatisticsBox: React.FC<StatisticsBoxProps> = ({
  title,
  number,
  subnumber,
}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Grid item container xs={12} sm={6} md={3} justify='center'>
      <Statsbox centered={!matches}>
        <Typography variant={"body1"} align={matches? "left": 'center'} color={"textSecondary"}>
          {title}
        </Typography>
        <Typography variant={"h3"} align={matches? "left": 'center'} color={"textPrimary"}>
          {number ? `${number}` : "0"}
        </Typography>
        {typeof subnumber === "number" && (
          <SmallSubtitle
            variant={"body2"}
            align={matches? "left": 'center'}
            color={"textSecondary"}
          >
            {subnumber ? `$${subnumber}` : "$0"}
          </SmallSubtitle>
        )}
      </Statsbox>
    </Grid>
  );
};

const BigHeader = inject("root")(
  observer((props) => {
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [poolData, setPoolData] = useState<PoolDataDTO>();
    const [necRewards, setNecRewards] = useState<NecRewardsDTO>();

    const { beehiveStore } = props.root as RootStore;

    useEffect(() => {
      setPoolData(beehiveStore.poolData);
    }, [beehiveStore.poolData]);

    useEffect(() => {
      setNecRewards(beehiveStore.necRewards);
    }, [beehiveStore.necRewards]);

    const apy = poolData && poolData.apy && Number(poolData.apy.toFixed(4));
    const necPrice =
      poolData && poolData.necPrice && Number(poolData.necPrice.toFixed(4));
    const totalRewards =
      necRewards &&
      necRewards.total_nec &&
      Number(necRewards.total_nec.toFixed(4));
    const remainingRewards =
      necRewards &&
      necRewards.remaining_nec &&
      Number(necRewards.remaining_nec.toFixed(4));
    const totalRewardsInUsd =
      totalRewards && necPrice && Number((totalRewards * necPrice).toFixed(4));
    const remainingRewardsInUsd =
      remainingRewards &&
      necPrice &&
      Number((remainingRewards * necPrice).toFixed(4));

    return (
      <>
        <Box width="100%" textAlign="center">
          <Title text={"Nectar Beehive"} afterElement={true} />
          <Box display="flex" justifyContent="center">
            <Box maxWidth="1110px" width="100%">
              <Grid container direction="column" alignItems="center">
                <Box maxWidth="445px" paddingX='25px' boxSizing='border-box'>
                  <Tooltip
                    title=""
                    content={tooltip.necDAOBasics}
                    position="right top"
                  />
                  <Typography color={"textSecondary"} variant={"subtitle2"}>
                    Earn $NEC $BAL and Reputation Rewards for Staking into The
                    Balancer NEC/wEth Pool
                  </Typography>
                </Box>

                <Box width="100%" padding="65px 0 2.5% 0" textAlign="center">
                  <Grid
                    container
                    justify="space-between"
                  >
                    <StatisticsBox
                      title="Total Nec Rewards"
                      number={totalRewards}
                      subnumber={totalRewardsInUsd}
                    />
                    <StatisticsBox
                      title="Remaining NEC Rewards"
                      number={remainingRewards}
                      subnumber={remainingRewardsInUsd}
                    />
                    <StatisticsBox title="NEC Price" number={necPrice} />
                    <StatisticsBox title="APY" number={apy} />
                  </Grid>
                </Box>

                <Box width="100%">
                  <Grid container justify="space-between" spacing={4}>
                    {instructions.map((instruction, i) => (
                      <InstructionBox number={i + 1} {...instruction} />
                    ))}
                  </Grid>
                </Box>

                <Box paddingX='25px' boxSizing='border-box' paddingTop='16px'>
                  <Typography variant={"body2"} color={"primary"}>
                    <Link
                      underline={"always"}
                      onClick={() => setIsGuideOpen(true)}
                    >
                      Read The Full Beehive Guide Here
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Box>

        <BeehiveGuide
          open={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
        />
      </>
    );
  })
);

export default BigHeader;
