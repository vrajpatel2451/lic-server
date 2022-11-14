import { getData } from "../../../utils/serverHelper";
import { ADMIN_LOGS, STAFF_LOGS} from "../../../utils/urls";
import { failedLogs, loadingLogs, successAdminLogs, successStaffLogs } from "./logsReducer";


export const getAdminLogs = async (dispatch) => {
    try {
        dispatch(loadingLogs());
        const data = await getData(ADMIN_LOGS);
        console.log('logs data',data);
        dispatch(successAdminLogs(data));
    } catch (error) {
        dispatch(failedLogs({ message: error.response?.data?.error?.message || error?.message }));
    }
}
export const getStaffLogs = async (dispatch,staff) => {
    try {
        dispatch(loadingLogs());
        const data = await getData(STAFF_LOGS(staff));
        console.log('logs data',data);
        dispatch(successStaffLogs(data));
    } catch (error) {
        dispatch(failedLogs({ message: error.response?.data?.error?.message || error?.message }));
    }
}