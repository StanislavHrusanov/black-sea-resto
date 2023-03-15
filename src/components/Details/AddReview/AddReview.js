import "./AddReview.css";
import { useState } from "react";

export const AddReview = ({ onCloseModal }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="modal-container">
            <div onClick={() => onCloseModal()} className="backdrop"></div>
            <div className="modal">
                <div className="review-container">
                    <header className="header">
                        <h2>Add review</h2>
                        <button onClick={() => onCloseModal()} className="btn close">
                            <i className="fa-regular fa-rectangle-xmark"></i>
                        </button>
                    </header>
                    <form >
                        <div className="form-column">
                            <div className="form-input">
                                <label>Add rating:</label>
                                <div className="input-wrapper">
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={index <= (hover || rating) ? "full" : "empty"}
                                                onClick={() => setRating(index)}
                                                onMouseEnter={() => setHover(index)}
                                                onMouseLeave={() => setHover(0)}
                                            >
                                                <span className="star">&#9733;</span>
                                            </button>
                                        );
                                    })}
                                </div>

                            </div>
                            <div className="form-input">
                                <label htmlFor="add-comment">Add comment:</label>
                                <div className="input-wrapper">
                                    <textarea
                                        name="comment"
                                        type="text"
                                        id="add-comment"
                                    />
                                </div>

                            </div>
                        </div>

                        <div id="form-actions">
                            <button id="action-add" className="btn" type="submit">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}