import { useState } from "react";
import styles from "./AddReview.module.css";

import * as utils from "../../../utils";

export const AddReview = ({ onCloseModal }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [starName, setStarName] = useState('');

    const ratingAsWords = utils.ratingAsWords;

    return (
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
                    <form >
                        <div className={styles["form-column"]}>
                            <div className={styles["form-input"]}>
                                <label>Add rating:</label>
                                <div className={styles["input-wrapper"]}>
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={index <= (hover || rating) ? styles["full"] : styles["empty"]}
                                                onClick={() => {
                                                    setRating(index);
                                                    setStarName(ratingAsWords.get(index));
                                                }}
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