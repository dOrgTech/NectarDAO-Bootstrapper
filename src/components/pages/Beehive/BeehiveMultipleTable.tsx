// @ts-nocheck

import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import MaterialTable from 'material-table'
import Remove from '@material-ui/icons/Remove';
import { RootStore } from "stores/Root";
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import TableBody from "@material-ui/core/TableBody";
import ViewColumn from '@material-ui/icons/ViewColumn';
import dayjs from "dayjs";
import dotenv from "dotenv";
import { forwardRef } from 'react';
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

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

const timelockContract = require("../../../abi/TokenTimelock.json")

dotenv.config();

const parseDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY/MM/DD HH:mm:ss')
}

const data = [
    { volumeAtSnapshot: 0, multiple: 0.8, },
    { volumeAtSnapshot: 5000, multiple: 1.0, },
    { volumeAtSnapshot: 50000, multiple: 1.2, },
    { volumeAtSnapshot: 250000, multiple: 1.5, },
    { volumeAtSnapshot: 1000000, multiple: 2.0, },
]

const CustomizedTable = inject("root")(
    observer((props) => {
        const { beehiveStore, providerStore } = props.root as RootStore;
        const tableData = beehiveStore.multipleTableData;
        console.log(tableData)
        const { editable } = props;
        const editableProps = editable === false ? null :
            {
                isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
                isEditHidden: rowData => rowData.name === 'x',
                isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
                isDeleteHidden: rowData => rowData.name === 'y',
                onBulkUpdate: null, // won't support this for now
                /*changes =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            // setData([...data, newData]); 

                            resolve();
                        }, 1000);
                    }),
                    */
                onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            /* setData([...data, newData]); */

                            resolve();
                        }, 1000);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);

                            resolve();
                        }, 1000);
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);

                            resolve();
                        }, 1000);
                    })
            }

        return (
            <MaterialTable
                editable={editableProps}
                icons={tableIcons}
                title={'Reward Multiples'}
                columns={[
                    {
                        title: '24 Hr Volume At Snapshot',
                        field: 'volumeMin',
                        type: 'numeric',
                        cellStyle: {
                            backgroundColor: "rgba(5, 15, 22, 0.5)",
                        },
                    },
                    {
                        title: 'Multiple',
                        field: 'rewardMultiple',
                        type: 'numeric',
                        cellStyle: {
                            backgroundColor: "rgba(5, 15, 22, 0.5)",
                        },
                    }
                ]}
                data={tableData}
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
