import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../../../utils/serverHelper"
import { LOGIN, VERIFY } from "../../../utils/urls"
import { failedAuth, loadingAuth, successAuth } from "./authReducer";

export const verifyUser = async (dispatch) => {
    try {
        dispatch(loadingAuth());
        const data = await getData(VERIFY);
        dispatch(successAuth(data));
    } catch (error) {
        dispatch(failedAuth({ message: error.response?.data?.error?.message || error?.message }));
    }
}

export const login = async (dispatch, req) => {
    console.log(req);
    req = { ...req, fcmToken: "abc" }
    try {
        dispatch(loadingAuth());
        const data = await postData(LOGIN, req);
        console.log(data, "hello wrold");
        localStorage.setItem('token', data.data?.accessToken)
        dispatch(successAuth(data?.data));
    } catch (error) {
        dispatch(failedAuth({ message: error.response?.data?.error?.message || error?.message }));
    }
}