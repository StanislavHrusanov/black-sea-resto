import * as api from "./api";

const endpoints = {
    allRestaurants: '/data/restaurants?sortBy=_createdOn%20desc',
    addRestaurant: '/data/restaurants',
    getRestaurant: (restaurantId) => `/data/restaurants/${restaurantId}`
}

export const getAllRestaurants = () => api.get(endpoints.allRestaurants);

export const addRestaurant = (data) => api.post(endpoints.addRestaurant, data);

export const getOne = (restaurantId) => api.get(endpoints.getRestaurant(restaurantId));