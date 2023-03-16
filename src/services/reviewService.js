import * as api from "./api";

const endpoints = {
    getReviewsById: (restaurantId) => `/data/reviews?where=restaurantId%3D%22${restaurantId}%22`
}

export const getById = (restaurantId) => api.get(endpoints.getReviewsById(restaurantId));