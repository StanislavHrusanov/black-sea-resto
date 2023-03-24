import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./MyProfile.module.css";

import * as myProfileService from "../../services/myProfileService";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import * as utils from "../../utils";


export const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);

    const reviews = [1, 1, 1];
    return (
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
                                <div className={styles["restaurant"]}>
                                    <div className={styles["restaurant-image-wrap"]}>
                                        <img src="https://media-cdn.tripadvisor.com/media/photo-s/17/9d/20/e2/the-view-from-the-restaurant.jpg" alt="resto" />
                                    </div>
                                    <h3>Bijutoto dsadasdad</h3>
                                    <div className={styles["rating"]}>
                                        {[...Array(5)].map((star, index) => {
                                            index += 1;
                                            const rating = 4
                                            return (
                                                <span
                                                    key={index}
                                                    className={index <= Math.round(rating) ? styles["full"] : styles["empty"]}
                                                >
                                                    ☆
                                                </span>
                                            )
                                        })}
                                        <p className={styles['review-count']}>{`(${reviews.length}) rewiews`}</p>
                                    </div>
                                    <div className={styles["data-buttons"]}>
                                        <Link to={`/restaurants/123`}><button className={styles["details-btn"]}>Details</button></Link>
                                        <button className={styles["favourites-btn"]}>Remove from favourites</button>
                                    </div>
                                </div>

                                <div className={styles["restaurant"]}>
                                    <div className={styles["restaurant-image-wrap"]}>
                                        <img src="https://media-cdn.tripadvisor.com/media/photo-s/17/9d/20/e2/the-view-from-the-restaurant.jpg" alt="resto" />
                                    </div>
                                    <h3>Bijutoto</h3>
                                    <div className={styles["rating"]}>
                                        {[...Array(5)].map((star, index) => {
                                            index += 1;
                                            const rating = 3
                                            return (
                                                <span
                                                    key={index}
                                                    className={index <= Math.round(rating) ? styles["full"] : styles["empty"]}
                                                >
                                                    ☆
                                                </span>
                                            )
                                        })}
                                        <p className={styles['review-count']}>{`(${reviews.length}) rewiews`}</p>
                                    </div>
                                    <div className={styles["data-buttons"]}>
                                        <Link to={`/restaurants/123`}><button className={styles["details-btn"]}>Details</button></Link>
                                        <button className={styles["favourites-btn"]}>Remove from favourites</button>
                                    </div>
                                </div>

                                <div className={styles["restaurant"]}>
                                    <div className={styles["restaurant-image-wrap"]}>
                                        <img src="https://media-cdn.tripadvisor.com/media/photo-s/17/9d/20/e2/the-view-from-the-restaurant.jpg" alt="resto" />
                                    </div>
                                    <h3>Bijutoto dsadasdad dada</h3>
                                    <div className={styles["rating"]}>
                                        {[...Array(5)].map((star, index) => {
                                            index += 1;
                                            const rating = 3;
                                            return (
                                                <span
                                                    key={index}
                                                    className={index <= Math.round(rating) ? styles["full"] : styles["empty"]}
                                                >
                                                    ☆
                                                </span>
                                            )
                                        })}
                                        <p className={styles['review-count']}>{`(${reviews.length}) rewiews`}</p>
                                    </div>
                                    <div className={styles["data-buttons"]}>
                                        <Link to={`/restaurants/123`}><button className={styles["details-btn"]}>Details</button></Link>
                                        <button className={styles["favourites-btn"]}>Remove from favourites</button>
                                    </div>
                                </div>

                                <div className={styles["restaurant"]}>
                                    <div className={styles["restaurant-image-wrap"]}>
                                        <img src="https://media-cdn.tripadvisor.com/media/photo-s/17/9d/20/e2/the-view-from-the-restaurant.jpg" alt="resto" />
                                    </div>
                                    <h3>Bij</h3>
                                    <div className={styles["rating"]}>
                                        {[...Array(5)].map((star, index) => {
                                            index += 1;
                                            const rating = 3;

                                            return (
                                                <span
                                                    key={index}
                                                    className={index <= Math.round(rating) ? styles["full"] : styles["empty"]}
                                                >
                                                    ☆
                                                </span>
                                            )
                                        })}
                                        <p className={styles['review-count']}>{`(${reviews.length}) rewiews`}</p>
                                    </div>
                                    <div className={styles["data-buttons"]}>
                                        <Link to={`/restaurants/123`}><button className={styles["details-btn"]}>Details</button></Link>
                                        <button className={styles["favourites-btn"]}>Remove from favourites</button>
                                    </div>
                                </div>


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