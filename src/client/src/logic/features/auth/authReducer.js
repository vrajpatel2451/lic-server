import { createSlice } from "@reduxjs/toolkit";
import cookie from "react-cookies";


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
        },
        successAuth(state, action) {
            state.status = 'success';
            cookie.save('token',action.payload?.accessToken,{
                maxAge: 24 * 60 * 60,
            });
            console.log('chodinu token',action.payload);
            state.user = action.payload?.user;
            state.token = action.payload?.accessToken;
            state.isLoggedIn = true;
        },
        failedAuth(state, action) {
            // localStorage.removeItem('token');
            console.log(action);
            cookie.remove('token');
            state.status = 'error';
            state.errorMessage = action.payload?.message;
            state.user = {};
            state.token = '';
            state.isLoggedIn = false;
        },
        logOutAuth(state,action){
            // localStorage.removeItem('token');
            cookie.remove('token');
            state.isLoggedIn = false;
            state.token='';
            state.user={};
        }
    },
});

export default authReducer.reducer;

export const { loadingAuth,logOutAuth, successAuth, failedAuth } = authReducer.actions;