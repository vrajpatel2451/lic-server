import { getData } from "../../../utils/serverHelper";
import { GETBRANCH } from "../../../utils/urls";
import { failedBranch, loadingBranch, successBranch } from "./branchReducer";


export const getBranches = async (dispatch) => {
    try {
        dispatch(loadingBranch());
        const data = await getData(GETBRANCH);
        console.log('data==>',data);
        dispatch(successBranch(data));
    } catch (error) {
        dispatch(failedBranch({ message: error.response?.data?.error?.message || error?.message }));
    }
}