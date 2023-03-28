import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

import { Restaurant } from "./Restaurant/Restaurant";
import { getAvgRating } from "../../utils";
import { getAllRestaurants } from "../../services/restaurantService";

import { LoadingContext } from "../../contexts/LoadingContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { LastAdded } from "./LastAdded/LastAdded";

export const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    useEffect(() => {
        showLoading();
        getAllRestaurants()
            .then(result => setRestaurants(result))
            .then(() => hideLoading())
            .catch(err => {
                window.alert(err.message);
                hideLoading();
                return navigate('/');
            });
    }, [showLoading, hideLoading, navigate]);

    const mostPopular = restaurants
        .slice()
        .sort((a, b) => b.reviews.length - a.reviews.length || getAvgRating(b.reviews) - getAvgRating(a.reviews))
        .slice(0, 3);

    const lastAdded = restaurants.slice(0, 1);

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <section id="home-section">
                <div className={styles["home-message"]}>
                    <h2>We will help you find your perfect restaurant!</h2>
                </div>
                <div className={styles["most-popular-container"]}>

                    <div className={styles["most-popular"]}>
                        <h1>Most Popular</h1>

                        {
                            mostPopular.length > 0
                                ? mostPopular.map(x => <Restaurant key={x._id} restaurant={x} />)
                                : <p className={styles["no-restaurants"]}>There is no restaurants yet!</p>
                        }

                    </div>
                </div>

                <div className={styles["last-added-container"]}>

                    <div className={styles["last-added"]}>
                        <h1>Last added</h1>

                        {
                            lastAdded.length > 0
                                ? <LastAdded key={lastAdded[0]._id} restaurant={lastAdded[0]} />
                                : <p className={styles["no-restaurants"]}>There is no restaurants added yet!</p>
                        }

                    </div>
                </div>
            </section>
        );
}