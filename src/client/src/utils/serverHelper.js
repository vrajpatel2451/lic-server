import axiosInstance from "./axiosHelper"

export const getData = async (url = '', requireToken = false) => {
    const token = localStorage.getItem('token');
    const data = await axiosInstance.get(url, { headers: { "Authorization": requireToken ? `Bearer ${token}` : null } });
    return data.data;
}
export const postData = async (url = '', data, requireToken = false) => {
    const token = localStorage.getItem('token');
    const data = await axiosInstance.post(url, { data, headers: { "Authorization": requireToken ? `Bearer ${token}` : null } });
    return data.data;
}
export const patchData = async (url = '', data, requireToken = false) => {
    const token = localStorage.getItem('token');
    const data = await axiosInstance.patch(url, { data, headers: { "Authorization": requireToken ? `Bearer ${token}` : null } });
    return data.data;
}