import BigNumber from "bignumber.js"

export class Lock {
    constructor(
        public locker: string,
        public id: string,
        public amount: BigNumber,
        public periodDuration: number,
        public timeDuration: number,
        public lockingTime: number,
        public lockingPeriod: number,
        public scores: Map<number, BigNumber>,
        public releasable: number,
        public released: boolean
    ) { };
}

export enum AuctionStatus {
    NOT_STARTED = "Not Started",
    IN_PROGRESS = "In Progress",
    COMPLETE = "Complete"
}

export class Auction {
    constructor(
        public totalBid: BigNumber,
        public bids: Map<string, BigNumber>,
        public status: AuctionStatus
    ) { };
}

export class LockBatch {
    constructor(
        public id: number,
        public userLocked: BigNumber,
        public totalLocked: BigNumber,
        public userRep: BigNumber,
        public totalRep: BigNumber,
        public userScore: BigNumber,
        public totalScore: BigNumber,
        public isComplete: false
    ) { }
}

export class SnapshotInfo {
    constructor(
        public balance: BigNumber,
        public rep: BigNumber,
        public hasRedeemed: boolean
    ) { }
}

export interface BidStaticParams {
    auctionsStartTime: number;
    auctionsEndTime: number;
    auctionLength: number;
    numAuctions: number;
    redeemEnableTime: number;
    auctionRepReward: BigNumber;
}

export interface LockStaticParams {
    numLockingPeriods: number;
    batchTime: number;
    startTime: number;
    agreementHash: string;
    maxLockingBatches: number;
}

export interface AirdropStaticParams {
    snapshotBlock: number;
    snapshotTotalSupplyAt: BigNumber;
    claimStartTime: number;
    claimEndTime: number;
    totalRepReward: BigNumber;
    token: string;
}