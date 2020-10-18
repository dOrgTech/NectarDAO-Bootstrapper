import {
  BaseFetch,
  FetchActionResult,
  StatusEnum,
} from "services/fetch-actions/BaseFetch";
import { MultipleTableData, MultipleTableDataDTO } from "types";

import { RootStore } from "stores/Root";

const tableDataMapper = (
  multipleTableDataDtos: MultipleTableDataDTO[]
): MultipleTableData[] => {
  return multipleTableDataDtos.map((dto) => {
    const { multiplier, upper_limit } = dto;
    return {
      multiplier,
      upper_limit,
    };
  });
};

export class BeehiveMultipleTableFetch extends BaseFetch {
  constructor(contract, rootStore: RootStore) {
    const fetchText = "Beehive Multiple Table data";
    super(contract, fetchText, rootStore, {});
  }

  async fetchData(): Promise<FetchActionResult> {
    const response = await fetch(
      `${process.env.REACT_APP_SNAPSHOT_API_URL}/reward/multiple`
    );
    const result = await response.json();
    console.log("Result ",result)
    console.log("after mapper ", tableDataMapper(result.multiples))
    if (!result.error) {
      return {
        status: StatusEnum.SUCCESS,
        data: result.multiples ? tableDataMapper(result.multiples) : [],
      };
    }

    return {
      status: StatusEnum.ERROR,
      data: [],
    };
  }
}
