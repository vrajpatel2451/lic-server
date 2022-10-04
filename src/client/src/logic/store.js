import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authReducer';
import clientReducer from './features/client/clientReducer';
import staffReducer from './features/staff/staffReducer'


const store = configureStore({
    reducer: {
        auth: authReducer,
        client:clientReducer,
        staff: staffReducer
    },
})

export default store