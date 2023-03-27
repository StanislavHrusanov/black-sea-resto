import { Link } from "react-router-dom";

import styles from "./MyReview.module.css";

export const MyReview = ({ review }) => {
    const rating = review.rating;
    const comment = review.comment !== '' ? review.comment : '(no comment)';

    return (
        <div className={styles["review"]}>
            <p className={styles["desc"]}>Left for:</p>
            <Link to={`/restaurants/${review.restaurantId}`}>
                <h3>{review.restaurantName}</h3>
            </Link>
            <p className={styles["desc"]}>Rating:</p>
            <div className={styles["star-rating-container"]}>
                <h2> <div className={styles["rating"]}>
                    {[...Array(5)].map((star, index) => {
                        index += 1;

                        return (
                            <span
                                key={index}
                                className={index <= rating ? styles["full"] : styles["empty"]}
                            >
                                ☆
                            </span>
                        )
                    })}

                </div>
                </h2>
            </div>

            <p className={styles["desc"]}>Comment:</p>
            <div className={styles["comment"]} >{comment}</div>
        </div>
    );
}