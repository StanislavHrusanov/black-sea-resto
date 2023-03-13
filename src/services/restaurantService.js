import * as api from "./api";

const endpoints = {
    allRestaurants: '/data/restaurants?sortBy=_createdOn%20desc'
}

export const getAllRestaurants = () => api.get(endpoints.allRestaurants);