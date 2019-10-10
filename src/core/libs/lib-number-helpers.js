import Web3 from 'web3'

export const MAX_GAS = 0xffffffff
export const MAX_UINT = Web3.utils.toTwosComplement('-1')
export const { BN } = Web3.utils

export function toEther(value) {
  return Web3.utils.fromWei(value)
}

export function toWei(value) {
  return Web3.utils.toWei(value, 'ether')
}

