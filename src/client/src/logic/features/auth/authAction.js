import { toast } from "react-toastify";
import { getData, patchData, postData } from "../../../utils/serverHelper"
import { CHANGE_OWN_PASSWORD, CHANGE_PASSWORD, LOGIN, VERIFY } from "../../../utils/urls"
import { failedAuth, loadingAuth, logOutAuth, successAuth } from "./authReducer";

export const verifyUser = async (dispatch) => {
    try {
        console.log('here verify');
        dispatch(loadingAuth());
        const data = await getData(VERIFY);
        console.log('here here verify', data?.data);
        dispatch(successAuth(data?.data));
    } catch (error) {
        console.log(error, 'log here verify');
        dispatch(failedAuth({ message: error.response?.data?.error?.message || error?.message }));
    }
}

export const login = async (dispatch, req) => {
    console.log(req);
    // req = { ...req}
    try {
        dispatch(loadingAuth());
        const data = await postData(LOGIN, req);
        dispatch(successAuth(data.data));
    } catch (error) {
        dispatch(failedAuth({ message: error.response?.data?.error?.message || error?.message }));
    }
}

export const changePassword = async (dispatch, req) => {
    console.log(req);
    // req = { ...req}
    try {
        dispatch(loadingAuth());
        const data = await patchData(CHANGE_OWN_PASSWORD, req);
        dispatch(logOutAuth());
    } catch (error) {
        dispatch(failedAuth({ message: error.response?.data?.error?.message || error?.message }));
    }
}