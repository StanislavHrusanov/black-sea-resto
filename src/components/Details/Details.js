import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "./Details.module.css";

import { AddReview } from "./AddReview/AddReview";
import { Review } from "./Review/Review";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import { getAvgRating } from "../../utils";
import * as restaurantService from "../../services/restaurantService";
import * as reviewService from "../../services/reviewService";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";

export const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const [restaurant, setRestaurant] = useState({});
    const [reviews, setReviews] = useState([]);
    const { restaurantId } = useParams();
    const { user } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);

    useEffect(() => {
        showLoading()
        restaurantService.getOne(restaurantId)
            .then(result => setRestaurant(result))
        reviewService.getById(restaurantId)
            .then(result => setReviews(result))
            .then(() => hideLoading())
            .catch(err => window.alert(err.message));
    }, [restaurantId, showLoading, hideLoading]);

    const isOwner = restaurant._ownerId === user?._id;

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <section className={styles["details-page"]}>
                {showModal &&
                    <AddReview onCloseModal={closeModal} />
                }

                <div className={styles["item-details"]}>

                    <div className={styles["item-description"]}>
                        <h2> {restaurant.name}</h2>
                        {
                            <h3><div className={styles["rating"]}>
                                {[...Array(5)].map((star, index) => {
                                    index += 1;

                                    return (
                                        <span
                                            key={index}
                                            className={index <= Math.round(getAvgRating(reviews)) ? styles["full"] : styles["empty"]}
                                        >
                                            ☆
                                        </span>
                                    )
                                })}
                                <span>{`${getAvgRating(reviews)} (${reviews.length}) rewiews`}</span>

                            </div></h3>
                        }
                        <h3>Address: {restaurant.address}</h3>
                        <h3>Phone: {restaurant.phone}</h3>
                        <h3>Capacity: {restaurant.capacity}</h3>
                        <h3>Summary: {restaurant.summary}</h3>
                        <div className={styles["buttons"]}>
                            {isOwner &&
                                <>
                                    <Link to={`/restaurants/${restaurant._id}/edit`} className={styles["edit-button"]}>Edit</Link>
                                    <Link to={`/restaurants/${restaurant._id}/edit`} className={styles["delete-button"]}>Delete</Link>
                                    <Link className={styles["favourite-button"]} >Favourite</Link>
                                </>
                            }
                        </div>

                        <div className={styles["reviews-container"]}>
                            {isOwner &&
                                <button onClick={() => openModal()} className={styles["add-review-btn"]}>Add review</button>
                            }
                            {reviews.length > 0
                                ? reviews.map(x => <Review key={x._id} review={x} />)
                                : <p className={styles["no-reviews"]}>No reviews yet!</p>
                            }


                        </div>

                    </div>

                    <div className={styles["item-details-image"]}>
                        <img src={restaurant.imageUrl} alt="resto" />
                    </div>
                </div>
            </section>
        );
}