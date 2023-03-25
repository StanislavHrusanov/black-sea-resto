import * as api from "./api";

const endpoints = {
    userFavourites: (ownerId) => `/data/favourites?where=_ownerId%3D%22${ownerId}%22`,
    isRrestaurantInFavourites: (restaurantId) => `/data/favourites?where=restaurantId%3D%22${restaurantId}%22`,
    addToFavourites: '/data/favourites',
    deleteFromFavourites: (favouriteId) => `/data/favourites/${favouriteId}`
}

export const getUserFavourites = (ownerId) => api.get(endpoints.userFavourites(ownerId));

export const getFavourites = (restaurantId) => api.get(endpoints.isRrestaurantInFavourites(restaurantId));

export const addToFavourites = (data) => api.post(endpoints.addToFavourites, data);

export const removeFromFavourites = (favouriteId) => api.del(endpoints.deleteFromFavourites(favouriteId));