/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { observable, action } from 'mobx'
import * as deployed from "deployed.json";
import * as blockchain from "utils/blockchain"
import * as log from 'loglevel'
import { AirdropStaticParams, SnapshotInfo } from 'types'
import { RootStore } from './Root';
import BigNumber from "utils/bignumber"

const objectPath = require("object-path")

const REDEEM_EVENT = 'Redeem'

export const statusCodes = {
    NOT_LOADED: 0,
    PENDING: 1,
    ERROR: 2,
    SUCCESS: 3
}

const text = {
    staticParamsNotLoaded: 'Static params must be loaded before calling this function'
}

const propertyNames = {
    STATIC_PARAMS: 'staticParams',
    USER_DATA: 'userData',
}
export default class AirdropStore {
    @observable staticParams!: AirdropStaticParams
    @observable staticParamsLoaded = false

    @observable userData = new Map<string, SnapshotInfo>()
    @observable userDataLoaded = new Map<string, boolean>()

    @observable redeemAction = false

    rootStore: RootStore

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    setRedeemPending(flag) {
        this.redeemAction = flag
    }

    isRedeemPending() {
        return this.redeemAction
    }

    isAfterSnapshot() {
        const snapshotBlock = Number(this.staticParams.snapshotBlock)
        const currentBlock = Number(this.rootStore.timeStore.currentBlock)

        return (currentBlock >= snapshotBlock ? true : false)
    }

    getBlocksPastSnapshot() {
        const snapshotBlock = Number(this.staticParams.snapshotBlock)
        const currentBlock = Number(this.rootStore.timeStore.currentBlock)

        return currentBlock - snapshotBlock
    }

    getBlocksUntilSnapshot() {
        const snapshotBlock = Number(this.staticParams.snapshotBlock)
        const currentBlock = Number(this.rootStore.timeStore.currentBlock)

        return snapshotBlock - currentBlock
    }

    isClaimPeriodStarted() {
        const now = this.rootStore.timeStore.currentTime
        const startTime = this.staticParams.claimStartTime

        return (now > startTime ? true : false)
    }

    isClaimPeriodEnded() {
        const now = this.rootStore.timeStore.currentTime
        const endTime = this.staticParams.claimEndTime

        return (now > endTime ? true : false)
    }


    isUserDataLoaded(userAddress) {
        return this.userDataLoaded.get(userAddress) || false
    }

    areStaticParamsLoaded() {
        return this.staticParamsLoaded
    }

    getUserData(userAddress: string): SnapshotInfo {
        const data = this.userData.get(userAddress)
        if (!data) {
            throw new Error(`Attempting to get non-existent data for user ${userAddress}`)
        }
        return data
    }

    loadNecRepAllocationContract() {
        return blockchain.loadObject('NectarRepAllocation', deployed.NectarRepAllocation, 'NectarRepAllocation')
    }

    loadMiniMeTokenContract(tokenAddress) {
        return blockchain.loadObject('MiniMeToken', tokenAddress, 'MiniMeToken')
    }

    loadRepFromTokenContract() {
        return blockchain.loadObject('ReputationFromToken', deployed.ReputationFromToken, 'ReputationFromToken')
    }

    getSnapshotBlock(): number {
        return this.staticParams.snapshotBlock
    }

    fetchStaticParams = async () => {
        const contract = this.loadNecRepAllocationContract()

        try {
            const snapshotBlock = Number(await contract.methods.blockReference().call())
            const snapshotTotalSupplyAt = new BigNumber(await contract.methods.totalTokenSupplyAt().call())
            const claimStartTime = Number(await contract.methods.claimingStartTime().call())
            const claimEndTime = Number(await contract.methods.claimingEndTime().call())
            const totalRepReward = new BigNumber(await contract.methods.reputationReward().call())
            const token = await contract.methods.token().call()

            this.staticParams = {
                snapshotBlock,
                snapshotTotalSupplyAt,
                claimStartTime,
                claimEndTime,
                totalRepReward,
                token
            }

            this.staticParamsLoaded = true
        } catch (e) {
            console.log(e)
        }
    }

    @action fetchUserData = async (userAddress: string) => {
        if (!this.areStaticParamsLoaded()) {
            throw new Error(text.staticParamsNotLoaded)
        }

        const contract = this.loadRepFromTokenContract()
        const necRepAllocationContract = this.loadNecRepAllocationContract()
        const tokenContract = this.loadMiniMeTokenContract(this.staticParams.token)

        console.log('[Fetch] User Airdrop Data', userAddress)
        try {
            const redeemEvents = await contract.getPastEvents(REDEEM_EVENT, {
                filter: { _beneficiary: userAddress },
                fromBlock: 0,
                toBlock: 'latest'
            })

            debugger
            const snapshotBalance = await tokenContract.methods.balanceOfAt(userAddress, this.staticParams.snapshotBlock).call()
            const snapshotRep = await necRepAllocationContract.methods.balanceOf(userAddress).call()
            const hasRedeemed = (redeemEvents && (redeemEvents.length >= 1))

            const data: SnapshotInfo = new SnapshotInfo(snapshotBalance, snapshotRep, hasRedeemed)
            //TODO: filter events for user redemption
            //TODO: calculate REP from (user balance / total supply) * totalREP
            console.log('[Fetched] User Airdrop Data', userAddress, data)

            this.userData.set(userAddress, data)
            this.userDataLoaded[userAddress] = true
        }
        catch (e) {
            log.error(e)
        }
    }

    @action redeem = async (beneficiary) => {
        const contract = this.loadRepFromTokenContract()

        console.log('redeem', beneficiary)
        this.setRedeemPending(true)
        try {
            await contract.methods.redeem(beneficiary).send()
            this.fetchUserData(beneficiary)
            this.setRedeemPending(false)
        } catch (e) {
            log.error(e)
            this.fetchUserData(beneficiary)
            this.setRedeemPending(false)
        }

    }
}