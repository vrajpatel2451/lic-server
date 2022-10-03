import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../../../utils/serverHelper";
import { GETCLIENT } from "../../../utils/urls";
import  {loadingClient,successClient,failedClient} from './clientReducer';


export const getClient = async(dispatch) => {
        try {
            dispatch(loadingClient());
            const data = await getData(GETCLIENT);
            console.log(data,"===>data");
            localStorage.setItem('token', data.data?.accessToken)
            dispatch(successClient(data?.data));
        } catch (error) {
            dispatch(failedClient({ message: error.response?.data?.error?.message || error?.message }));
        }
}