import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'initial',
    errorMessage: '',
    departments: [],

}


const departmentReducer = createSlice({
    name: 'department',
    initialState,
    reducers: {
        loadingDepartment(state) {
            state.status = 'loading';
            state.departments = [];
            // state.token = '';

        },
        successDepartment(state, action) {
            // console.log("action", action.payload);
            state.status = 'success';
            state.departments = action.payload.data;
            // state.token = action.payload.data.accessToken;

        },
        failedDepartment(state, action) {

            state.status = 'error';
            state.errorMessage = action.payload.message;
            state.departments = [];
            // state.token = '';

        },
    }
})

export default departmentReducer.reducer;

export const { loadingDepartment, successDepartment, failedDepartment } = departmentReducer.actions;
