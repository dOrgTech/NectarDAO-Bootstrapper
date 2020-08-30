import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from "styled-components";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const snapshot1 = "BPT Snapshot 1";
const earnedRep = "Your Earned Reputation";
const snapshot2 = "BPT Snapshot 2";
const earnedNec = "Your Earned $NEC";
const unlockDate = "Nec Unlock Date";

function createData(period, status , snapshot1 , earnedRep , snapshot2 , earnedNec , unlockDate , claim) {
  return {period, status, snapshot1, earnedRep , snapshot2 , earnedNec , unlockDate , claim};
}

const rows = [
  createData('Period 1', "open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),
  createData('Period 2', "open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),
  createData('Period 3', "open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),
  createData('Period 4', "open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),
  createData('Period 10', "open", 100, 500, 200, "10,000" ,"01/09/2021", "unlock Nec"),

];

const useStyles = makeStyles({
  table: {
    minWidth: 700,

  },
});

const ActiveButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white-text);
  cursor: pointer;
  height: 80%;
  background-color:#92a8d1;
`;
const Tinyletters = styled.div`
font-size: 12px;
`
export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Period</StyledTableCell>
            <StyledTableCell align="right">status</StyledTableCell>
            <StyledTableCell align="right">BPT Snapshot 1</StyledTableCell>
            <StyledTableCell align="right">Your Earned Reputation</StyledTableCell>
            <StyledTableCell align="right">BPT Snapshot 2</StyledTableCell>
            <StyledTableCell align="right">Your Earned $NEC</StyledTableCell>
            <StyledTableCell align="right">Nec Unlock Date</StyledTableCell>
            <StyledTableCell align="right">Claim</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.period}>
              <StyledTableCell component="th" scope="row">
                {row.period}
              </StyledTableCell>
          <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.snapshot1} {`\n`} <Tinyletters>5%</Tinyletters></StyledTableCell>
              <StyledTableCell align="right">{row.earnedRep}  {`\n`} <Tinyletters>5%</Tinyletters></StyledTableCell>
              <StyledTableCell align="right">{row.snapshot2}  {`\n`} <Tinyletters>5%</Tinyletters></StyledTableCell>
              <StyledTableCell align="right">{row.earnedNec}  {`\n`} <Tinyletters>$2000</Tinyletters></StyledTableCell>
              <StyledTableCell align="right">{row.unlockDate}  {`\n`} <Tinyletters>00:00:00 UTC</Tinyletters></StyledTableCell>
              <StyledTableCell align="right"><ActiveButton>Unlock Nec</ActiveButton></StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}