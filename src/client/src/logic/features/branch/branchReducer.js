import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'initial',
    errorMessage: '',
    branches: [],

}


const branchReducer = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        loadingBranch(state) {
            state.status = 'loading';
            state.branches = [];
            // state.token = '';

        },
        successBranch(state, action) {
            // console.log("action", action.payload);
            state.status = 'success';
            state.branches = action.payload.data;
            // state.token = action.payload.data.accessToken;

        },
        failedBranch(state, action) {

            state.status = 'error';
            state.errorMessage = action.payload.message;
            state.branches = [];
            // state.token = '';

        },
    }
})

export default branchReducer.reducer;

export const { loadingBranch, successBranch, failedBranch } = branchReducer.actions;
