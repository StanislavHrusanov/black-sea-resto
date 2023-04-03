import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyProfile.module.css";

import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import { UserActionsContext } from "../../contexts/UserActionsContext";
import * as utils from "../../utils";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import * as favouritesService from "../../services/favouritesService";
import * as reviewService from "../../services/reviewService";
import * as restaurantService from "../../services/restaurantService";

import { Favourite } from "./Favourite/Favourite";
import { MyReview } from "./MyReview/MyReview";
import { MyRestaurant } from "./MyRestaurants/MyRestaurant";

export const MyProfile = () => {
    const [myFavourites, setMyFavourites] = useState([]);
    const [myReviews, setMyReviews] = useState([]);
    const [myRestaurants, setMyRestaurants] = useState([]);
    const { user } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const { deleteUserActions } = useContext(UserActionsContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                showLoading();
                const favourites = await favouritesService.getUserFavourites(user._id);
                setMyFavourites(favourites);
                const myRev = await reviewService.getMyReviews(user._id);
                setMyReviews(myRev);
                const myRts = await restaurantService.getMyRestaurants(user._id);
                setMyRestaurants(myRts);
                hideLoading();
            } catch (error) {
                hideLoading();
                window.alert(error.message);
                return navigate('/');
            }
            deleteUserActions();
        })();
    }, [showLoading, hideLoading, user._id, navigate, deleteUserActions]);

    const removeFromMyFavouritesState = (favourite) => {
        setMyFavourites(state => state.filter(x => x._id !== favourite._id));
    }

    const removeFromMyRestaurantsState = (restaurant) => {
        setMyRestaurants(state => state.filter(x => x._id !== restaurant._id));
    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <section id="profile-section">
                <div className={styles["container-box"]}>
                    <div className={styles["profile-message"]}>
                        <h2>User Info</h2>
                        <div className={styles["user-details"]}>
                            <div className={styles["image-wrap"]}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCWz2PNQ8o4EKjY6lY6JcT7sLIWeiS3Hc0_Vsm2Ot820vgbCO_GWVAB4Z_XDsWiyWDuf0&usqp=CAU" alt="user" />
                            </div>
                            <h3>Full name: {user.fullname}</h3>
                            <h3>Username: {user.username}</h3>
                            <h3>Created on: {utils.profileCreatedOnDateConverter(user._createdOn)}</h3>
                        </div>

                    </div>
                    <div className={styles["box"]}>

                        <div className={styles["my-rt-box"]}>
                            <h1>My restaurants</h1>
                            <div className={styles["my-rt-container"]}>
                                <div className={styles["rt"]}>
                                    {myRestaurants.length === 0
                                        ? <p className={styles["no-rt"]}>There is no restaurants in My restaurants yet!</p>
                                        : myRestaurants
                                            .slice()
                                            .sort((a, b) => b._createdOn - a._createdOn)
                                            .map(x =>
                                                <MyRestaurant
                                                    key={x._id}
                                                    restaurant={x}
                                                    removeFromMyRestaurantsState={removeFromMyRestaurantsState}
                                                />)
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={styles["fav-box"]}>
                            <h1>My favourites</h1>
                            <div className={styles["favourites-container"]}>
                                <div className={styles["favourites"]}>
                                    {myFavourites.length === 0
                                        ? <p className={styles["no-favourites"]}>There is no restaurants in My favourites yet!</p>
                                        : myFavourites
                                            .slice()
                                            .sort((a, b) => b._createdOn - a._createdOn)
                                            .map(x =>
                                                <Favourite
                                                    key={x._id}
                                                    favourite={x}
                                                    removeFromMyFavouritesState={removeFromMyFavouritesState}
                                                />)
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={styles["rev-box"]}>
                            <h1>My reviews</h1>
                            <div className={styles["my-reviews-container"]}>
                                <div className={styles["reviews"]}>
                                    {myReviews.length === 0
                                        ? <p className={styles["no-reviews"]}>There is no reviews in My reviews yet!</p>
                                        : myReviews
                                            .slice()
                                            .sort((a, b) => b._createdOn - a._createdOn)
                                            .map(x => <MyReview key={x._id} review={x} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
}