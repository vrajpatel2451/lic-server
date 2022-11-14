import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'initial',
    errorMessage: '',
    adminLogs: [],
    staffLogs: [],
}


const logsReducer = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        loadingLogs(state) {
            state.status = 'loading';
            state.adminLogs = [];
            state.staffLogs = [];
        },
        successAdminLogs(state, action) {
            state.status = 'success';
            state.adminLogs = action.payload.data;
        },
        successStaffLogs(state, action) {
            state.status = 'success';
            state.staffLogs = action.payload.data;
        },
        failedLogs(state, action) {
            state.status = 'error';
            state.errorMessage = action.payload.message;
            state.adminLogs = [];
            state.adminLogs = [];
        },
    }
})

export default logsReducer.reducer;

export const {loadingLogs,successAdminLogs,successStaffLogs,failedLogs} = logsReducer.actions;
