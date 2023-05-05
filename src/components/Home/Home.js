import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

import { getAvgRating } from "../../utils";
import * as restaurantService from "../../services/restaurantService";
import * as reviewService from "../../services/reviewService";

import { UserActionsContext } from "../../contexts/UserActionsContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { Restaurant } from "./Restaurant/Restaurant";
import { LastAdded } from "./LastAdded/LastAdded";
import { LastReview } from "./LastReview/LastReview";

export const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [lastReview, setLastReview] = useState([]);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const { deleteUserActions } = useContext(UserActionsContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                showLoading();
                const allRestaurants = await restaurantService.getAllRestaurants();
                setRestaurants(allRestaurants);
                const lastRev = await reviewService.getLastReview();
                setLastReview(lastRev);
                hideLoading();

            } catch (error) {
                window.alert(error.message);
                hideLoading();
                return navigate('/');
            }
            deleteUserActions()
        })();
    }, [showLoading, hideLoading, navigate, deleteUserActions]);

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
                        <h3>Most Popular</h3>

                        {
                            mostPopular.length > 0
                                ? mostPopular.map(x => <Restaurant key={x._id} restaurant={x} />)
                                : <p className={styles["no-restaurants"]}>There is no restaurants yet!</p>
                        }

                    </div>
                </div>

                <div className={styles["last-added-container"]}>

                    <div className={styles["last-added"]}>
                        <h3>Last added</h3>

                        {
                            lastAdded.length > 0
                                ? <LastAdded key={lastAdded[0]._id} restaurant={lastAdded[0]} />
                                : <p className={styles["no-restaurants"]}>There is no restaurants added yet!</p>
                        }

                    </div>
                </div>

                <div className={styles["last-review-container"]}>

                    <div className={styles["last-review"]}>
                        <h3>Last review</h3>

                        {
                            lastReview.length > 0
                                ? <LastReview key={lastReview[0]._id} review={lastReview[0]} />
                                : <p className={styles["no-restaurants"]}>There is no reviews added yet!</p>
                        }

                    </div>
                </div>
            </section>
        );
}