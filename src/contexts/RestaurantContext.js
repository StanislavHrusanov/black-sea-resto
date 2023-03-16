import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as restaurantService from "../services/restaurantService";

export const RestaurantContext = createContext();

const restaurantReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_RESTAURANTS':
            return [...action.payload];
        case 'UPDATE_RESTAURANTS':
            return [...state, action.payload];
        case 'UPDATE_RESTAURANT_DETAILS':
            return state.map(x => x._id === action.restaurantId ? action.payload : x)
        default:
            return state;
    }
}


export const RestaurantProvider = ({ children }) => {

    const [restaurants, dispatch] = useReducer(restaurantReducer, []);
    const navigate = useNavigate();

    useEffect(() => {
        restaurantService.getAllRestaurants()
            .then(result => {
                const action = {
                    type: 'LOAD_RESTAURANTS',
                    payload: result
                };
                dispatch(action)
            });

    }, []);

    const updateRestaurants = (restaurant) => {
        dispatch({
            type: 'UPDATE_RESTAURANTS',
            payload: restaurant
        });
        navigate('/restaurants');
    }

    const updateRestaurantDetails = (restaurantId, details) => {
        dispatch({
            type: 'UPDATE_RESTAURANT_DETAILS',
            payload: details,
            restaurantId
        });
    }

    return (
        <RestaurantContext.Provider value={{
            restaurants,
            updateRestaurants,
            updateRestaurantDetails
        }}>
            {children}
        </RestaurantContext.Provider>
    );
}
