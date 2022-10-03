import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'initial',
    errorMessage: '',
    user: {},
    token:''
     
}


const clientReducer = createSlice({
        name : 'client',
        initialState,
        reducers:{
            loadingClient(state) {
                state.status = 'loading';
                state.user = {};
                state.token = '';
                
            },
            successClient(state, action) {
                console.log("action",action);
                state.status = 'success';
                state.user = action.payload.data.user;
                state.token = action.payload.data.accessToken;
               
            },
            failedClient(state, action) {
               
                state.status = 'error';
                state.errorMessage = action.payload.message;
                state.user = {};
                state.token = '';
                
            },
        }
})

export default clientReducer.reducer;

export const {loadingClient,successClient,failedClient} = clientReducer.actions;
