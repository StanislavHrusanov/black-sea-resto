import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddReview.module.css";

import * as utils from "../../../utils";
import { AuthContext } from "../../../contexts/AuthContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import * as restaurantService from "../../../services/restaurantService";
import * as reviewService from "../../../services/reviewService";
import { LoadingSpinner } from "../../LoadingSpinner/LoadingSpinner";

export const AddReview = ({
    onCloseModal,
    restaurant,
    addReview
}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [starName, setStarName] = useState('');
    const [comment, setComment] = useState('');

    const { user } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    const onChangeHandler = (e) => setComment(e.target.value);

    const ratingAsWords = utils.ratingAsWords;

    const onSubmit = async (e) => {
        e.preventDefault();

        const review = {
            restaurantId: restaurant._id,
            author: user.username,
            rating,
            comment
        };

        try {
            showLoading();
            const addedReview = await reviewService.addReview(review);
            const currentRestaurant = await restaurantService.getOne(restaurant._id);
            currentRestaurant.reviews.push(addedReview);
            await restaurantService.edit(restaurant._id, currentRestaurant);
            addReview(addedReview);
            onCloseModal();
            // window.location.reload();
            hideLoading();
        } catch (error) {
            hideLoading();
            window.alert(error.message);
            return navigate(`/restaurants/${restaurant._id}`);
        }
    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <div className={styles["modal-container"]}>
                <div onClick={() => onCloseModal()} className={styles["backdrop"]}></div>
                <div className={styles["modal"]}>
                    <div className={styles["review-container"]}>
                        <header className={styles["header"]}>
                            <h2>Add review</h2>
                            <button onClick={() => onCloseModal()} className={styles["btn-close"]}>
                                <i className="fa-regular fa-rectangle-xmark"></i>
                            </button>
                        </header>
                        <form onSubmit={onSubmit}>
                            <div className={styles["form-column"]}>
                                <div className={styles["form-input"]}>
                                    <label>Add rating:</label>
                                    <div className={styles["input-wrapper"]}>
                                        {[...Array(5)].map((star, index) => {
                                            index += 1;
                                            return (
                                                <button
                                                    type="button"
                                                    name="rating"
                                                    key={index}
                                                    className={index <= (hover || rating) ? styles["full"] : styles["empty"]}
                                                    onClick={() => {
                                                        setRating(index);
                                                        setStarName(ratingAsWords.get(index));
                                                    }}
                                                    value={rating}
                                                    onMouseEnter={() => {
                                                        setHover(index);
                                                        setStarName(ratingAsWords.get(index));
                                                    }}
                                                    onMouseLeave={() => {
                                                        setHover(0);
                                                        setStarName(ratingAsWords.get(rating));
                                                    }}
                                                >
                                                    <span className={styles["star"]}>&#9733;</span>
                                                </button>
                                            );
                                        })}
                                        <span className={styles["star-name"]}>{starName}</span>
                                    </div>

                                </div>
                                <div className={styles["form-input"]}>
                                    <label htmlFor="add-comment">Add comment:</label>
                                    <div className={styles["input-wrapper"]}>
                                        <textarea
                                            name="comment"
                                            type="text"
                                            id="add-comment"
                                            value={comment}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className={styles["form-actions"]}>
                                <button id="action-add" className={styles["btn-add"]} type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
}