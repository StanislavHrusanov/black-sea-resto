import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./MyProfile.module.css";

import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import * as utils from "../../utils";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import * as favouritesService from "../../services/favouritesService";

export const MyProfile = () => {
    const [myFavourites, setMyFavourites] = useState([]);
    const { user } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);

    useEffect(() => {
        (async () => {
            try {
                showLoading();
                const favourites = await favouritesService.getUserFavourites(user._id);
                setMyFavourites(favourites);
                hideLoading();
            } catch (error) {
                hideLoading();
                window.alert(error.message);
                window.location.reload();
            }
        })();
    }, [showLoading, hideLoading, user._id])

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
                        <div className={styles["fav-box"]}>
                            <h1>Favourites</h1>
                            <div className={styles["favourites-container"]}>
                                <div className={styles["favourites"]}>
                                    {myFavourites.length === 0
                                        ? <p className={styles["no-favourites"]}>There is no restaurants in favourites yet!</p>
                                        : myFavourites.map(x => <div key={x._id} className={styles["restaurant"]}>
                                            <div className={styles["restaurant-image-wrap"]}>
                                                <img src={x.imageUrl} alt="resto" />
                                            </div>
                                            <h3>{x.restaurantName}</h3>
                                            <div className={styles["data-buttons"]}>
                                                <Link to={`/restaurants/${x.restaurantId}`}><button className={styles["details-btn"]}>Details</button></Link>
                                                <button className={styles["favourites-btn"]}>Remove from favourites</button>
                                            </div>
                                        </div>)
                                    }

                                </div>

                            </div>
                        </div>


                        <div className={styles["rev-box"]}>
                            <h1>My reviews</h1>
                            <div className={styles["my-reviews-container"]}>
                                <div className={styles["reviews"]}>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
}