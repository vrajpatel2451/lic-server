import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'initial',
    uploadStatus: 'initial',
    errorMessage: '',
    doc: {},
    clients: [],
    clientDetails: [],
    token: ''

}


const clientReducer = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadingClient(state) {
            state.status = 'loading';
            state.clients = [];
            // state.token = '';

        },
        successClient(state, action) {
            // console.log("action", action.payload);
            state.status = 'success';
            state.clients = action.payload.data;
            // state.token = action.payload.data.accessToken;

        },
        failedClient(state, action) {

            state.status = 'error';
            state.errorMessage = action.payload.message;
            state.clients = [];
            // state.token = '';

        },
        loadingClienDetails(state) {
            state.status = 'loading';
            state.clientDetails = {};
            // state.token = '';

        },
        successClientDetails(state, action) {
            // console.log("action", action.payload);
            state.status = 'success';
            state.clientDetails = action.payload.data;
            // state.token = action.payload.data.accessToken;

        },
        failedClientDetails(state, action) {

            state.status = 'error';
            state.errorMessage = action.payload.message;
            state.clientDetails = {};
            // state.token = '';

        },
        loadingUploadDoc(state) {
            state.uploadStatus = 'loading';
        },
        changeBasicFields(state,action) {
            state.clientDetails.client[action.payload.name] = action.payload.value;
        },
        successUploadDoc(state, action) {
            state.uploadStatus = 'success';
        },
        failedUploadDoc(state, action) {
            state.uploadStatus = 'error';
            state.errorMessage = action.payload.message;
        },
        setFileUrl(state, action) {
            state.doc = action.payload;
        },
    }
})

export default clientReducer.reducer;

export const { loadingClient,loadingUploadDoc,successUploadDoc,changeBasicFields, failedUploadDoc, setFileUrl,successClient, failedClient,loadingClienDetails,successClientDetails,failedClientDetails } = clientReducer.actions;
