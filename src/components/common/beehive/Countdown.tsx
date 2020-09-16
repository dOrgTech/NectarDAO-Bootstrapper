import React, { useEffect, useState } from 'react'
import { observer, inject } from "mobx-react";
import Countdown from 'react-countdown';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { TableData } from 'types';
import { RootStore } from 'stores/Root';
import { Box, Typography } from '@material-ui/core';
import { TimeIcon } from '../Icons/time';

const CountdownBody = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: #28324A;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Bold = styled.span`
  font-weight: bold !important;
  color: #FFFFFF !important;
`

export const BeehiveCountdown = inject("root")(
  observer((props) => {
    const { beehiveStore } = props.root as RootStore;

    const nextWeek = beehiveStore.tableData.find((row) => row.status === 'Open')

    console.log(nextWeek)

    return (
      nextWeek && <Countdown 
        date={dayjs(nextWeek.endDate).unix() * 1000}
        renderer={({ hours, days, minutes }) => {
          return (
            <CountdownBody>
              <Box display='flex'>
                <Box display='flex' alignItems='flex-end' paddingRight='5px'><TimeIcon/></Box>
                <Typography color='textSecondary' variant='body1' style={{ fontFamily: 'Montserrat', letterSpacing: 1 }}>
                  <Bold>{days}</Bold>D:<Bold>{hours}</Bold>H:<Bold>{minutes}</Bold>m
                </Typography> 
              </Box>
              <Typography color='textSecondary' variant='body2' style={{ fontFamily: 'Montserrat' }}>
                Period {nextWeek.period} of {beehiveStore.tableData.length}
              </Typography>
            </CountdownBody>
          )
        }}
      />
    );
  })
);