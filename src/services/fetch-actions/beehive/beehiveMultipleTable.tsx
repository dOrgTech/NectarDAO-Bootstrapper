import {
    BaseFetch,
    FetchActionResult,
    StatusEnum,
} from "services/fetch-actions/BaseFetch";
import { MultipleTableData, MultipleTableDataDTO } from "types";

import { RootStore } from "stores/Root";
import dayjs from "dayjs";

const tableDataMapper = (multipleTableDataDtos: MultipleTableDataDTO[]): MultipleTableData[] => {
    return multipleTableDataDtos.map((dto) => {
        const {
            volume_minimum,
            reward_multiple,
            id,
        } = dto;
        return {
            volumeMin: volume_minimum,
            rewardMultiple: reward_multiple,
            id: id
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

        if (!result.error) {
            return {
                status: StatusEnum.SUCCESS,
                data: tableDataMapper(result)
            }
        }

        return {
            status: StatusEnum.ERROR,
            data: []
        }
    }
}
