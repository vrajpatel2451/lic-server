import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'initial',
    errorMessage: '',
    staff: [],
    head: [],
    admin: [],
    // token: '',
}

const staffReducer = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        loadingReducer(state) {
            state.status = 'loading';
            state.staff = [];
            state.token = '';
        },
        successStaffReducer(state, action) {
            // console.log(action.payload, "action.payload");
            state.status = 'success';
            state.staff = action.payload?.data;
            // state.token = action.payload.data.accessToken;
        },
        successAdminReducer(state, action) {
            // console.log(action.payload, "action.payload");
            state.status = 'success';
            state.admin = action.payload?.data;
            // state.token = action.payload.data.accessToken;
        },
        successHeadReducer(state, action) {
            // console.log(action.payload, "action.payload");
            state.status = 'success';
            state.head = action.payload?.data;
            // state.token = action.payload.data.accessToken;
        },
        successAdminCreateReducer(state, action) {
            // console.log(action.payload, "action.payload");
            state.status = 'success';
            state.head.push(action.payload.data);
            // state.token = action.payload.data.accessToken;
        },
        successPasswordReducer(state, action) {
            // console.log(action.payload, "action.payload");
            state.status = 'success';
            // state.head = action.payload?.data;
            // state.token = action.payload.data.accessToken;
        },
        failedReducer(state, action) {
            console.log(action);
            state.status = 'error';
            state.errorMessage = action.payload.message;
            state.staff = [];
            // state.token = '';
        },
    },
});


export default staffReducer.reducer;

export const { loadingReducer, successAdminCreateReducer, successStaffReducer, successAdminReducer, successHeadReducer, failedReducer, successPasswordReducer } = staffReducer.actions;