/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import Web3 from 'web3'
import Auction4Reputation from '../../../external-contracts/Auction4Reputation.json'
import * as contractService from './contractService'

const AGREEMENT_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'
const BID_EVENT = 'Bid'

async function getContractInstance(provider) {
    const { web3Provider } = provider
    const web3 = new Web3(web3Provider)
    const { defaultAccount } = web3Provider.eth

    const auctionInstance = await contractService.getAuction4ReputationAddress()

    return new web3.eth.Contract(Auction4Reputation, auctionInstance, { from: defaultAccount })
}

export async function getUserBids(provider) {
    const contract = await getContractInstance(provider)
}

export async function getUserRedemptions(provider) {
}

export async function getAuctionsStartTime(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.auctionsStartTime().call()
}

export async function getAuctionsEndTime(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.auctionsEndTime().call()
}

export async function getAuctionLength(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.auctionPeriod().call()
}

export async function getNumAuctions(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.numberOfAuctions().call()
}

export async function getRedeemEnableTime(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.redeemEnableTime().call()
}

export async function getAuctionReputationReward(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.auctionReputationReward().call()
}

export async function getTotalReputationRewardLeft(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.reputationRewardLeft().call()
}

export async function getActiveAuction(provider) {
    const { BN } = Web3.utils

    const startTime = new BN(await getAuctionsStartTime(provider))
    const currentTime = new BN(Math.round((new Date()).getTime() / 1000))
    const auctionLength = new BN(await getAuctionLength(provider))

    const timeElapsed = currentTime.sub(startTime)
    const currentAuction = timeElapsed.div(auctionLength)

    return currentAuction.toString()
}

export async function getNextAuctionStartTime(provider) {
    const { BN } = Web3.utils

    const startTime = new BN(await getAuctionsStartTime(provider))
    const auctionLength = new BN(await getAuctionLength(provider))

    const activeAuctionIndex = new BN(await getActiveAuction(provider))
    const nextAuctionIndex = activeAuctionIndex.add(new BN(1))

    const nextAuctionStartTime = startTime.add((auctionLength.mul(nextAuctionIndex)))

    return nextAuctionStartTime.toString()
}

export async function getTimeUntilNextAuction(provider) {
    const { BN } = Web3.utils

    const currentTime = new BN(Math.round((new Date()).getTime() / 1000))
    const nextAuctionStartTime = new BN(await getNextAuctionStartTime(provider))

    const timeUntilNextAuction = nextAuctionStartTime.sub(currentTime)

    console.log(currentTime.toString(), nextAuctionStartTime.toString(), timeUntilNextAuction.toString())
    return timeUntilNextAuction.toString()
}

export async function bid(provider, amount, auctionId) {
    const contract = await getContractInstance(provider)
    await contract.methods.bid(amount, auctionId, AGREEMENT_HASH).send()
}

export async function redeem(provider, beneficiary, auctionId) {
    const contract = await getContractInstance(provider)
    await contract.methods.redeem(beneficiary, auctionId).send()
}

export async function getAllAuctionData(provider) {
    const { BN } = Web3.utils

    const contract = await getContractInstance(provider)
    console.log(contract)

    const currentAuction = await getActiveAuction(provider)

    const bidEvents = await contract.getPastEvents(BID_EVENT, {
        fromBlock: 0,
        toBlock: 'latest'
    })

    console.log(bidEvents)
    const bids = {}
    const totalBids = {}
    const statusData = {}


    for (const event of bidEvents) {
        const { _bidder, _auctionId, _amount } = event.returnValues

        if (!bids[_auctionId]) {
            bids[_auctionId] = {}
        }

        if (!totalBids[_auctionId]) {
            totalBids[_auctionId] = '0'
        }

        if (!bids[_auctionId][_bidder]) {
            bids[_auctionId][_bidder] = '0'
        }

        const currentBid = new BN(bids[_auctionId][_bidder])
        const amountToAdd = new BN(_amount)

        bids[_auctionId][_bidder] = (currentBid.add(amountToAdd)).toString()

        const currentTotalBid = new BN(totalBids[_auctionId])
        totalBids[_auctionId] = (currentTotalBid.add(amountToAdd)).toString()

        if (Number(_auctionId) < Number(currentAuction)) {
            statusData[_auctionId] = 'Complete'
        } else if (Number(_auctionId) === Number(currentAuction)) {
            statusData[_auctionId] = 'In Progress'
        } else {
            statusData[_auctionId] = 'Not Started'
        }
    }

    console.log('auctionData', bids, totalBids, statusData)

    return {
        bids,
        totalBids,
        statusData
    }
}
