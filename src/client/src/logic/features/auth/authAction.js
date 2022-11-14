import { getData, postData } from "../../../utils/serverHelper"
import { LOGIN, VERIFY } from "../../../utils/urls"
import { failedAuth, loadingAuth, successAuth } from "./authReducer";

export const verifyUser = async (dispatch) => {
    try {
        console.log('here verify');
        dispatch(loadingAuth());
        const data = await getData(VERIFY);
        console.log('here here verify',data?.data);
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
        // console.log(data, "hello wrold");
        console.log('chodu login data',data);
        // localStorage.setItem('token', data.data?.accessToken)
        dispatch(successAuth(data.data));
    } catch (error) {
        dispatch(failedAuth({ message: error.response?.data?.error?.message || error?.message }));
    }
}