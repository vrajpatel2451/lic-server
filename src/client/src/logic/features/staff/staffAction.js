import { toast } from "react-toastify";
import { getData, patchData, postSuperData } from "../../../utils/serverHelper"
import { CHANGE_OWN_PASSWORD, CHANGE_PASSWORD, GETADMIN, GETHEAD, GETHEADBYBRANCH, GETSTAFF, GETSTAFFBYBRANCH, REGISTER_ADMIN } from "../../../utils/urls"
import { loadingReducer, failedReducer, successAdminReducer, successHeadReducer, successStaffReducer, successPasswordReducer, successAdminCreateReducer } from "./staffReducer";

export const getStaff = async (dispatch) => {
    try {
        console.log('hahaha staff');
        dispatch(loadingReducer());
        const data = await getData(GETSTAFF);
        // console.log(data, "staff data");
        dispatch(successStaffReducer(data));
        console.log('hahaha staff', data);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
        console.log('hahaha staff', error);
    }
}
export const getAdmin = async (dispatch) => {
    try {
        console.log('hahaha staff');
        dispatch(loadingReducer());
        const data = await getData(GETADMIN);
        // console.log(data, "staff data");
        dispatch(successAdminReducer(data));
        console.log('hahaha staff', data);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
        console.log('hahaha staff', error);
    }
}
export const getHead = async (dispatch) => {
    try {
        console.log('hahaha staff');
        dispatch(loadingReducer());
        const data = await getData(GETHEAD);
        // console.log(data, "staff data");
        dispatch(successHeadReducer(data));
        console.log('hahaha staff', data);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
        console.log('hahaha staff', error);
    }
}
export const getHeadByBranchOrDepartment = async (dispatch, department, branch) => {
    try {
        console.log('hahaha staff');
        dispatch(loadingReducer());
        const data = await getData(GETHEADBYBRANCH(branch, department));
        // console.log(data, "staff data");
        dispatch(successHeadReducer(data));
        console.log('hahaha staff', data);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
        console.log('hahaha staff', error);
    }
}
export const getStaffByBranchOrDepartment = async (dispatch, department, branch) => {
    try {
        console.log('hahaha staff');
        dispatch(loadingReducer());
        const data = await getData(GETSTAFFBYBRANCH(branch, department));
        // console.log(data, "staff data");
        dispatch(successStaffReducer(data));
        console.log('hahaha staff', data);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
        console.log('hahaha staff', error);
    }
}


export const changeStaffPassword = async (dispatch, req, navigate) => {
    console.log(req);
    // req = { ...req}
    try {
        dispatch(loadingReducer());
        const data = await patchData(CHANGE_PASSWORD, req);
        dispatch(successPasswordReducer());
        navigate(-1);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
    }
}


export const createAdmin = async (dispatch, req, navigate) => {
    console.log(req);
    // req = { ...req}
    try {
        dispatch(loadingReducer());
        const data = await postSuperData(REGISTER_ADMIN, req);
        dispatch(successAdminCreateReducer(data));
        navigate(-1);
    } catch (error) {
        dispatch(failedReducer({ message: error.response?.data?.error?.message || error?.message }));
        toast.error((error.response?.data?.error?.message || error?.message) || 'Something went wrong', {
            position: toast.POSITION.TOP_RIGHT,
          });
    }
}