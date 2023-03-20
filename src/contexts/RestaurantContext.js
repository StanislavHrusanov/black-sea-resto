// import { createContext, useReducer, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import * as restaurantService from "../services/restaurantService";

// export const RestaurantContext = createContext();

// export const RestaurantProvider = ({ children }) => {
//     const [contextRestaurants, setContextRestaurants] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         restaurantService.getAllRestaurants()
//             .then(result => setContextRestaurants(result));

//     }, []);

//     const updateRestaurantContext = (data) => {
//         setContextRestaurants(data);
//     }

//     const selectedRestaurant = (restaurantId) => {
//         return contextRestaurants.find(x => x._id === restaurantId);
//     }
//     return (
//         <RestaurantContext.Provider value={{
//             contextRestaurants,
//             updateRestaurantContext,
//             selectedRestaurant
//         }}>
//             {children}
//         </RestaurantContext.Provider>
//     );
// }
