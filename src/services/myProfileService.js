import * as api from "./api";

const endpoints = {
    getUserInfo: '/users/me'
}

export const getUserDetails = () => api.get(endpoints.getUserInfo);