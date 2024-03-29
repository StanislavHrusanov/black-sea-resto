import * as api from "./api";

const endpoints = {
    allRestaurants: '/data/restaurants?sortBy=_createdOn%20desc',
    addRestaurant: '/data/restaurants',
    getRestaurant: (restaurantId) => `/data/restaurants/${restaurantId}`,
    editRestaurant: (restaurantId) => `/data/restaurants/${restaurantId}`,
    deleteRestaurant: (restaurantId) => `/data/restaurants/${restaurantId}`,
    getUserRestaurants: (userId) => `/data/restaurants?where=_ownerId%3D%22${userId}%22`
}

export const getAllRestaurants = () => api.get(endpoints.allRestaurants);

export const addRestaurant = (data) => api.post(endpoints.addRestaurant, data);

export const getOne = (restaurantId) => api.get(endpoints.getRestaurant(restaurantId));

export const edit = (restaurantId, data) => api.put(endpoints.editRestaurant(restaurantId), data);

export const del = (restaurantId) => api.del(endpoints.deleteRestaurant(restaurantId));

export const getMyRestaurants = (userId) => api.get(endpoints.getUserRestaurants(userId));