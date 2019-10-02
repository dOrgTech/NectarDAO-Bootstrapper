
import Web3 from 'web3'
import MiniMeToken from '../../../external-contracts/MiniMeToken.json'

async function getContractInstance(provider, contractAddress) {
    const { web3Provider } = provider
    const web3 = new Web3(web3Provider)
    const { defaultAccount } = web3Provider.eth

    return new web3.eth.Contract(MiniMeToken.abi, contractAddress, { from: defaultAccount })
}

export async function balanceOfAt(provider, contractAddress, account, blockNumber) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.balanceOfAt(account, blockNumber).call()
}

export async function totalSupplyAt(provider, contractAddress, blockNumber) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.totalSupplyAt(blockNumber).call()
}