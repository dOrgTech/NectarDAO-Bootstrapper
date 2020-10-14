import { BaseFetch, FetchActionResult, StatusEnum } from 'services/fetch-actions/BaseFetch'
import { RootStore } from 'stores/Root'

export class TradingVolumeFetch extends BaseFetch {

    constructor(contract, rootStore: RootStore) {
        const fetchText = 'Trading Volume'
        super(contract, fetchText, rootStore, {})
    }

    async fetchData(): Promise<FetchActionResult> {

        const response = await fetch(`${process.env.REACT_APP_SNAPSHOT_API_URL}/volume`)
        const dataResponse = await response.json()

        if(!dataResponse.error) {
            return {
                status: StatusEnum.SUCCESS,
                data: dataResponse
            }
        }

        return {
            status: StatusEnum.ERROR,
            data: { }
        }
    }
}