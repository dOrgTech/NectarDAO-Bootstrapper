
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
    return contract.methods.approve(spender, MAX_UINT).send()
}

export async function hasMaxApproval(provider, contractAddress, owner, spender) {
    const { BN } = Web3.utils
    const contract = await getContractInstance(provider, contractAddress)
    const amount = new BN(await contract.methods.allowance(owner, spender).call())
    const max = new BN(MAX_UINT)
    return amount.gte(max.div(new BN(2)))
}
