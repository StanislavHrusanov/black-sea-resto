import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MyRestaurant.module.css";

import { getAvgRating } from "../../../utils";
import * as restaurantService from "../../../services/restaurantService";
import { LoadingContext } from "../../../contexts/LoadingContext";

export const MyRestaurant = ({
    restaurant,
    removeFromMyRestaurantsState
}) => {
    const { showLoading, hideLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    const onDeleteMyRestaurant = async () => {
        try {
            const restaurantToDelete = Object.assign({}, restaurant);
            const choice = window.confirm('Are you sure you want to delete this restaurant?');

            if (choice) {
                showLoading();
                await restaurantService.del(restaurantToDelete._id);
                removeFromMyRestaurantsState(restaurantToDelete);
                hideLoading();
                navigate('/myProfile');
            }
        } catch (error) {
            window.alert(error.message);
            hideLoading();
            return navigate(`/myProfile`);
        }
    }

    return (
        <div className={styles["restaurant"]}>
                <img src={restaurant.imageUrl} alt="resto" />
            <Link to={`/restaurants/${restaurant._id}`}>
                <h3>{restaurant.name}</h3>
            </Link>
            <div className={styles["rating"]}>
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    const rating = getAvgRating(restaurant.reviews);
                    return (
                        <span
                            key={index}
                            className={index <= Math.round(rating) ? styles["full"] : styles["empty"]}
                        >
                            ☆
                        </span>
                    )
                })}
                <p className={styles['review-count']}>{`(${restaurant.reviews.length}) reviews`}</p>
            </div>
            <div className={styles["data-buttons"]}>
                <Link to={`/restaurants/${restaurant._id}/edit`}>
                    <button className={styles["edit-btn"]}>Edit</button>
                </Link>
                <button
                    className={styles["delete-btn"]}
                    onClick={onDeleteMyRestaurant}
                >Delete</button>
            </div>
        </div>
    );
}