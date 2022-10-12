import { getData } from "../../../utils/serverHelper"
import { GETADMIN, GETHEAD, GETSTAFF } from "../../../utils/urls"
import { loadingReducer, failedReducer, successAdminReducer, successHeadReducer, successStaffReducer } from "./staffReducer";

export const getStaff = async (dispatch) => {
    try {
        console.log('hahaha staff');
        dispatch(loadingReducer());
        const data = await getData(GETSTAFF);
        // console.log(data, "staff data");
        dispatch(successStaffReducer(data));
        console.log('hahaha staff',data);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
        console.log('hahaha staff',error);
    }
}
export const getAdmin = async (dispatch) => {
    try {
        console.log('hahaha staff');
        dispatch(loadingReducer());
        const data = await getData(GETADMIN);
        // console.log(data, "staff data");
        dispatch(successAdminReducer(data));
        console.log('hahaha staff',data);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
        console.log('hahaha staff',error);
    }
}
export const getHead = async (dispatch) => {
    try {
        console.log('hahaha staff');
        dispatch(loadingReducer());
        const data = await getData(GETHEAD);
        // console.log(data, "staff data");
        dispatch(successHeadReducer(data));
        console.log('hahaha staff',data);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
        console.log('hahaha staff',error);
    }
}