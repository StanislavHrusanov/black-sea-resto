import { createContext, useReducer, useEffect } from "react";

import * as restaurantService from "../services/restaurantService";

export const RestaurantContext = createContext();

const restaurantReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_RESTAURANTS':
            return [...action.payload];

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

    return (
        <RestaurantContext.Provider value={{
            restaurants
        }}>
            {children}
        </RestaurantContext.Provider>
    );
}
