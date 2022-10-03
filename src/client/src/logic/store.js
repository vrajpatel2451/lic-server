import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authReducer';
// import authReducers from './reducers/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})

export default store