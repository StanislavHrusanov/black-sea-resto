import { useState, useEffect, useContext } from "react";
import styles from "./MyProfile.module.css";

import * as myProfileService from "../../services/myProfileService";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import * as utils from "../../utils";


export const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    return (
        <section id="profile-section">
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
            <div className={styles["favourites-container"]}>
                <div className={styles["favourites"]}>
                    <h1>Favourites</h1>
                </div>

            </div>
        </section>
    );
}