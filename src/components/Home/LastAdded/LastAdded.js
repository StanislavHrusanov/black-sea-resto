import { Link } from "react-router-dom";
import styles from "./LastAdded.module.css";

import { getAvgRating } from "../../../utils";

export const LastAdded = ({ restaurant }) => {

    return (
        <div className={styles["restaurant"]}>
            <div className={styles["restaurant-image-wrap"]}>
                <img src={restaurant.imageUrl} alt="resto" />
            </div>
            <h3>{restaurant.name}</h3>
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
                <p className={styles['review-count']}>{`(${restaurant.reviews?.length}) reviews`}</p>
            </div>
            <div className={styles["data-buttons"]}>
                <Link to={`/restaurants/${restaurant._id}`}>
                    <button className={styles["details-btn"]}>Details</button>
                </Link>
            </div>
        </div>
    );
}