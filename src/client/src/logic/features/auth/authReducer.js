import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'initial',
    errorMessage: '',
    isLoggedIn: false,
    user: {},
    token: '',
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadingAuth(state) {
            state.status = 'loading';
            state.user = {};
            state.token = '';
            state.isLoggedIn = false;
        },
        successAuth(state, action) {
            // console.log(action, "login credentials");
            state.status = 'success';
            state.user = action.payload.data.user;
            state.token = action.payload.data.accessToken;
            state.isLoggedIn = true;
        },
        failedAuth(state, action) {
            console.log(action);
            state.status = 'error';
            state.errorMessage = action.payload.message;
            state.user = {};
            state.token = '';
            state.isLoggedIn = false;
        },
    },
});

export default authReducer.reducer;

export const { loadingAuth, successAuth, failedAuth } = authReducer.actions;