import { getData } from "../../../utils/serverHelper"
import { GETCLIENTDASHBOARD, GETTASKDASHBOARD } from "../../../utils/urls";
import { failedDashboard, loadingDashboard, successDashboard } from "./dashboardReducer";

export const dashBoardStuff = async(dispatch)=>{
    try {
        dispatch(loadingDashboard());
        const taskData = await getData(GETTASKDASHBOARD);
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const clientData = await getData(GETCLIENTDASHBOARD+`?month=${month}&year=${year}`);
        console.log('my',taskData.data);
        console.log('my',clientData.data);
        dispatch(successDashboard({clientGraph: clientData?.data?.data,clientPie:clientData?.data?.pie,taskPie:taskData.data}));

    } catch (error) {
        dispatch(failedDashboard({ message: error.response?.data?.error?.message || error?.message }))
    }
}