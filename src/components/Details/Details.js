import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "./Details.module.css";

import { AddReview } from "./AddReview/AddReview";
import { EditReview } from "./EditReview/EditReview";
import { Review } from "./Review/Review";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import { getAvgRating } from "../../utils";
import * as restaurantService from "../../services/restaurantService";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";

export const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const [restaurant, setRestaurant] = useState({});
    const { restaurantId } = useParams();
    const { user } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                showLoading();
                const currRestaurant = await restaurantService.getOne(restaurantId);
                setRestaurant(currRestaurant);
                hideLoading();

            } catch (error) {
                window.alert(error.message);
                return navigate('/restaurants');
            }
        })();
    }, [restaurantId, showLoading, hideLoading, navigate]);

    const isOwner = restaurant._ownerId === user?._id;

    const userReview = restaurant?.reviews?.find(x => x._ownerId === user?._id);

    const reviewBtnName = userReview ? 'Edit your review' : 'Add review';

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addReview = (review) => {
        setRestaurant(state => ({
            ...state,
            reviews: [...state.reviews, review]
        }));
    }

    const editReview = (review) => {
        setRestaurant(state => ({
            ...state,
            reviews: state.reviews.map(x => x._id === review._id ? review : x)
        }))
    }

    const deleteRestaurant = async (e) => {
        try {
            showLoading();

            const choice = window.confirm('Are you sure you want to delete this restaurant?');

            if (choice) {
                await restaurantService.del(restaurant._id);
                hideLoading();
                navigate('/restaurants');
            }
        } catch (error) {
            window.alert(error.message);
            return navigate(`/restaurants/${restaurant._id}`);
        }
    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <section className={styles["details-page"]}>
                {showModal && !userReview &&
                    <AddReview
                        onCloseModal={closeModal}
                        restaurant={restaurant}
                        addReview={addReview}
                    />
                }

                {showModal && userReview &&
                    <EditReview
                        onCloseModal={closeModal}
                        restaurant={restaurant}
                        editReview={editReview}
                        userReview={userReview}
                    />
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
                                            className={index <= Math.round(getAvgRating(restaurant.reviews)) ? styles["full"] : styles["empty"]}
                                        >
                                            ☆
                                        </span>
                                    )
                                })}
                                <span>{`${getAvgRating(restaurant.reviews)} (${restaurant.reviews?.length}) rewiews`}</span>

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
                                    <button onClick={deleteRestaurant} className={styles["delete-button"]}>Delete</button>
                                    <Link className={styles["favourite-button"]} >Favourite</Link>
                                </>
                            }
                        </div>

                        <div className={styles["reviews-container"]}>

                            {!user
                                ? <p className={styles["reviews-p"]}>Reviews</p>
                                : !isOwner
                                    ? <button onClick={() => openModal()} className={styles["add-review-btn"]}>{reviewBtnName}</button>
                                    : <p className={styles["reviews-p"]}>Reviews</p>
                            }

                            {restaurant.reviews?.length > 0
                                ? restaurant.reviews?.map(x => <Review key={x._id} review={x} />)
                                : <p className={styles["no-reviews"]}>No reviews yet!</p>
                            }

                        </div>

                    </div>

                    <div className={styles["item-details-image"]}>
                        <img src={restaurant.imageUrl} alt="resto" />
                    </div>
                </div>
            </section >
        );
}