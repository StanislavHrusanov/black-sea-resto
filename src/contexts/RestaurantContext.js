import { createContext, useReducer, useEffect } from "react";

import * as restaurantService from "../services/restaurantService";

export const RestaurantContext = createContext();

const restaurantReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_RESTAURANTS':
            return [...action.payload];
        case 'ADD_RESTAURANT':
            return [...state, action.payload];

        default:
            return state;
    }
}


export const RestaurantProvider = ({ children }) => {

    const [restaurants, dispatch] = useReducer(restaurantReducer, []);

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

    const addRestaurantToState = (restaurant) => {
        dispatch({
            type: 'ADD_RESTAURANT',
            payload: restaurant
        });
    }

    return (
        <RestaurantContext.Provider value={{
            restaurants,
            addRestaurantToState
        }}>
            {children}
        </RestaurantContext.Provider>
    );
}
