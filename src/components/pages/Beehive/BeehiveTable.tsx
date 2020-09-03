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
import { Typography, Link } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.text.secondary,
    background: theme.palette.secondary.main,   
  },
  body: {
  },
}))(TableCell);



const StyledTableRow = withStyles((theme) => ({
  root: {
    background:theme.palette.secondary.main,
    
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
    borderBottom: '1px solid blue'
  },
});

const ActiveButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #E2A907;
  border: 1px solid #E2A907;
  cursor: pointer;
  height: 100%;
  width:
  
`;
const Tinyletters = styled.div`
font-size: 12px;
color:#A9ABCB
`
const TableWrapper = styled.div`
width:1100px;
justify-content:center;
margin: 50px auto;
`
const Orangeletters = styled(Typography)`
font-size 15px;

color:#E2A907;
font-weight:bold;
`
const StepNumber = styled.div`
  width: 10px;
  height: 10px;
  background: #E2A907;
  border-radius: 10px;
`
const Gap = styled.div`
margin-left:20px;`

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableWrapper>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Period</StyledTableCell>
            <StyledTableCell align="left"><Gap>status</Gap></StyledTableCell>
            <StyledTableCell align="left">BPT Snapshot 1</StyledTableCell>
            <StyledTableCell align="left">Your Earned Reputation</StyledTableCell>
            <StyledTableCell align="left">BPT Snapshot 2</StyledTableCell>
            <StyledTableCell align="left">Your Earned $NEC</StyledTableCell>
            <StyledTableCell align="left">Nec Unlock Date</StyledTableCell>
            <StyledTableCell align="left">Claim</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.period}>
              <StyledTableCell component="th" scope="row">
                {row.period}
              </StyledTableCell>
          <StyledTableCell align="right"><StepNumber align="left"></StepNumber>{row.status}</StyledTableCell>  
              <StyledTableCell align="left"><Orangeletters  variant={"h4"} color={'primary'}>{row.snapshot1} </Orangeletters>{`\n`} <Tinyletters>5%</Tinyletters></StyledTableCell>
              <StyledTableCell align="left"><Orangeletters variant={"h4"}>{row.earnedRep} </Orangeletters> {`\n`} <Tinyletters>5%</Tinyletters></StyledTableCell>
              <StyledTableCell align="left"><Orangeletters variant={"h4"}> {row.snapshot2} </Orangeletters> {`\n`} <Tinyletters>5%</Tinyletters></StyledTableCell>
              <StyledTableCell align="left"><Orangeletters variant={"h4"}>{row.earnedNec}  </Orangeletters>{`\n`} <Tinyletters>$2000</Tinyletters></StyledTableCell>
              <StyledTableCell align="left">{row.unlockDate}  {`\n`} <Tinyletters>00:00:00 UTC</Tinyletters></StyledTableCell>
              <StyledTableCell align="left"><ActiveButton>Unlock Nec</ActiveButton></StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </TableWrapper>
  );
}