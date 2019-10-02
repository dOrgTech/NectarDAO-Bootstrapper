
import Web3 from 'web3'
import TestToken from '../../../external-contracts/TestToken.json'
import { MAX_UINT } from '../libs/lib-number-helpers'

async function getContractInstance(provider, contractAddress) {
    const { web3Provider } = provider
    const web3 = new Web3(web3Provider)
    const { defaultAccount } = web3Provider.eth

    return new web3.eth.Contract(TestToken.abi, contractAddress, { from: defaultAccount })
}

export async function balanceOf(provider, contractAddress, account) {
    const contract = await getContractInstance(provider, contractAddress)
    return contract.methods.balanceOf(account).call()
}

export async function grantMaxApproval(provider, contractAddress, spender) {
    const contract = await getContractInstance(provider, contractAddress)
    contract.methods.approve(spender, MAX_UINT).send()
}