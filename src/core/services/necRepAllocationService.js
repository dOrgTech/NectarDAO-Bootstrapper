import Web3 from 'web3'
import NectarRepAllocation from '../../../external-contracts/NectarRepAllocation.json'

const REDEEM_EVENT = 'Redeem'

async function getContractInstance(provider, contractAddress) {
    const { web3Provider } = provider
    const web3 = new Web3(web3Provider)
    const { defaultAccount } = web3Provider.eth

    return new web3.eth.Contract(NectarRepAllocation, contractAddress, { from: defaultAccount })
}

export async function hasRedeemed(provider, contractAddress, account) {
    const contract = await getContractInstance(provider, contractAddress)

    const events = await contract.getPastEvents(REDEEM_EVENT, {
        fromBlock: 0,
        toBlock: 'latest'
    })
}

export async function getSnapshotRep(provider, contractAddress, account) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.balanceOf(account).call()
}

export async function getCurrentBlock(provider) {
    const web3 = new Web3(provider.web3Provider)
    return web3.eth.getBlockNumber()
}

export async function getSnapshotBlock(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.blockReference().call()
}

export async function getTotalSupplyAtSnapshot(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.totalTokenSupplyAt().call()
}

export async function getClaimStartTime(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.claimingStartTime().call()
}

export async function getClaimEndTime(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.claimingEndTime().call()
}

export async function getTotalReputationReward(provider, contractAddress) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.reputationReward().call()
}

