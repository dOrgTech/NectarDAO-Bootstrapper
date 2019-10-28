/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { observable, action, computed } from 'mobx'
import * as blockchain from "utils/blockchain"
import * as helpers from "utils/helpers"
import * as log from 'loglevel'
import { logs, errors, prefix, } from 'strings'
import * as deployed from 'deployed.json'
import BigNumber from "utils/bignumber"

import { Lock, LockStaticParams, Batch } from 'types'
type Scores = Map<number, BigNumber>
type Locks = Map<string, Lock>

const objectPath = require("object-path")
const LOCK_EVENT = 'LockToken'
const RELEASE_EVENT = 'Release'
const EXTEND_LOCKING_EVENT = 'ExtendLocking'
const AGREEMENT_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'

const { BN } = helpers

const defaultAsyncActions = {
    lock: false,
    extendLock: {},
    redeem: {},
    release: {}
}

export default class LockNECStore {
    // Static Parameters
    @observable staticParams!: LockStaticParams
    @observable staticParamsLoaded = false
    // Dynamic Data
    @observable userLocks = new Map<string, Locks>()
    @observable userLocksLoaded = new Map<string, boolean>()

    @observable batches = new Map<number, Batch>()
    @observable batchesLoaded = false
    @observable completedBatchIndex = 0

    @observable initialLoad = {
        staticParams: false,
        globalAuctionData: false,
    }

    rootStore: any

    @observable asyncActions = defaultAsyncActions

    @observable releaseActions = {}

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    //TODO: Do this when switching accounts in metamask
    resetAsyncActions() {
        this.asyncActions = defaultAsyncActions
    }

    setLockActionPending(flag) {
        objectPath.set(this.asyncActions, `lock`, flag)
    }

    setRedeemActionPending(userAddress, lockId, flag) {
        objectPath.set(this.asyncActions, `redeem.${userAddress}.${lockId}`, flag)
    }

    setExtendLockActionPending(lockId, flag) {
        objectPath.set(this.asyncActions, `extendLock.${lockId.toString()}`, flag)
    }

    setReleaseActionPending(lockId, flag) {
        const lockIdString = lockId.toString()
        objectPath.set(this.releaseActions, `${lockIdString}`, flag)
    }

    isLockActionPending() {
        const flag = objectPath.get(this.asyncActions, `lock`) || false
        return flag
    }

    isRedeemActionPending(userAddress, lockId) {
        const flag = objectPath.get(this.asyncActions, `redeem.${userAddress}.${lockId}`) || false
        return flag
    }

    isExtendLockActionPending(lockId) {
        return objectPath.get(this.asyncActions, `extendLock.${lockId.toString()}`) || false
    }

    isReleaseActionPending(lockId) {
        const lockIdString = lockId.toString()
        return objectPath.get(this.releaseActions, `${lockIdString}`) || false
    }

    getBatchStartTime(batchIndex: number): number {
        const startTime = this.staticParams.startTime
        const batchTime = this.staticParams.batchTime

        return (startTime + (batchIndex * batchTime))
    }

    getBatchEndTime(batchIndex: number): number {
        const startTime = this.staticParams.startTime
        const batchTime = this.staticParams.batchTime

        const nextIndex = Number(batchIndex) + 1

        return (startTime + (nextIndex * batchTime))
    }

    getTimeUntilNextPeriod(): number {
        const currentBatch = this.getActiveLockingPeriod()
        const now = this.rootStore.timeStore.currentTime
        const nextBatchStartTime = this.getBatchStartTime(currentBatch + 1)

        return (nextBatchStartTime - now)
    }

    getFinalPeriodIndex(): number {
        return (this.staticParams.numLockingPeriods - 1)
    }

    isLockingStarted(): boolean {
        const now = this.rootStore.timeStore.currentTime
        const startTime = this.staticParams.startTime
        return (now >= startTime)
    }

    getLockingEndTime(): number {
        const startTime = this.staticParams.startTime
        const batchTime = this.staticParams.batchTime
        const numAuctions = this.staticParams.numLockingPeriods

        const endTime = startTime + (batchTime * numAuctions)
        return endTime
    }

    isLockingEnded(): boolean {
        const now = this.rootStore.timeStore.currentTime
        const endTime = this.getLockingEndTime()
        return (now >= endTime)
    }

    calcReleaseableTimestamp(lockingTime: number, duration: number): number {
        const batchLength = this.staticParams.batchTime
        const numBatches = Number(duration)

        const lockLength = batchLength * numBatches
        const endDate = new Date(lockingTime + lockLength)

        return endDate.valueOf()
    }

    areStaticParamsLoaded(): boolean {
        return this.staticParamsLoaded
    }

    isUserLockInitialLoadComplete(userAddress) {
        return this.userLocksLoaded.get(userAddress) || false
    }

    areBatchesLoaded(userAddress) {
        return this.batchesLoaded
    }

    getPeriodsRemaining(): number {
        const now = this.rootStore.timeStore.currentTime
        const endTime = this.getLockingEndTime()
        const batchTime = this.staticParams.batchTime

        const remainingTime = endTime - now
        const remainingPeriods = Math.trunc(remainingTime / batchTime)

        return remainingPeriods
    }

    getLockingPeriodByTimestamp(timestamp): number {
        if (!this.areStaticParamsLoaded()) {
            throw new Error('Static properties must be loaded before fetching user locks')
        }

        const startTime = this.staticParams.startTime
        const batchTime = this.staticParams.batchTime
        const timeElapsed = timestamp - startTime
        const lockingPeriod = timeElapsed / batchTime


        return Math.trunc(lockingPeriod)
    }

    loadContract() {
        return blockchain.loadObject('ContinuousLocking4Reputation', deployed.ContinuousLocking4Reputation, 'ContinuousLocking4Reputation')
    }

    getActiveLockingPeriod(): number {
        if (!this.areStaticParamsLoaded()) {
            throw new Error('Static properties must be loaded before fetching user locks')
        }

        const startTime = this.staticParams.startTime
        const batchTime = this.staticParams.batchTime
        const currentTime = this.rootStore.timeStore.currentTime
        const timeElapsed = currentTime - startTime
        const currentLockingPeriod = timeElapsed / batchTime

        return Math.trunc(currentLockingPeriod)
    }

    getTimeElapsed(): number {
        if (!this.areStaticParamsLoaded()) {
            throw new Error('Static properties must be loaded before fetching user locks')
        }

        const startTime = new BN(this.staticParams.startTime)
        const currentTime = new BN(Math.round((new Date()).getTime() / 1000))

        const timeElapsed = currentTime.sub(startTime)

        return timeElapsed.toString()
    }

    fetchStaticParams = async () => {
        const contract = this.loadContract()

        try {
            const numLockingPeriods = await contract.methods.batchesIndexCap().call()
            const batchTime = await contract.methods.batchTime().call()
            const startTime = await contract.methods.startTime().call()
            const maxLockingBatches = await contract.methods.maxLockingBatches().call()
            const agreementHash = await contract.methods.getAgreementHash().call()

            this.staticParams = {
                numLockingPeriods: Number(numLockingPeriods),
                batchTime: Number(batchTime),
                startTime: Number(startTime),
                agreementHash,
                maxLockingBatches: Number(maxLockingBatches),
            }

            this.staticParamsLoaded = true
        } catch (e) {
            log.error(e)
        }
    }

    async parseLockEvent(event): Promise<Lock> {

        const {
            _locker, _lockingId, _amount, _period
        } = event.returnValues

        const block = await blockchain.getBlock(event.blockNumber)
        const batchTime = this.staticParams.batchTime
        const periodDuration = Number(_period)
        const timeDuration = periodDuration * batchTime
        const lockingPeriod = this.getLockingPeriodByTimestamp(block.timestamp)
        const releasable = Number(block.timestamp) + Number(timeDuration)

        return {
            locker: _locker,
            id: _lockingId,
            amount: _amount,
            periodDuration,
            timeDuration,
            lockingTime: block.timestamp,
            lockingPeriod,
            scores: new Map<number, BigNumber>(),
            releasable,
            released: false
        }
    }

    async parseExtendEvent(event) {
        const {
            _locker, _lockingId, _extendPeriod
        } = event.returnValues
        const block = await blockchain.getBlock(event.blockNumber)

        return {
            locker: _locker,
            id: _lockingId,
            extendDuration: Number(_extendPeriod),
            timestamp: block.timestamp
        }
    }

    async parseReleaseEvent(event) {
        const {
            _beneficiary, _lockingId, _amount
        } = event.returnValues

        return {
            beneficiary: _beneficiary,
            id: _lockingId,
            amount: _amount
        }
    }

    calcExtendScores(lock, extend) {
        // const { lockingPeriod, duration, amount } = lock
        // const { extendDuration } = extend

        // const extendLockingPeriod = this.getLockingPeriodByTimestamp(extend.timestamp)

        // const scores = {}

        // // How many batches remain in the original lock duration at the time of this extension?
        // const remainBatches = extendLockingPeriod - lockingPeriod
        // const batchesCountFromCurrent = remainBatches + extendDuration

        // const amount = new BN(lock.amount)
        // const finalBatch = new BN(batchesCountFromCurrent)

        // for (let p = 0; p < batchesCountFromCurrent; p++) {
        //     const score = (batchesCountFromCurrent - p).mul(lock.amount);
        //     batch.totalScore = batch.totalScore.add(score).sub(batch.scores[_lockingId]);
        //     batch.scores[_lockingId] = score;
        // }
        return {}
    }

    calcLockScores(lock): Map<number, BigNumber> {
        const { lockingPeriod, duration, amount } = lock
        const batchIndexToLockIn = lockingPeriod
        const scores = new Map<number, BigNumber>()

        for (let p = 0; p < duration; p++) {
            const batchId = batchIndexToLockIn + p
            const diff = new BigNumber((duration - p))
            const score = (diff).times(amount);
            scores.set(batchId, score)
        }
        return scores
    }

    getUserTokenLocks(userAddress: string): Locks {
        if (this.userLocks.has(userAddress)) {
            return this.userLocks.get(userAddress) as Locks
        }
        throw new Error("Attempting to get user locks which don't exist")
    }

    updateLockDuration(lock: Lock, periodExtension: number): Lock {
        lock.periodDuration = lock.periodDuration + periodExtension
        lock.timeDuration = lock.timeDuration + (this.staticParams.batchTime * periodExtension)
        return lock
    }

    @action fetchUserLocks = async (userAddress) => {
        if (!this.areStaticParamsLoaded()) {
            throw new Error('Static properties must be loaded before fetching user locks')
        }

        // Can we get the LOCKING TIME by the blocktime of the TX?

        const contract = this.loadContract()
        log.debug(prefix.FETCH_PENDING, 'User Locks', userAddress)

        try {
            const locks = new Map<string, Lock>()
            const events = await contract.events.LockToken()

            const lockEvents = await contract.getPastEvents(LOCK_EVENT, {
                filter: { _locker: userAddress },
                fromBlock: 0,
                toBlock: 'latest'
            })

            const extendEvents = await contract.getPastEvents(EXTEND_LOCKING_EVENT, {
                filter: { _locker: userAddress },
                fromBlock: 0,
                toBlock: 'latest'
            })

            const releaseEvents = await contract.getPastEvents(RELEASE_EVENT, {
                filter: { _beneficiary: userAddress },
                fromBlock: 0,
                toBlock: 'latest'
            })

            // Add Locks
            for (const event of lockEvents) {
                const lock = await this.parseLockEvent(event)

                const scores = this.calcLockScores(lock)
                lock.scores = scores
                locks.set(lock.id, lock)
            }

            for (const event of extendEvents) {
                const extend = await this.parseExtendEvent(event)
                // const scores = calcExtendScores(locks[extend.id], extend)

                if (!locks.has(extend.id)) {
                    throw new Error("Trying to extend lock which doesn't exist")
                }

                const updatedLock = this.updateLockDuration(locks.get(extend.id) as Lock, extend.extendDuration)
                locks.set(extend.id, updatedLock)
            }

            for (const event of releaseEvents) {
                const release = await this.parseReleaseEvent(event)
                if (!locks.has(release.id)) {
                    throw new Error("Trying to release a lock which doesn't exist")
                }
                const lock = locks.get(release.id) as Lock

                //If a release event exists for an id, it was released
                lock.released = true
                locks.set(release.id, lock)
            }

            log.debug(prefix.FETCH_SUCCESS, 'User Locks', userAddress, locks)
            this.userLocks.set(userAddress, locks)
            this.userLocksLoaded.set(userAddress, true)
        } catch (e) {
            log.error(prefix.FETCH_ERROR, 'User Locks', userAddress)
            log.error(e)
        }
    }

    getBatches(userAddress) {
        return this.batches;
    }

    getLastCompletedBatch() {
        const finalBatch = this.getFinalPeriodIndex()
        const currentBatch = this.getActiveLockingPeriod()

        if (currentBatch <= 0) {
            return -1
        }

        if (currentBatch > finalBatch) {
            return finalBatch
        }

        return Number(currentBatch) - 1
    }

    newBatch(id: number): Batch {
        return {
            id,
            userLocked: new BigNumber(0),
            totalLocked: new BigNumber(0),
            userRep: new BigNumber(0),
            totalRep: new BigNumber(0),
            userScore: new BigNumber(0),
            totalScore: new BigNumber(0),
            isComplete: false
        }
    }

    /* 
        Returns the 'amount locked' within a given locking period
        Scores are calculated from each lock and extend lock event
    */
    async fetchBatches(user: string) {
        const contract = this.loadContract()
        const batches = new Map<number, Batch>()
        const lockScores = {}
        const locks = this.userLocks

        log.debug(prefix.FETCH_PENDING, 'Batches', user)
        try {
            const lockEvents = await contract.getPastEvents(LOCK_EVENT, {
                fromBlock: 0,
                toBlock: 'latest'
            })

            for (let event of lockEvents) {
                const lock = await this.parseLockEvent(event)

                let batch = batches.get(lock.lockingPeriod)
                if (!batch) {
                    batches.set(lock.lockingPeriod, this.newBatch(lock.lockingPeriod))
                    batch = batches.get(lock.lockingPeriod) as Batch
                }

                batch.totalLocked = batch.totalLocked.plus(lock.amount)

                if (lock.locker === user) {
                    batch.userLocked = batch.userLocked.plus(lock.amount)
                }
            }

            const lastCompletedBatch = this.getLastCompletedBatch()
            const currentBatch = this.getActiveLockingPeriod()

            for (let i = 0; i <= lastCompletedBatch + 1; i++) {
                let batch = batches.get(i)
                if (!batch) {
                    batches.set(i, this.newBatch(i))
                    batch = batches.get(i) as Batch
                }

                // const totalScore = new BigNumber(await contract.methods.batches(i).call())
                const totalRep = new BigNumber(await contract.methods.getRepRewardPerBatch(i).call())

                let userPortion = new BigNumber(0)
                if (!batch.totalLocked.eq(new BigNumber(0))) {
                    userPortion = batch.userLocked.div(batch.totalLocked)
                }
                const userRep = userPortion.times(totalRep)

                batch.totalRep = totalRep
                batch.userRep = userRep

                if (i < currentBatch) {
                    batch.isComplete = true
                }

                batches.set(i, batch)
            }

            // Object.keys(batches).forEach(key => {
            //     const batchId = batches[key].id
            //     const userLocked = batches[key].userLocked.toString()
            //     const totalLocked = batches[key].totalLocked.toString()
            //     const totalRep = batches[key].totalRep.toString()
            //     const userRep = batches[key].userRep.toString()

            //     const printBatch = {
            //         batchId, userLocked, totalLocked, totalRep, userRep
            //     }

            //     console.log('batch', printBatch)
            // })

            this.batchesLoaded = true
            this.batches = batches
            log.debug(prefix.FETCH_SUCCESS, 'Batches', user)
        } catch (e) {
            log.error(prefix.FETCH_ERROR, 'Batches', user)
            log.error(e)
        }
    }

    lock = async (amount, duration, batchId) => {
        const contract = this.loadContract()
        const userAddress = this.rootStore.providerStore.getDefaultAccount()
        log.error(
            '[Action] Lock',
            `amount: ${amount} \n duration: ${duration} \n batchId:${batchId} \n agreementHash: ${AGREEMENT_HASH}`)

        this.setLockActionPending(true)
        try {
            await contract.methods.lock(amount, duration, batchId, AGREEMENT_HASH).send()
            this.fetchUserLocks(userAddress)
            this.setLockActionPending(false)
        } catch (e) {
            log.error(e)
            this.setLockActionPending(false)
        }

    }

    extendLock = async (lockId, periodsToExtend, batchId) => {
        const contract = this.loadContract()
        const userAddress = this.rootStore.providerStore.getDefaultAccount()
        this.setExtendLockActionPending(lockId, true)
        log.debug('extendLock', lockId, periodsToExtend, batchId)

        try {
            await contract.methods.extendLocking(periodsToExtend, batchId, lockId, AGREEMENT_HASH).send()
            await this.fetchUserLocks(userAddress)
            this.setExtendLockActionPending(lockId, false)
        } catch (e) {
            log.error(e)
            this.setExtendLockActionPending(lockId, false)
        }

    }

    release = async (beneficiary, lockId) => {
        const contract = this.loadContract()
        const userAddress = this.rootStore.providerStore.getDefaultAccount()
        this.setReleaseActionPending(lockId, true)
        log.debug('release', beneficiary, lockId)

        try {
            await contract.methods.release(beneficiary, lockId).send()
            await this.fetchUserLocks(userAddress)
            this.setReleaseActionPending(lockId, false)
        } catch (e) {
            log.error(e)
            await this.fetchUserLocks(userAddress)
            this.setReleaseActionPending(lockId, false)
        }

    }

}