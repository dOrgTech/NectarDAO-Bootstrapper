const deployed = require('../../configs/deployed.json')

export function getContinuousLocking4ReputationAddress() {
    return deployed.ContinuousLocking4Reputation
}

export function getAuction4ReputationAddress() {
    return deployed.Auction4Reputation
}

export function getReputationFromTokenAddress() {
    return deployed.ReputationFromToken
}

export function getNectarRepAllocationAddress() {
    return deployed.NectarRepAllocation
}

export function getNectarTokenAddress() {
    return deployed.NectarToken
}

export function getGenTokenAddress() {
    return deployed.GenToken
}