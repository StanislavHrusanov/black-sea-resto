import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditReview.module.css";

import { LoadingContext } from "../../../contexts/LoadingContext";
import { UserProfileContext } from "../../../contexts/UserProfileContext";

import * as utils from "../../../utils";
import * as reviewService from "../../../services/reviewService";
import * as restaurantService from "../../../services/restaurantService";

export const EditReview = ({
    onCloseModal,
    restaurant,
    editReview,
    userReview
}) => {
    const [rating, setRating] = useState(userReview.rating);
    const [hover, setHover] = useState(userReview.rating);
    const [starName, setStarName] = useState(userReview.rating);
    const [comment, setComment] = useState(userReview.comment);

    // const { editReviewInProfile } = useContext(UserProfileContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    const onChangeHandler = (e) => setComment(e.target.value);

    const ratingAsWords = utils.ratingAsWords;

    const onSubmit = async (e) => {
        e.preventDefault();

        const reviewToEditData = {
            restaurantId: restaurant._id,
            author: userReview.author,
            rating,
            comment
        }

        try {
            showLoading();
            const editedReview = await reviewService.editReview(userReview._id, reviewToEditData);
            const currentRestaurant = await restaurantService.getOne(restaurant._id);

            currentRestaurant.reviews = currentRestaurant.reviews.map(x => x._id === editedReview._id ? editedReview : x);

            await restaurantService.edit(restaurant._id, currentRestaurant);
            editReview(editedReview);
            // editReviewInProfile(userReview, editedReview);
            onCloseModal();
            // window.location.reload();
            hideLoading();
        } catch (error) {
            hideLoading();
            window.alert(error.message);
            return navigate(`/restaurants/${restaurant._id}`);
        }
    }

    return (
        <div className={styles["modal-container"]}>
            <div onClick={() => onCloseModal()} className={styles["backdrop"]}></div>
            <div className={styles["modal"]}>
                <div className={styles["review-container"]}>
                    <header className={styles["header"]}>
                        <h2>Edit your review</h2>
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
                            <button id="action-delete" className={styles["btn-delete"]}>Delete</button>
                            <button id="action-edit" className={styles["btn-edit"]} type="submit">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}