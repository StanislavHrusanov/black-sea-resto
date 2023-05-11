import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "./Details.module.css";

import { AddReview } from "./AddReview/AddReview";
import { EditReview } from "./EditReview/EditReview";
import { Review } from "./Review/Review";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import { getAvgRating } from "../../utils";
import * as restaurantService from "../../services/restaurantService";
import * as favouritesService from "../../services/favouritesService";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";

export const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const [restaurant, setRestaurant] = useState({});
    const [isAddedToFavourites, setIsAddedToFavourites] = useState([]);
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
                const favourites = await favouritesService.getFavourites(restaurantId);
                setIsAddedToFavourites(favourites);
                hideLoading();

            } catch (error) {
                window.alert(error.message);
                hideLoading();
                return navigate('/restaurants');
            }
        })();
    }, [restaurantId, showLoading, hideLoading, navigate]);

    const isOwner = restaurant._ownerId === user?._id;

    const userReview = restaurant.reviews?.find(x => x._ownerId === user?._id);

    const reviewBtnName = userReview ? 'Edit your review' : 'Add review';

    const isUserAddedToFavourites = isAddedToFavourites.find(x => x._ownerId === user?._id);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addReviewToState = (review) => {
        setRestaurant(state => ({
            ...state,
            reviews: [...state.reviews, review]
        }));
    }

    const editReviewInState = (review) => {
        setRestaurant(state => ({
            ...state,
            reviews: state.reviews.map(x => x._id === review._id ? review : x)
        }));
    }

    const deleteReviewFromState = (review) => {
        setRestaurant(state => ({
            ...state,
            reviews: state.reviews.filter(x => x._id !== review._id)
        }));
    }

    const deleteRestaurant = async (e) => {
        try {

            const choice = window.confirm('Are you sure you want to delete this restaurant?');

            if (choice) {
                showLoading();
                await restaurantService.del(restaurant._id);
                hideLoading();
                navigate('/restaurants');
            }
        } catch (error) {
            window.alert(error.message);
            hideLoading();
            return navigate(`/restaurants/${restaurant._id}`);
        }
    }

    const onAddToFavoutites = async () => {
        const data = {
            restaurantId: restaurant._id,
            restaurantName: restaurant.name,
            imageUrl: restaurant.imageUrl
        }
        try {

            const addedRestaurant = await favouritesService.addToFavourites(data);
            setIsAddedToFavourites(state => [...state, addedRestaurant]);

        } catch (error) {
            window.alert(error.message);
            return navigate(`/restaurants/${restaurant._id}`);
        }
    }

    const onRemoveFromFavourites = async () => {
        try {
            const restaurantToRemove = Object.assign({}, isUserAddedToFavourites);
            await favouritesService.removeFromFavourites(restaurantToRemove._id);
            setIsAddedToFavourites(state => state.filter(x => x._id !== restaurantToRemove._id));
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
                        addReviewToState={addReviewToState}
                    />
                }

                {showModal && userReview &&
                    <EditReview
                        onCloseModal={closeModal}
                        restaurant={restaurant}
                        userReview={userReview}
                        editReviewInState={editReviewInState}
                        deleteReviewFromState={deleteReviewFromState}
                    />
                }

                <div className={styles["item-details"]}>

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
                            <span>{`${getAvgRating(restaurant.reviews)} (${restaurant.reviews?.length}) reviews`}</span>

                        </div></h3>
                    }
                    <img src={restaurant.imageUrl} alt="resto" />
                    <div className={styles["item-desc"]}>
                        <h3>Address: <p>{restaurant.address}</p></h3>
                        <h3>Phone: <p>{restaurant.phone}</p></h3>
                        <h3>Capacity: <p>{restaurant.capacity} persons</p></h3>
                        <h3>Summary: <p>{restaurant.summary}</p></h3>
                    </div>
                    {user &&
                        <div className={styles["buttons"]}>
                            {isOwner
                                ?
                                <>
                                    <Link to={`/restaurants/${restaurant._id}/edit`} ><button className={styles["edit-button"]}>Edit</button></Link>
                                    <button onClick={deleteRestaurant} className={styles["delete-button"]}>Delete</button>
                                </>
                                : isUserAddedToFavourites
                                    ?
                                    <button
                                        className={styles["favourite-remove-button"]}
                                        onClick={onRemoveFromFavourites}
                                    >Remove from Favourites</button>
                                    :
                                    <button
                                        className={styles["favourite-add-button"]}
                                        onClick={onAddToFavoutites}
                                    >Add to Favourites</button>
                            }
                        </div>
                    }

                    <div className={styles["reviews-container"]}>

                        {!user
                            ? <p className={styles["reviews-p"]}>Reviews</p>
                            : !isOwner
                                ? <button onClick={() => openModal()} className={styles["add-review-btn"]}>{reviewBtnName}</button>
                                : <p className={styles["reviews-p"]}>Reviews</p>
                        }

                        {restaurant.reviews?.length > 0
                            ? restaurant.reviews
                                .sort((a, b) => b._createdOn - a._createdOn)
                                .map(x => <Review key={x._id} review={x} />)
                            : <p className={styles["no-reviews"]}>No reviews yet!</p>
                        }

                    </div>

                </div>
            </section >
        );
}