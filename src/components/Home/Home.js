import { useState, useEffect } from "react";
import styles from "./Home.module.css";

// import { RestaurantContext } from "../../contexts/RestaurantContext";
import { Restaurant } from "./Restaurant/Restaurant";
import { getAvgRating } from "../../utils";
import { getAllRestaurants } from "../../services/restaurantService";

export const Home = () => {
    // const { restaurants } = useContext(RestaurantContext);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        getAllRestaurants()
            .then(result => setRestaurants(result))
            .catch(err => window.alert(err.message));
    }, []);

    const mostPopular = restaurants
        .slice()
        .sort((a, b) => b.reviews.length - a.reviews.length || getAvgRating(b.reviews) - getAvgRating(a.reviews))
        .slice(0, 3);

    return (
        <section id="home-section">
            <div className={styles["home-message"]}>
                <h2>We will help you find your perfect restaurant!</h2>
            </div>
            <div className={styles["home-container"]}>

                <div className={styles["top-three"]}>
                    <h1>Most Popular</h1>

                    {
                        mostPopular.length > 0
                            ? mostPopular.map(x => <Restaurant key={x._id} restaurant={x} />)
                            : <p className={styles["no-restaurants"]}>There is no restaurants yet!</p>
                    }

                </div>
            </div>
        </section>
    );
}