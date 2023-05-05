import { Link } from "react-router-dom";
import styles from "./LastReview.module.css";

export const LastReview = ({ review }) => {
    const rating = review.rating;
    const comment = review.comment !== '' ? review.comment : '(no comment)';

    return (
        <div className={styles["review"]}>
            <div className={styles["desc"]}>
                <p>Left for:</p>
                <Link to={`/restaurants/${review.restaurantId}`}>
                    <h3>{review.restaurantName}</h3>
                </Link>
            </div>
            <div className={styles["desc"]}>
                <p>By:</p>
                <h3>{review.author}</h3>
            </div>
            <div className={styles["desc"]}>
                <p>Rating:</p>
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
            </div>

            <div className={styles["desc"]}>
                <p>Comment:</p>
                <p className={styles["comment"]} >{comment}</p>
            </div>
        </div>
    );
}