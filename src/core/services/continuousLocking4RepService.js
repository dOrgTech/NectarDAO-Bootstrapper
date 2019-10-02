/* eslint-disable no-restricted-syntax */
import Web3 from 'web3'
import ContinuousLocking4Reputation from '../../../external-contracts/ContinuousLocking4Reputation.json'

const LOCK_EVENT = 'LockToken'
const RELEASE_EVENT = 'Release'
const EXTEND_LOCKING_EVENT = 'ExtendLocking'
const AGREEMENT_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'

async function getContractInstance(provider, contractAddress) {
    const { web3Provider } = provider
    const web3 = new Web3(web3Provider)
    const { defaultAccount } = web3Provider.eth

    return new web3.eth.Contract(ContinuousLocking4Reputation.abi, contractAddress, { from: defaultAccount })
}

export async function getNumLockingPeriods(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.batchesIndexCap().call()
}

export async function getLockingPeriodLength(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.batchTime().call()
}

export async function getStartTime(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)
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

export async function getActiveLockingPeriod(provider, contractAddress) {
    const { BN } = Web3.utils

    const startTime = new BN(await getStartTime(provider, contractAddress))
    const batchTime = new BN(await getLockingPeriodLength(provider, contractAddress))
    const currentTime = new BN(Math.round((new Date()).getTime() / 1000))

    console.log(startTime.toString(), batchTime.toString(), currentTime.toString())

    const timeElapsed = currentTime.sub(startTime)
    const currentLockingPeriod = timeElapsed.div(batchTime)

    return currentLockingPeriod.toString()
}

export async function getTimeElapsed(provider, contractAddress) {
    const { BN } = Web3.utils

    const startTime = new BN(await getStartTime(provider, contractAddress))
    const currentTime = new BN(Math.round((new Date()).getTime() / 1000))

    const timeElapsed = currentTime.sub(startTime)

    return timeElapsed.toString()
}

export async function getUserTokenLocks(provider, contractAddress, account) {
    const contract = await getContractInstance(provider, contractAddress)
    const { BN } = Web3.utils

    console.log(contract)
    const lockEvents = await contract.getPastEvents(LOCK_EVENT, {
        fromBlock: 0,
        toBlock: 'latest'
    })

    const extendEvents = await contract.getPastEvents(EXTEND_LOCKING_EVENT, {
        fromBlock: 0,
        toBlock: 'latest'
    })

    const releaseEvents = await contract.getPastEvents(RELEASE_EVENT, {
        fromBlock: 0,
        toBlock: 'latest'
    })

    let data = {}

    const startTime = await getStartTime(provider, contractAddress)
    const batchTime = await getLockingPeriodLength(provider, contractAddress)

    // Add Locks
    for (const event of lockEvents) {
        // console.log(event)
        const { _locker, _lockingId, _amount, _period } = event.returnValues

        // We need to get locking time from actual locker
        const result = await contract.methods.lockers(account, _lockingId).call()
        console.log(result)

        const lockingPeriod = getLockingPeriodByTimestamp(startTime, batchTime, result.lockingTime)
        const lockDuration = new BN(_period).mul(new BN(batchTime))
        const releasable = (new BN(result.lockingTime).add(lockDuration)).toString()

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

    console.log('extend events', extendEvents)

    // Incorporate Extensions
    for (const event of extendEvents) {
        const { _lockingId, _extendPeriod } = event.returnValues
        data[_lockingId].duration = ((new BN(_extendPeriod)).add(new BN(data[_lockingId].duration))).toString()

        //TODO Add locking period
    }

    // Check Released Status
    for (const event of releaseEvents) {
        const { __lockingId } = event.returnValues
        data[_lockingId].released = true
    }

    console.log(data)
    return data
}

export async function getAuctionData(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)

    // Get the active period
    const currentLockingPeriod = await getActiveLockingPeriod(provider, contractAddress)
    const totalLockingPeriods = await getNumLockingPeriods(provider, contractAddress)

    let maxIndex = currentLockingPeriod

    if (currentLockingPeriod > totalLockingPeriods) {
        maxIndex = totalLockingPeriods
    }

    let auctionData = []

    // Return the data for each auction
    for (let i = 0; i < maxIndex; i++) {
        // const batch = await contract.methods.batches(i).call()
        console.log(batch)
    }

}

export async function getAgreementHash(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.getAgreementHash().call()
}

export async function lock(provider, contractAddress, amount, duration, batchId) {
    const contract = await getContractInstance(provider, contractAddress)
    console.log('lock', contractAddress, amount, duration, batchId, AGREEMENT_HASH)
    await contract.methods.lock(amount, duration, batchId, AGREEMENT_HASH).send()
}

export async function extendLock(provider, contractAddress, lockId, periodsToExtend, batchId) {
    const contract = await getContractInstance(provider, contractAddress)
    await contract.methods.extendLocking(periodsToExtend, batchId, lockId, AGREEMENT_HASH).send()
}

export async function release(provider, contractAddress, beneficiary, lockId) {
    const contract = await getContractInstance(provider, contractAddress)
    await contract.methods.release(beneficiary, lockId).send()
}