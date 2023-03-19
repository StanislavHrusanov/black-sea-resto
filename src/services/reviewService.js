import * as api from "./api";

const endpoints = {
    getReviewsById: (restaurantId) => `/data/reviews?where=restaurantId%3D%22${restaurantId}%22`,
    addReview: '/data/reviews'
}

export const getById = (restaurantId) => api.get(endpoints.getReviewsById(restaurantId));

export const addReview = (review) => api.post(endpoints.addReview, review);