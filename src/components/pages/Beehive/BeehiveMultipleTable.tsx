// @ts-nocheck

import { addRewardMultiple, deleteRewardMultiple, updateRewardMultiple } from "services/fetch-actions/httpApi"
import { inject, observer } from "mobx-react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import MaterialTable from "material-table"
import React, { useEffect, useState } from "react";
import Remove from "@material-ui/icons/Remove";
import { RootStore } from "stores/Root";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import dotenv from "dotenv";
import { forwardRef } from "react";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

dotenv.config();

const CustomizedTable = inject("root")(
    observer((props) => {
        const { beehiveStore } = props.root as RootStore;
        const [tableState, setTableState] = useState([])
        const tableData = beehiveStore.multipleTableData;

        useEffect(() => {
            setTableState(beehiveStore.multipleTableData)
        }, [beehiveStore.multipleTableData])

        console.log(tableState)

        const { editable } = props;
        const editableProps = editable === false ? null :
            {
                onRowAdd: async function (newData: any) {
                    try {
                        await addRewardMultiple(newData);
                    }
                    catch (error) {
                        console.error(error);
                        throw error;
                    }
                    finally {
                        await beehiveStore.fetchMultipleTableData();
                    }
                },
                onRowUpdate: async function  (newData: any, oldData: any) {
                    try {
                        await updateRewardMultiple(newData);
                    }
                    catch (error) {
                        console.error(error);
                        throw error;
                    }
                    finally {
                        await beehiveStore.fetchMultipleTableData();
                    }
                },
                onRowDelete: async function  (oldData: any) {
                    try {
                        console.log(oldData.id);
                        await deleteRewardMultiple(oldData.id);
                    }
                    catch (error) {
                        console.error(error);
                        throw error;
                    }
                    finally {
                        await beehiveStore.fetchMultipleTableData();
                    }
                },
            }

        const columns = [
            {
                title: "24 Hr Volume At Snapshot",
                field: "upper_limit",
                type: "numeric",
                cellStyle: {
                    backgroundColor: "rgba(5, 15, 22, 0.5)",
                },
            },
            {
                title: "Multiple",
                field: "multiplier",
                type: "numeric",
                cellStyle: {
                    backgroundColor: "rgba(5, 15, 22, 0.5)",
                },
            }
        ]

        const editableColumns = [
            {
                title: '#',
                field: "ordinal",
                type: "numeric",
                cellStyle: {
                    backgroundColor: "rgba(5, 15, 22, 0.5)",
                },
            },
            ...columns
        ]

        return (
            <MaterialTable
                icons={tableIcons}
                editable={editableProps}
                title={"Reward Multiples"}
                columns={editable? editableColumns: columns}
                data={tableData.map((t, i) => ({ ...t, ordinal: i}))}
                style={{
                    background: "rgba(5, 15, 22, 0.5)",
                    border: "1px solid #404b67",
                    boxSizing: "border-box",
                    borderRadius: "6px",
                    margin: "15px 0 20px 0",
                }}
                options={{
                    paging: false,
                    search: false,
                    rowStyle: {
                        backgroundColor: "rgba(5, 15, 22, 0.5)",
                    },
                    headerStyle: {
                        backgroundColor: "rgba(5, 15, 22, 0.5)",
                    }
                }}
            />
        );
    })
);

export default CustomizedTable;
