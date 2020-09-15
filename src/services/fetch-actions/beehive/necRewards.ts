import { BaseFetch, FetchActionResult, StatusEnum } from 'services/fetch-actions/BaseFetch'
import { RootStore } from 'stores/Root'

export class NecRewardsFetch extends BaseFetch {

  constructor(contract, rootStore: RootStore) {
      const fetchText = 'Nec Rewards Data'
      super(contract, fetchText, rootStore, {})
  }

  async fetchData(): Promise<FetchActionResult> {

      const response = await fetch(`http://localhost:3500/reward`)
      const dataResponse = await response.json()
      
      return {
        status: StatusEnum.SUCCESS,
        data: dataResponse
      }
  }
}