import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyProfile.module.css";

import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import * as utils from "../../utils";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import * as favouritesService from "../../services/favouritesService";
import { Favourite } from "./Favourite/Favourite";

export const MyProfile = () => {
    const [myFavourites, setMyFavourites] = useState([]);
    const { user } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

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
                return navigate('/');
            }
        })();
    }, [showLoading, hideLoading, user._id, navigate]);

    const removeFromMyFavouritesState = (favourite) => {
        setMyFavourites(state => state.filter(x => x._id !== favourite._id));
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
                        <div className={styles["fav-box"]}>
                            <h1>Favourites</h1>
                            <div className={styles["favourites-container"]}>
                                <div className={styles["favourites"]}>
                                    {myFavourites.length === 0
                                        ? <p className={styles["no-favourites"]}>There is no restaurants in favourites yet!</p>
                                        : myFavourites.map(x =>
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
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
}