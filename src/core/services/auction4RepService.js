import Web3 from 'web3'
import Auction4Reputation from '../../../external-contracts/Auction4Reputation.json'
import * as contractService from './contractService'
const AGREEMENT_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'

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

export async function getAllAuctionData(provider) {
    //This is for dislaying the past bid data.

    //Action -> Bids, TotalBid
}

export async function getStartTime(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.auctionsStartTime().call()
}

export async function getAuctionLength(provider) {
    const contract = await getContractInstance(provider)
    return contract.methods.auctionPeriod().call()
}

export async function getActiveAuction(provider) {
    const { BN } = Web3.utils

    const startTime = new BN(await getStartTime(provider))
    const currentTime = new BN(Math.round((new Date()).getTime() / 1000))
    const auctionLength = new BN(await getAuctionLength(provider))

    const timeElapsed = currentTime.sub(startTime)
    const currentAuction = timeElapsed.div(auctionLength)

    return currentAuction.toString()
}

export async function getNextAuctionStartTime(provider) {
    const { BN } = Web3.utils

    const startTime = new BN(await getStartTime(provider))
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

