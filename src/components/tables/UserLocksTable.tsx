import React from 'react'
import { inject, observer } from "mobx-react";
import { TableWrapper, RowWrapper, InactiveRowWrapper, Row, CellWrapper, GreyCell } from 'components/common/Table'
import 'components/common/Table.scss'
import * as helpers from 'utils/helpers'
import LoadingCircle from '../common/LoadingCircle';
import TableButton from 'components/common/buttons/TableButton'
import DisabledText from 'components/common/DisabledText'
import Popup from "reactjs-popup";
import ExtendLockPopup from '../common/panels/ExtendLockPopup';
import 'components/common/Modal.scss'

import BigNumber from "utils/bignumber"
import { Lock, LockStaticParams } from 'types'
import { RootStore } from 'stores/Root';
type Scores = Map<number, BigNumber>
type Locks = Map<string, Lock>

interface ExtendData {
    lockId: string
}

interface ReleaseData {
    beneficiary: string,
    lockId: string,
    releasable: number,
    released: boolean,
    releasableDisplay: string
}

class TableRow {
    constructor(
        public startPeriod: number,
        public amount: string,
        public duration: string,
        public extendData: ExtendData,
        public releaseData: ReleaseData
    ) { }
}

@inject('root')
@observer
class UserLocksTable extends React.Component<any, any> {
    generateTableRows(inputData: Locks, userAddress) {
        const tableData: TableRow[] = [] as TableRow[]

        inputData.forEach((lock, key, map) => {
            console.log(key, lock);

            const durationDisplay = `${lock.periodDuration} ${helpers.getMonthsSuffix(lock.periodDuration)}`

            const weiAmount = lock.amount.toString()
            const displayAmount = `${helpers.roundValue(helpers.fromWei(weiAmount))} NEC`

            const releasableDisplay = helpers.timestampToDate(lock.releasable)

            const row: TableRow = {
                startPeriod: lock.lockingPeriod,
                amount: displayAmount,
                duration: durationDisplay,
                extendData: {
                    lockId: lock.id
                },
                releaseData: {
                    beneficiary: userAddress,
                    lockId: lock.id,
                    releasable: lock.releasable,
                    released: lock.released,
                    releasableDisplay
                },
            }

            tableData.push(row)
        })

        tableData.reverse()
        return tableData
    }

    release(beneficiary, lockId) {
        const { lockNECStore } = this.props.root as RootStore as RootStore
        lockNECStore.release(beneficiary, lockId)
    }

    extend(lockId, periodsToExtend, batchId) {
        const { lockNECStore } = this.props.root as RootStore as RootStore
        lockNECStore.extendLock(lockId, periodsToExtend, batchId)
    }

    renderNoDataTable() {
        return (
            <TableWrapper>
                <InactiveRowWrapper>
                    <Row>
                    </Row>
                </InactiveRowWrapper>
            </TableWrapper>
        )
    }

    generateCell(key, value) {
        const { timeStore, lockNECStore, extendLockFormStore, providerStore } = this.props.root as RootStore
        const now = timeStore.currentTime

        const userAddress = providerStore.getDefaultAccount()

        if (key === 'releaseData') {
            const { released, releasable, releasableDisplay, beneficiary, lockId } = value

            const isReleasable = (now > releasable)
            const isReleaseActionPending = lockNECStore.isReleaseActionPending(lockId)


            if (!isReleasable) {
                return <div>{releasableDisplay}</div>
            }

            if (released) {
                return <DisabledText>Released</DisabledText>
            }

            if (!isReleaseActionPending) {
                return <TableButton onClick={() => { this.release(beneficiary, lockId) }}>Release</TableButton>
            }

            if (isReleaseActionPending) {
                return <TableButton>Pending...</TableButton>
            }

            return <DisabledText>Error</DisabledText>
        }

        if (key === 'extendData') {
            const { lockId } = value

            const isLockingOver = lockNECStore.isLockingEnded()
            const remainingPeriods = lockNECStore.getPeriodsRemaining()
            const isPendingAction = lockNECStore.isExtendLockActionPending(lockId)
            const periodsToExtend = extendLockFormStore.duration
            const batchId = lockNECStore.getActiveLockingPeriod()

            //TODO: Revert to proper logic
            // if (isLockingOver && !isPendingAction) {
            //     return <DisabledText>-</DisabledText>
            // }

            if (isPendingAction) {
                return <TableButton>Pending...</TableButton>
            }

            if (!isPendingAction) {
                // This is where you put the popus
                return (
                    <Popup trigger={<TableButton>Extend</TableButton>} modal closeOnDocumentClick closeOnEscape position="right center">
                        <div className="modalform modalinput">
                            <ExtendLockPopup className="modalinput modalform" rangeStart={1} />
                            <TableButton className="modalinput modalform" onClick={() => { this.extend(lockId, periodsToExtend, batchId) }}>Extend</TableButton>
                        </div>
                    </Popup>
                )
            }

            // if (!isLockingOver && !isPendingAction) {
            //     // This is where you put the popus
            //     return (<Popup trigger={<button>Extend</button>} position="right center">
            //         <div>
            //             <TableButton onClick={() => { console.log('make the modal appear and pass in this lockId') }}>Extend</TableButton>
            //         </div>
            //     </Popup>)
            // }

            if (isPendingAction) {
                // This is where you put the popus
                return <TableButton>-</TableButton>
            }

            return <DisabledText>Error</DisabledText>
        }

        return value
    }

    render() {
        const { highlightTopRow } = this.props
        const { lockNECStore, providerStore } = this.props.root as RootStore as RootStore

        const userAddress = providerStore.getDefaultAccount()
        const userLocksLoaded = lockNECStore.isUserLockInitialLoadComplete(userAddress)


        let rows
        let hasLocks = false

        if (userLocksLoaded) {
            const userLocks = lockNECStore.getUserTokenLocks(userAddress)

            userLocks.size > 0 ? hasLocks = true : hasLocks = false
            if (hasLocks) {
                rows = this.generateTableRows(userLocks, userAddress)
            }
        }

        const columns = [
            { name: 'Period #', key: 'startPeriod', width: '20%', align: 'left' },
            { name: 'Amount', key: 'amount', width: '20%', align: 'left' },
            { name: 'Duration', key: 'duration', width: '20%', align: 'left' },
            { name: 'Extend', key: 'extendData', width: '20%', align: 'left' },
            { name: 'Release', key: 'releaseData', width: '20%', align: 'left' },
        ]

        return (
            <React.Fragment>
                <RowWrapper>
                    <Row>
                        {columns.map((column, index) => (
                            <GreyCell key={`col-${index}`} width={column.width} align={column.align}>
                                {column.name}
                            </GreyCell>
                        ))}
                    </Row>
                </RowWrapper>
                {userLocksLoaded && hasLocks ?
                    <TableWrapper>
                        {rows.map((row, index) => {
                            const highlight = !highlightTopRow || index === 0
                            const Cell = highlight ? CellWrapper : GreyCell
                            const Wrapper = highlight ? RowWrapper : InactiveRowWrapper
                            return (
                                <Wrapper key={`wrapper-${index}`} >
                                    <Row key={`row-${index}`}>
                                        {columns.map((column, index) => (
                                            <Cell key={`cell-${index}`} width={column.width} align={column.align}>
                                                {this.generateCell(column.key, row[column.key])}
                                            </Cell>
                                        ))}
                                    </Row>
                                </Wrapper>
                            )
                        })}
                    </TableWrapper>
                    :
                    this.renderNoDataTable()
                }
            </React.Fragment>
        )
    }
}

export default UserLocksTable
