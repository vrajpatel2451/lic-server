import { getData } from "../../../utils/serverHelper";
import { GETDEPARTMENT } from "../../../utils/urls";
import { failedDepartment, loadingDepartment, successDepartment } from "./departmentReducer";


export const getDepartments = async (dispatch) => {
    try {
        dispatch(loadingDepartment());
        const data = await getData(GETDEPARTMENT);
        console.log('data==>',data);
        dispatch(successDepartment(data));
    } catch (error) {
        dispatch(failedDepartment({ message: error.response?.data?.error?.message || error?.message }));
    }
}