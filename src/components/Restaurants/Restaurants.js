import { useState, useEffect } from "react";
import styles from "./Restaurants.module.css";

import { RestaurantItem } from "./RestaurantItem/RestaurantItem";
import { getAllRestaurants } from "../../services/restaurantService";

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        getAllRestaurants()
            .then(result => setRestaurants(result))
            .catch(err => window.alert(err.message));
    }, [])

    return (
        <section id="restaurants-section">
            <div className={styles["restaurants-message"]}>
                <h2>We will help you find your perfect restaurant!</h2>
            </div>
            <div className={styles["restaurants-container"]}>

                <div className={styles["restaurants"]}>
                    <h1>Restaurants</h1>

                    {restaurants.length > 0
                        ? restaurants.map(x => <RestaurantItem key={x._id} restaurant={x} />)
                        : <p className={styles["no-restaurants"]}>There is no restaurants yet!</p>
                    }

                </div>
            </div>
        </section>
    );
}