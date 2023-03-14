import * as api from "./api";

const endpoints = {
    allRestaurants: '/data/restaurants?sortBy=_createdOn%20desc',
    addRestaurant: '/data/restaurants'
}

export const getAllRestaurants = () => api.get(endpoints.allRestaurants);

export const addRestaurant = (data) => api.post(endpoints.addRestaurant, data);