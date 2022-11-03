import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../../../utils/serverHelper";
import { GETCLIENT } from "../../../utils/urls";
import { loadingClient, successClient, failedClient, loadingClienDetails, successClientDetails, failedClientDetails } from './clientReducer';


export const getClient = async (dispatch) => {
    try {
        dispatch(loadingClient());
        const data = await getData(GETCLIENT);
        // console.log("===>data",data);
        //localStorage.setItem('token', data.data?.accessToken)
        dispatch(successClient(data));
    } catch (error) {
        dispatch(failedClient({ message: error.response?.data?.error?.message || error?.message }));
    }
}
export const getClientDetails = async (dispatch,id) => {
    console.log('hahahah');
    try {
        dispatch(loadingClienDetails());
        const data = await getData(GETCLIENT+`/web/${id}`);
        console.log("===>data",data);
        //localStorage.setItem('token', data.data?.accessToken)
        dispatch(successClientDetails(data));
    } catch (error) {
        dispatch(failedClientDetails({ message: error.response?.data?.error?.message || error?.message }));
    }
}