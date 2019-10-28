// Stores
import ProviderStore from "./Provider";
import AirdropStore from "./Airdrop";
import LockNECStore from "./LockNEC";
import BidGENStore from "./BidGEN";
import LockFormStore from "./LockForm"
import BidFormStore from "./BidForm"
import ExtendLockFormStore from "./ExtendLockForm"
import TokenStore from "./Token"
import TimeStore from "./Time"
import * as deployed from 'deployed.json'

export class RootStore {
    public providerStore: ProviderStore
    public airdropStore: AirdropStore
    public lockNECStore: LockNECStore
    public bidGENStore: BidGENStore
    public lockFormStore: LockFormStore
    public bidFormStore: BidFormStore
    public extendLockFormStore: ExtendLockFormStore
    public tokenStore: TokenStore
    public timeStore: TimeStore

    private dataUpdateInterval: any
    private clockUpdateInterval: any
    private blockUpdateInterval: any

    constructor() {
        this.providerStore = new ProviderStore(this)
        this.airdropStore = new AirdropStore(this)
        this.lockNECStore = new LockNECStore(this)
        this.bidGENStore = new BidGENStore(this)
        this.lockFormStore = new LockFormStore(this)
        this.bidFormStore = new BidFormStore(this)
        this.extendLockFormStore = new ExtendLockFormStore(this)
        this.tokenStore = new TokenStore(this)
        this.timeStore = new TimeStore(this)
    }

    setClockUpdateInteral = () => {
        if (this.clockUpdateInterval) {
            clearInterval(this.clockUpdateInterval)
        }

        this.clockUpdateInterval = setInterval(() => {
            this.timeStore.fetchCurrentTime();

        }, 100);
    }

    setBlockUpdateInteral = () => {
        if (this.blockUpdateInterval) {
            clearInterval(this.clockUpdateInterval)
        }

        this.blockUpdateInterval = setInterval(() => {
            this.timeStore.fetchCurrentBlock();
        }, 1000);
    }

    fetchLockingData = async (userAddress) => {
        console.log(`[Fetch] Locking Data for ${userAddress}`)

        const necTokenAddress = deployed.NectarToken
        const lockSchemeAddress = deployed.ContinuousLocking4Reputation

        if (!this.lockNECStore.areStaticParamsLoaded()) {
            await this.lockNECStore.fetchStaticParams()
        }

        await this.tokenStore.fetchBalanceOf(necTokenAddress, userAddress)
        await this.tokenStore.fetchAllowance(necTokenAddress, userAddress, lockSchemeAddress)
        await this.lockNECStore.fetchUserLocks(userAddress)

    }

    fetchAuctionData = async (userAddress) => {
        console.log(`[Fetch] Auction Data for ${userAddress}`)

        const genTokenAddress = deployed.GenToken
        const auctionSchemeAddress = deployed.Auction4Reputation

        if (!this.bidGENStore.areStaticParamsLoaded()) {
            await this.bidGENStore.fetchStaticParams()
        }

        await this.tokenStore.fetchBalanceOf(genTokenAddress, userAddress)
        await this.tokenStore.fetchAllowance(genTokenAddress, userAddress, auctionSchemeAddress)
        await this.bidGENStore.fetchAuctionData()
    }

    fetchAirdropData = async (userAddress) => {
        console.log(`[Fetch] Airdrop Data for ${userAddress}`)

        if (!this.airdropStore.areStaticParamsLoaded()) {
            await this.airdropStore.fetchStaticParams()
        }

        await this.airdropStore.fetchUserData(userAddress)
    }

    setDataUpdateInterval = async (userAddress) => {
        if (this.dataUpdateInterval) {
            clearInterval(this.dataUpdateInterval)
        }

        this.dataUpdateInterval = setInterval(async () => {
            this.timeStore.fetchCurrentBlock();
            this.fetchLockingData(userAddress)
            this.fetchAirdropData(userAddress)
            this.fetchAuctionData(userAddress)

        }, 3000);
    }
}

const store = new RootStore();
export default store;
