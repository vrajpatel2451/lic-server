import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authReducer';
import branchReducer from './features/branch/branchReducer';
import clientReducer from './features/client/clientReducer';
import dashboardReducer from './features/dashboard/dashboardReducer';
import departmentReducer from './features/department/departmentReducer';
import staffReducer from './features/staff/staffReducer'


const store = configureStore({
    reducer: {
        auth: authReducer,
        client:clientReducer,
        staff: staffReducer,
        dashboard: dashboardReducer,
        branch: branchReducer,
        department: departmentReducer,
    },
})

export default store