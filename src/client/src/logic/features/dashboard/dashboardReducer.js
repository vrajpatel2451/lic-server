import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'initial',
    errorMessage: '',
    taskPie: {},
    clientPie: {},
    clientGraph: [],
}

const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        loadingDashboard(state) {
            state.status = 'loading';
        },
        successDashboard(state, action) {
            state.status = 'success';
            state.clientGraph = action.payload.clientGraph;
            state.clientPie = action.payload.clientPie;
            state.taskPie = action.payload.taskPie;
            state.errorMessage = '';
        },
        failedDashboard(state, action) {
            console.log(action);
            state.status = 'error';
            state.errorMessage = action.payload?.message;
            state.clientGraph = [];
            state.taskPie = {};
            state.clientPie = {};
        },
    },
});

export default dashboardReducer.reducer;

export const { loadingDashboard, successDashboard, failedDashboard } = dashboardReducer.actions;