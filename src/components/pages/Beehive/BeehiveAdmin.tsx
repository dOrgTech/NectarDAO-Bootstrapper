import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import {
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.Ls.en.weekStart = 1;

const InputsContainer = styled.div`
  margin: auto;
  padding: 50px;
  max-height: 250px;
  overflow-y: auto;
  background: #172333;
  min-width: 300px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: "25px";
  justify-content: center;
  align-items: center;
`;

const PickerWrapper = styled.div`
  .MuiPaper-root {
    background-color: #172333 !important;
  }
`;

const TableWrapper = styled.div`
  width: 90%;
  justify-content: center;
  margin: 50px auto;

  .MuiPaper-root {
    background: rgba(40, 50, 74, 0.5);
  }

  .MuiTableCell-root {
    border: none;
  }
`;

const StepNumber = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-right: 8px;
`;

const StatusCell = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const HeaderText = styled(Typography)`
  color: rgba(169, 171, 203, 0.7) !important;
`;

interface TableData {
  id: string;
  period: string;
  status: string;
  endDate: string;
  startDate: string;
  unlockDate: string;
  contractAddress: string;
  snapshotDate: string;
  necToDistribute: string;
}

interface TableDataDTO {
  id: string;
  week_number: string;
  nec_to_distribute: string;
  start_date: string;
  nec_earned: string;
  closed: boolean;
  fk_period_id: string;
  snapshot_date: string;
  bpt_balance: string;
  contract_address: string;
  unlock_date: string;
  end_date: string;
}

const formatDate = (dateString: string) => {
  return dayjs.utc(dateString).format("YYYY-MM-DD HH:mm:ss");
};

const tableDataMapper = (tableDataDtos: TableDataDTO[]): TableData[] => {
  return tableDataDtos.map((dto) => {
    const {
      week_number,
      nec_to_distribute,
      start_date,
      closed,
      snapshot_date,
      contract_address,
      unlock_date,
      end_date,
      id,
    } = dto;
    return {
      period: week_number,
      status: closed ? "Closed" : "Open",
      unlockDate: unlock_date && `UTC ${formatDate(unlock_date)}`,
      contractAddress: contract_address,
      snapshotDate: snapshot_date && `UTC ${formatDate(snapshot_date)}`,
      necToDistribute: nec_to_distribute,
      endDate: end_date && `UTC ${formatDate(end_date)}`,
      startDate: start_date && `UTC ${formatDate(start_date)}`,
      id,
    };
  });
};

export const BeehiveAdmin = inject("root")(
  observer((props) => {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;
    const history = useHistory();
    const minDate = dayjs();

    const [weeks, setWeeks] = useState(0);
    const [scheduleStartDate, setScheduleStartDate] = useState(minDate);
    const [necPerWeek, setNecPerWeek] = useState({});
    const [tableDataDtos, setTableDataDtos] = useState<TableDataDTO[]>([]);

    const rows = tableDataMapper(tableDataDtos);

    const fetchWeekData = async () => {
      const response = await fetch(`${process.env.REACT_APP_SNAPSHOT_API_URL}/week/all`);
      const json = await response.json();
      if (!json.error) {
        setTableDataDtos(json);
      }
    };

    useEffect(() => {
      fetchWeekData();
    }, []);

    const onSchedule = async () => {
      const necs = Object.values(necPerWeek).slice(0, weeks);

      try {
        await fetch(`${process.env.REACT_APP_SNAPSHOT_API_URL}/period`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            necPerWeek: necs,
            weeks,
            start_date: scheduleStartDate,
          }),
        });
        await fetchWeekData();
        setNecPerWeek({});
        setWeeks(0);
      } catch (error) {
        console.log(error);
      }
    };

    const takeSnapshot = async (weekId: string) => {
      try {
        await fetch(`${process.env.REACT_APP_SNAPSHOT_API_URL}/snapshot/take/${weekId}`, {
          method: "POST",
        });
        await fetchWeekData();
      } catch (error) {
        console.log(error);
      }
    };

    const publishResults = async (weekId: string) => {
      try {
        await fetch(`${process.env.REACT_APP_SNAPSHOT_API_URL}/snapshot/publish/${weekId}`, {
          method: "POST",
        });
        await fetchWeekData();
      } catch (error) {
        console.log(error);
      }
    };

    const getSnapshotCsv = async (weekId: string) => {
      window.open(`${process.env.REACT_APP_SNAPSHOT_API_URL}/snapshot/csv/${weekId}`);
    };

    return (
      <>
        {" "}
          <PageWrapper>
            <InputsContainer>
              <Typography variant={"h4"} color={"primary"}>
                Schedule New Period
              </Typography>
              <Box paddingY='25px'>
                <PickerWrapper>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      minDate={minDate}
                      value={scheduleStartDate}
                      onChange={(date) => setScheduleStartDate(date as any)}
                    />
                  </MuiPickersUtilsProvider>
                </PickerWrapper>
              </Box>
              <TextField
                type={"number"}
                label={"Weeks"}
                value={weeks}
                inputProps={{
                  min: 0,
                }}
                onChange={(e) => setWeeks(Number(e.currentTarget.value))}
              />
              {Array.from(Array(weeks).keys()).map((x) => {
                return (
                  <Box paddingY='25px'>
                    <TextField
                      inputProps={{
                        min: 0,
                      }}
                      key={`nec-${x}`}
                      type={"number"}
                      label={`NEC to distribute on week #${x + 1}`}
                      value={necPerWeek[x]}
                      onChange={(e) =>
                        setNecPerWeek({
                          ...necPerWeek,
                          [`${x}`]: Number(e.currentTarget.value),
                        })
                      }
                    />
                  </Box>
                );
              })}
              <Box paddingY='25px'>
                <Button
                  variant={"outlined"}
                  color={"primary"}
                  onClick={onSchedule}
                  fullWidth={true}
                >
                  Schedule
                </Button>
              </Box>
            </InputsContainer>
          </PageWrapper>
        <Box>
          <TableWrapper>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <HeaderText variant={"h6"}>Period</HeaderText>
                    </TableCell>
                    <TableCell align="left">
                      <HeaderText variant={"h6"}>Start Date</HeaderText>
                    </TableCell>
                    <TableCell align="left">
                      <HeaderText variant={"h6"}>Status</HeaderText>
                    </TableCell>
                    <TableCell align="left">
                      <HeaderText variant={"h6"}>Nec To Distribute</HeaderText>
                    </TableCell>
                    <TableCell align="left">
                      <HeaderText variant={"h6"}>Nec Unlock Date</HeaderText>
                    </TableCell>
                    <TableCell align="left">
                      <HeaderText variant={"h6"}>Snapshot Date</HeaderText>
                    </TableCell>
                    <TableCell align="left">
                      <HeaderText variant={"h6"}>Timelock Contract Address</HeaderText>
                    </TableCell>
                    <TableCell align="left">
                      <HeaderText variant={"h6"}>Actions</HeaderText>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    const weekIsFuture = dayjs
                      .utc(row.startDate)
                      .isAfter(dayjs.utc());

                      console.log(dayjs
                        .utc(row.startDate).format())

                        console.log(dayjs.utc().format())

                      console.log("HERE ", weekIsFuture)
                    return (
                      <TableRow key={row.period}>
                        <TableCell component="th" scope="row">
                          <Typography variant={"body2"}>
                            Period {row.period}
                          </Typography>
                          <Typography variant={"h6"}>
                            Ends UTC {(row.endDate)}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          {(row.startDate) || "-"}
                        </TableCell>
                        <TableCell align="right">
                          <StatusCell>
                            <StepNumber
                              style={{
                                background:
                                  row.status === "Open" ? "#F2994A" : "#646A7A",
                              }}
                            />
                            <Typography variant={"body2"}>
                              {row.status}
                            </Typography>
                          </StatusCell>
                        </TableCell>
                        <TableCell align="left">
                          {row.necToDistribute}
                        </TableCell>
                        <TableCell align="left">
                          {row.unlockDate? (row.unlockDate) : "-"}
                        </TableCell>
                        <TableCell align="left">
                          {row.snapshotDate? (row.snapshotDate) : "-"}
                        </TableCell>
                        <TableCell align="left" style={{ wordBreak: 'break-word' }}>
                          {row.contractAddress? row.contractAddress : "-"}
                        </TableCell>
                        <TableCell align="left">
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="space-evenly"
                          >
                            <Button
                              variant={"outlined"}
                              color={"primary"}
                              onClick={() => takeSnapshot(row.id)}
                              disabled={!!row.snapshotDate || weekIsFuture}
                            >
                              Take Snapshot
                            </Button>
                            <Button
                              variant={"outlined"}
                              color={"primary"}
                              onClick={() => publishResults(row.id)}
                              disabled={row.status !== "Open" || weekIsFuture}
                            >
                              Publish Results and Close
                            </Button>
                            <Button
                              variant={"outlined"}
                              color={"primary"}
                              onClick={() => getSnapshotCsv(row.id)}
                              disabled={!row.snapshotDate}
                            >
                              Get Snapshot CSV
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </TableWrapper>
        </Box>
      </>
    );
  })
);
