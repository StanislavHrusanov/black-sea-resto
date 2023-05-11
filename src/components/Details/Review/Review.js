import styles from "./Review.module.css";
import { commentDateConverter } from "../../../utils";

export const Review = ({ review }) => {
    const rating = review.rating;
    const comment = review.comment;

    return (
        <div className={styles["review-container"]}>
            <div className={styles["review-author-date"]}>
                <p className={styles["author"]}>{review.author}</p>
                <p className={styles["posted"]}>
                    {review._updatedOn
                        ? `edited at: ${commentDateConverter(review._updatedOn)}`
                        : `posted at: ${commentDateConverter(review._createdOn)}`}
                </p>
            </div>

            <h3><div className={styles["rating"]}>
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
            </h3>

            <div className={styles["comment"]} >{comment}</div>

        </div>
    );
}