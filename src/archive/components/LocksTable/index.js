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
  { id: 'lockingPeriod', label: 'Locking Period', minWidth: 20 },
  { id: 'lockId', label: 'Lock ID', minWidth: 20 },
  { id: 'amount', label: 'Amount', minWidth: 20 },
  { id: 'duration', label: 'Duration', minWidth: 20 },
  { id: 'releasable', label: 'Releaseable', minWidth: 100 },
  { id: 'released', label: 'Is Released?', minWidth: 20 }
]

export default function AuctionOverviewTable(props) {
  const {
    data
  } = props

  const rows = []

  console.log(data)
  Object.keys(data).forEach((key) => {
    let { lockingPeriod, lockId, duration, releasable, released } = data[key]
    const amount = numberLib.toEther(data[key].amount)

    if (released) {
      released = 'Yes'
    } else {
      released = 'No'
    }

    rows.push({
      lockingPeriod,
      lockId,
      amount,
      duration,
      releasable,
      released
    })
  })

  console.log(rows)


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
