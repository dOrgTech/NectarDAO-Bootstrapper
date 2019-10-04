import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import * as numberLib from 'core/libs/lib-number-helpers'
import { styles } from './styles.scss'


const columns = [
  { id: 'auction', label: 'Auction #', minWidth: 20 },
  { id: 'userBid', label: 'You Have Bid', minWidth: 50 },
  { id: 'totalBid', label: 'Total Bid', minWidth: 50 },
  { id: 'status', label: 'Status', minWidth: 50 }
]

export default function AuctionOverviewTable(props) {
  const {
    data, user
  } = props

  const { totalBids, bids, statusData } = data

  const rows = []

  Object.keys(bids).forEach((key) => {
    const auction = key

    let userBid
    if (bids[key][user]) {
      userBid = numberLib.toEther(bids[key][user])
    } else {
      userBid = '0'
    }

    const totalBid = numberLib.toEther(totalBids[key])
    const status = statusData[key]

    rows.push({
      auction,
      userBid,
      totalBid,
      status
    })
  })


  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  function handleChangePage(event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={styles.root}>
      <div className={styles.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page'
        }}
        nextIconButtonProps={{
          'aria-label': 'next page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
