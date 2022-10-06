import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../../../utils/serverHelper"
import { GETSTAFF } from "../../../utils/urls"
import { loadingReducer, successReducer, failedReducer } from "./staffReducer";

export const getStaff = async (dispatch) => {
    try {
        dispatch(loadingReducer());
        const data = await getData(GETSTAFF);
        // console.log(data, "staff data");
        dispatch(successReducer(data));
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
    }
}