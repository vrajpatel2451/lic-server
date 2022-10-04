import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'initial',
    errorMessage: '',
    user: [],
    token: '',
}

const staffReducer = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        loadingReducer(state) {
            state.status = 'loading';
            state.user = [];
            state.token = '';
        },
        successReducer(state, action) {
            // console.log(action.payload, "action.payload");
            state.status = 'success';
            state.user = action.payload.data;
            state.token = action.payload.data.accessToken;
        },
        failedReducer(state, action) {
            console.log(action);
            state.status = 'error';
            state.errorMessage = action.payload.message;
            state.user = [];
            state.token = '';
        },
    },
});


export default staffReducer.reducer;

export const { loadingReducer, successReducer, failedReducer } = staffReducer.actions;