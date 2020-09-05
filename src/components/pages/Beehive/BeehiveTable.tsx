import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";

function createData(period, status , snapshot1 , earnedRep , snapshot2 , earnedNec , unlockDate , claim) {
  return {period, status, snapshot1, earnedRep , snapshot2 , earnedNec , unlockDate , claim};
}

const rows = [
  createData('Period 1', "Open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),
  createData('Period 2', "Open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),
  createData('Period 3', "Open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),
  createData('Period 4', "Open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),
  createData('Period 10', "Open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),

];

const Tinyletters = styled.div`
font-size: 12px;
color:#A9ABCB;
`
const TableWrapper = styled.div`
width:1100px;
justify-content:center;
margin: 50px auto;

  .MuiPaper-root {
    background: rgba(40, 50, 74, 0.5);
  }

  .MuiTableCell-root {
    border: none;
  }
`

const StyledTableBody = styled(TableBody)`
  .MuiTableRow-root {
    border-top: 1px solid #313B55;
    height: 82px;
  }
`

const Orangeletters = styled(Typography)`
  font-size: 15px;
  font-weight:bold;
`
const StepNumber = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-right: 8px;
`

const StatusCell = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`

const HeaderText = styled(Typography)`
  color: rgba(169, 171, 203, 0.7) !important;
`

export default function CustomizedTables() {

  return (
    <TableWrapper>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left"><HeaderText variant={'h6'}>Period</HeaderText></TableCell>
            <TableCell align="left"><HeaderText variant={'h6'}>Status</HeaderText></TableCell>
            <TableCell align="left"><HeaderText variant={'h6'}>BPT Snapshot 1</HeaderText></TableCell>
            <TableCell align="left"><HeaderText variant={'h6'}>Your Earned Reputation</HeaderText></TableCell>
            <TableCell align="left"><HeaderText variant={'h6'}>BPT Snapshot 2</HeaderText></TableCell>
            <TableCell align="left"><HeaderText variant={'h6'}>Your Earned $NEC</HeaderText></TableCell>
            <TableCell align="left"><HeaderText variant={'h6'}>Nec Unlock Date</HeaderText></TableCell>
            <TableCell align="left"><HeaderText variant={'h6'}>Claim</HeaderText></TableCell>

          </TableRow>
        </TableHead>
        <StyledTableBody>
          {rows.map((row) => (
            <TableRow key={row.period}>
              <TableCell component="th" scope="row">
                <Typography variant={'body2'}>{row.period}</Typography>
              </TableCell>
              <TableCell align="right"><StatusCell><StepNumber align="left" style={{ background: row.status === 'Open'? '#F2994A': '#646A7A' }}/><Typography variant={'body2'}>{row.status}</Typography></StatusCell></TableCell>
              <TableCell align="left"><Orangeletters  variant={"h4"} color={'primary'}>{row.snapshot1} </Orangeletters>{`\n`} <Tinyletters>5%</Tinyletters></TableCell>
              <TableCell align="left"><Orangeletters variant={"h4"} color={'primary'}>{row.earnedRep} </Orangeletters> {`\n`} <Tinyletters>5%</Tinyletters></TableCell>
              <TableCell align="left"><Orangeletters variant={"h4"} color={'primary'}> {row.snapshot2} </Orangeletters> {`\n`} <Tinyletters>5%</Tinyletters></TableCell>
              <TableCell align="left"><Orangeletters variant={"h4"} color={'primary'}>{row.earnedNec}  </Orangeletters>{`\n`} <Tinyletters>$2000</Tinyletters></TableCell>
              <TableCell align="left">{row.unlockDate}  {`\n`} <Tinyletters>00:00:00 UTC</Tinyletters></TableCell>
              <TableCell align="left"><Button variant={'outlined'} color={'primary'}>Unlock Nec</Button></TableCell>
            </TableRow>
          ))}
        </StyledTableBody>
      </Table>
    </TableContainer>
    </TableWrapper>
  );
}