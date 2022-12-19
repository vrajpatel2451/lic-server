import axiosInstance from "./axiosHelper";
import cookie from "react-cookies";

export const getData = async (url = '') => {
    // const token = localStorage.getItem('token');
    const token = cookie.load("token");
    // console.log('madarchod token',token);
    const data = await axiosInstance.get(url, { headers: { "Authorization": `Bearer ${token}` } });
    return data.data;
}
export const postData = async (url = '', req) => {
    // const token = localStorage.getItem('token');
    const token = cookie.load("token");
    const data = await axiosInstance.post(url, req, { headers: { "Authorization": `Bearer ${token}` } });
    return data.data;
}
export const patchData = async (url = '', req) => {
    // const token = localStorage.getItem('token');
    const token = cookie.load("token");
    const data = await axiosInstance.patch(url, req, { headers: { "Authorization": `Bearer ${token}` } });
    return data.data;
}
export const postSuperData = async (url = '', req) => {
    // const token = localStorage.getItem('token');
    const token = 'tokenSUPERtoken3485%^';
    console.log(token);
    const data = await axiosInstance.post(url, req, { headers: { "Authorization": `Bearer ${token}` } });
    return data.data;
}