import { createAsyncThunk } from "@reduxjs/toolkit";
import indexSearch from "../../../utils/searchCLients";
import { getData, patchData, postData } from "../../../utils/serverHelper";
import { GETCLIENT, UPDATEDOC, UPDATEFIELDS, UPLOADDOC, UPLOADFIELDS } from "../../../utils/urls";
import { loadingClient, successClient, failedClient, loadingClienDetails, successClientDetails, failedClientDetails, loadingUploadDoc, successUploadDoc, failedUploadDoc, changeBasicFields } from './clientReducer';


export const getClient = async (dispatch) => {
    try {
        dispatch(loadingClient());
        const data = await getData(GETCLIENT);
        // console.log("===>data",data);
        //localStorage.setItem('token', data.data?.accessToken)
        dispatch(successClient(data));
    } catch (error) {
        dispatch(failedClient({ message: error.response?.data?.error?.message || error?.message }));
    }
}
export const getClientBySearch = async (dispatch,keyword) => {
    console.log("===>log");
    try {
        dispatch(loadingClient());
        const data = await (await indexSearch).search(keyword);
        console.log("===>log",data.hits);
        //localStorage.setItem('token', data.data?.accessToken)
        dispatch(successClient({data:data.hits}));
    } catch (error) {
        dispatch(failedClient({ message: error.response?.data?.error?.message || error?.message }));
    }
}
export const getClientDetails = async (dispatch,id) => {
    console.log('hahahah');
    try {
        dispatch(loadingClienDetails());
        const data = await getData(GETCLIENT+`/web/${id}`);
        console.log("===>data",data);
        //localStorage.setItem('token', data.data?.accessToken)
        dispatch(successClientDetails(data));
    } catch (error) {
        dispatch(failedClientDetails({ message: error.response?.data?.error?.message || error?.message }));
    }
}
export const uploadDoc = async (dispatch,dataPass,client,cb) => {
    console.log('hahahah',dataPass);
    try {
        dispatch(loadingUploadDoc());
        const formData = new FormData();
        formData.append('client',client);
        formData.append('taskDoc',dataPass.taskDoc);
        formData.append('name',dataPass.name);
        formData.append('type',dataPass.type);
        const data = await postData(UPLOADDOC,formData);
        console.log("===>data",data);
        cb();
        //localStorage.setItem('token', data.data?.accessToken)
        dispatch(successUploadDoc());
        await getClientDetails(dispatch,client);
    } catch (error) {
        console.log('error jo',error);
        dispatch(failedUploadDoc({ message: error.response?.data?.error?.message || error?.message }));
    }
}
export const uploadField = async (dispatch,dataPass,client,cb) => {
    console.log('hahahah',dataPass);
    try {
        dispatch(loadingUploadDoc());
        const formData = {client,fields:dataPass};
        const data = await patchData(UPLOADFIELDS,formData);
        console.log("===>data",data);
        cb();
        //localStorage.setItem('token', data.data?.accessToken)
        dispatch(successUploadDoc());
        await getClientDetails(dispatch,client);
    } catch (error) {
        console.log('error here',error);
        dispatch(failedUploadDoc({ message: error.response?.data?.error?.message || error?.message }));
    }
}
export const updateField = async (dispatch,dataPass,field,cb,client) => {
    console.log('hahahah',dataPass);
    try {
        dispatch(loadingUploadDoc());
        const formData = {value:dataPass.value,update:dataPass.update,field};
        const data = await patchData(UPDATEFIELDS,formData);
        console.log("===>data",data);
        cb();
        //localStorage.setItem('token', data.data?.accessToken)
        dispatch(successUploadDoc());
        await getClientDetails(dispatch,client);
    } catch (error) {
        console.log('error here',error);
        dispatch(failedUploadDoc({ message: error.response?.data?.error?.message || error?.message }));
    }
}

export const updateDoc = async (dispatch,dataPass,cb,client) => {
    console.log('hahahah',dataPass);
    try {
        dispatch(loadingUploadDoc());
        const formData = new FormData();
        formData.append('document',dataPass.document);
        formData.append('taskDoc',dataPass.taskDoc);
        const data = await patchData(UPDATEDOC,formData);
        console.log("===>data",data);
        cb();
        //localStorage.setItem('token', data.data?.accessToken)
        dispatch(successUploadDoc());
        await getClientDetails(dispatch,client);
    } catch (error) {
        console.log('error here',error);
        dispatch(failedUploadDoc({ message: error.response?.data?.error?.message || error?.message }));
    }
}

export const changeBasicFieldsAction=(dispatch,e)=>{
    dispatch(changeBasicFields({name:e.target.name,value:e.target.value}));
}