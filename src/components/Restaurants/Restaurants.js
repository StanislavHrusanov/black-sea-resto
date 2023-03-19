import { useState, useEffect, useContext } from "react";
import styles from "./Restaurants.module.css";

import { RestaurantItem } from "./RestaurantItem/RestaurantItem";
import { getAllRestaurants } from "../../services/restaurantService";

import { LoadingContext } from "../../contexts/LoadingContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);


    useEffect(() => {
        showLoading();
        getAllRestaurants()
            .then(result => setRestaurants(result))
            .then(() => hideLoading())
            .catch(err => {
                window.alert(err.message);
                return window.location.reload();
            });
    }, [showLoading, hideLoading]);

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
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