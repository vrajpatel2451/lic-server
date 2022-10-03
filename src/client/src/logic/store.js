import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authReducer';
import staffReducer from './features/staff/staffReducer'
// import authReducers from './reducers/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        staff: staffReducer
    },
})

export default store