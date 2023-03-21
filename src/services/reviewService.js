import * as api from "./api";

const endpoints = {
    getReviewsById: (restaurantId) => `/data/reviews?where=restaurantId%3D%22${restaurantId}%22`,
    add: '/data/reviews',
    edit: (reviewId) => `/data/reviews/${reviewId}`,
    delete: (reviewId) => `/data/reviews/${reviewId}`
}

export const getById = (restaurantId) => api.get(endpoints.getReviewsById(restaurantId));

export const addReview = (review) => api.post(endpoints.add, review);

export const editReview = (reviewId, data) => api.put(endpoints.edit(reviewId), data);

export const deleteReview = (reviewId) => api.del(endpoints.delete(reviewId));