import { useState, useEffect, useContext } from "react";
import styles from "./Restaurants.module.css";

import { RestaurantItem } from "./RestaurantItem/RestaurantItem";
import { Search } from "./Search/Search";
import { getAllRestaurants } from "../../services/restaurantService";

import { LoadingContext } from "../../contexts/LoadingContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        showLoading();
        getAllRestaurants()
            .then(result => setRestaurants(result))
            .then(() => hideLoading())
            .catch(err => {
                window.alert(err.message);
                hideLoading();
                return window.location.reload();
            });
    }, [showLoading, hideLoading]);

    const onSearch = (searched) => {
        setSearch(searched);
        setFilteredRestaurants(restaurants.filter(x => x.name.toLowerCase().includes(searched.toLowerCase())));
    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <section id="restaurants-section">
                <div className={styles["restaurants-message"]}>
                    <h2>We will help you find your perfect restaurant!</h2>

                    <Search onSearch={onSearch} />

                </div>
                <div className={styles["restaurants-container"]}>

                    <div className={styles["restaurants"]}>
                        <h1>Restaurants</h1>

                        {restaurants.length === 0
                            ? <p className={styles["no-restaurants"]}>There is no restaurants yet!</p>
                            : search === ''
                                ? restaurants.map(x => <RestaurantItem key={x._id} restaurant={x} />)
                                : filteredRestaurants.length === 0
                                    ? <p className={styles["no-restaurants"]}>0 restaurants found!</p>
                                    : filteredRestaurants.map(x => <RestaurantItem key={x._id} restaurant={x} />)
                        }

                    </div>
                </div>
            </section>
        );
}