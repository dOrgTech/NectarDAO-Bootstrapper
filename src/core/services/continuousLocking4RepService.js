/* eslint-disable no-restricted-syntax */
import Web3 from 'web3'
import ContinuousLocking4Reputation from '../../../external-contracts/ContinuousLocking4Reputation.json'
import * as contractService from './contractService'

const LOCK_EVENT = 'LockToken'
const RELEASE_EVENT = 'Release'
const EXTEND_LOCKING_EVENT = 'ExtendLocking'
const AGREEMENT_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'

async function getContractInstance(provider) {
    const { web3Provider } = provider
    const web3 = new Web3(web3Provider)
    const { defaultAccount } = web3Provider.eth

    const lockingAddress = await contractService.getContinuousLocking4ReputationAddress()

    return new web3.eth.Contract(ContinuousLocking4Reputation.abi, lockingAddress, { from: defaultAccount })
}

export async function getNumLockingPeriods(provider, ) {
    const contract = await getContractInstance(provider)
    return contract.methods.batchesIndexCap().call()
}

export async function getLockingPeriodLength(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.batchTime().call()
}

export async function getStartTime(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.startTime().call()
}

function getLockingPeriodByTimestamp(startTime, batchTime, timestamp) {
    const { BN } = Web3.utils

    const startTimeBN = new BN(startTime)
    const batchTimeBN = new BN(batchTime)
    const timestampBN = new BN(timestamp)

    const timeElapsedBN = timestampBN.sub(startTimeBN)
    const lockingPeriodBN = timeElapsedBN.div(batchTimeBN)

    return lockingPeriodBN.toString()
}

export async function getActiveLockingPeriod(provider) {
    const { BN } = Web3.utils

    const startTime = new BN(await getStartTime(provider))
    const batchTime = new BN(await getLockingPeriodLength(provider))
    const currentTime = new BN(Math.round((new Date()).getTime() / 1000))

    console.log(startTime.toString(), batchTime.toString(), currentTime.toString())

    const timeElapsed = currentTime.sub(startTime)
    const currentLockingPeriod = timeElapsed.div(batchTime)

    return currentLockingPeriod.toString()
}

export async function getTimeElapsed(provider) {
    const { BN } = Web3.utils

    const startTime = new BN(await getStartTime(provider))
    const currentTime = new BN(Math.round((new Date()).getTime() / 1000))

    const timeElapsed = currentTime.sub(startTime)

    return timeElapsed.toString()
}

export async function getUserTokenLocks(provider, account) {
    const contract = await getContractInstance(provider)
    const { BN } = Web3.utils

    const lockEvents = await contract.getPastEvents(LOCK_EVENT, {
        filter: { _locker: account },
        fromBlock: 0,
        toBlock: 'latest'
    })

    // Filter these events by lockId's that belong to the user

    const data = {}
    const userLockIds = []

    const startTime = await getStartTime(provider)
    const batchTime = await getLockingPeriodLength(provider)

    // Add Locks
    for (const event of lockEvents) {
        // console.log(event)
        const {
            _locker, _lockingId, _amount, _period
        } = event.returnValues

        // We need to get locking time from actual locker
        const result = await contract.methods.lockers(account, _lockingId).call()
        console.log(result)

        const lockingPeriod = getLockingPeriodByTimestamp(startTime, batchTime, result.lockingTime)
        const lockDuration = new BN(_period).mul(new BN(batchTime))
        const releasable = (new BN(result.lockingTime).add(lockDuration)).toString()

        userLockIds.push(_lockingId)

        data[_lockingId] = {
            account: _locker,
            lockId: _lockingId,
            amount: _amount,
            duration: _period,
            lockingPeriod,
            releasable,
            released: false
        }
    }

    const extendEvents = await contract.getPastEvents(EXTEND_LOCKING_EVENT, {
        filter: { _locker: account },
        fromBlock: 0,
        toBlock: 'latest'
    })

    const releaseEvents = await contract.getPastEvents(RELEASE_EVENT, {
        filter: { _lockingId: userLockIds },
        fromBlock: 0,
        toBlock: 'latest'
    })

    console.log('lock events', lockEvents)
    console.log('extend events', extendEvents)
    console.log('release events', releaseEvents)

    // Incorporate Extensions
    for (const event of extendEvents) {
        const { _lockingId, _extendPeriod } = event.returnValues
        data[_lockingId].duration = ((new BN(_extendPeriod)).add(new BN(data[_lockingId].duration))).toString()

        // TODO Add locking period
    }

    // Check Released Status
    for (const event of releaseEvents) {
        const { _lockingId } = event.returnValues
        data[_lockingId].released = true
    }

    console.log(data)
    return data
}

export async function getAuctionData(provider) {
    const contract = await getContractInstance(provider)

    // Get the active period
    const currentLockingPeriod = await getActiveLockingPeriod(provider)
    const totalLockingPeriods = await getNumLockingPeriods(provider)

    let maxIndex = currentLockingPeriod

    if (currentLockingPeriod > totalLockingPeriods) {
        maxIndex = totalLockingPeriods
    }

    const auctionData = []

    // Return the data for each auction
    for (let i = 0; i < maxIndex; i += 1) {
        // const batch = await contract.methods.batches(i).call()
    }
}

export async function getAgreementHash(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.getAgreementHash().call()
}

export async function lock(provider, amount, duration, batchId) {
    const contract = await getContractInstance(provider)
    console.log('lock', amount, duration, batchId, AGREEMENT_HASH)
    await contract.methods.lock(amount, duration, batchId, AGREEMENT_HASH).send()
}

export async function extendLock(provider, lockId, periodsToExtend, batchId) {
    const contract = await getContractInstance(provider)
    await contract.methods.extendLocking(periodsToExtend, batchId, lockId, AGREEMENT_HASH).send()
}

export async function release(provider, beneficiary, lockId) {
    const contract = await getContractInstance(provider)
    await contract.methods.release(beneficiary, lockId).send()
}
