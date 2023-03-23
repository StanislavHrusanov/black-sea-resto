import { useState, useEffect, useContext } from "react";
import styles from "./Restaurants.module.css";

import { RestaurantItem } from "./RestaurantItem/RestaurantItem";
import { Search } from "./Search/Search";
import { getAllRestaurants } from "../../services/restaurantService";

import { LoadingContext } from "../../contexts/LoadingContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import * as utils from "../../utils";

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [search, setSearch] = useState('');
    const [sortCriteria, setSortCriteria] = useState('date');

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

    const sortedRestaurants = utils.sortRestaurantsByCriteria(restaurants, sortCriteria);
    const sortedFilteedRestaurants = utils.sortRestaurantsByCriteria(filteredRestaurants, sortCriteria);

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
                    <div className={styles["sort-container"]}>
                        <div className={styles["sort-div"]}>
                            <span>Sort by</span>
                            <select
                                name="criteria"
                                className={styles["criteria"]}
                                selected={sortCriteria}
                                onChange={(e) => setSortCriteria(e.target.value)}
                            >
                                <option value="newest">Newest</option>
                                <option value="a-z">A-Z</option>
                                <option value="reviews">Reviews</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles["restaurants"]}>
                        <h1>Restaurants</h1>

                        {restaurants.length === 0
                            ? <p className={styles["no-restaurants"]}>There is no restaurants yet!</p>
                            : search === ''
                                ? sortedRestaurants.map(x => <RestaurantItem key={x._id} restaurant={x} />)
                                : sortedFilteedRestaurants.length === 0
                                    ? <p className={styles["no-restaurants"]}>0 restaurants found!</p>
                                    : sortedFilteedRestaurants.map(x => <RestaurantItem key={x._id} restaurant={x} />)
                        }

                    </div>
                </div>
            </section>
        );
}