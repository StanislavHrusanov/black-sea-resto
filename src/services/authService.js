import * as api from "./api";

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout'
};

export const register = (data) => api.post(endpoints.register, data);

export const login = (data) => api.post(endpoints.login, data);

export const logout = () => api.get(endpoints.logout);
