import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authReducer';
import clientReducer from './features/client/clientReducer';
// import authReducers from './reducers/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        client:clientReducer,
    },
})

export default store