import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Details.module.css";

import { AddReview } from "./AddReview/AddReview";
export const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const rating = 2;

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false);
    }
    return (
        <section className={styles["details-page"]}>
            {showModal &&
                <AddReview onCloseModal={closeModal} />
            }
            {/* <div className={styles["details-message"]}>
                <h2>We will help you find your perfect restaurant!</h2>
            </div> */}

            <div className={styles["item-details"]}>

                <div className={styles["item-description"]}>
                    <h2> A Game Of Thrones</h2>
                    <h3><div className={styles["rating"]}>
                        {[...Array(5)].map((star, index) => {
                            index += 1;

                            return (
                                <span
                                    key={index}
                                    className={index <= Math.round(rating) ? styles["full"] : styles["empty"]}
                                >
                                    ☆
                                </span>
                            )
                        })}
                        <span>{`${rating.toFixed(1)} (2) rewiews`}</span>

                    </div></h3>
                    <h3>Address: George R.R Martin</h3>
                    <h3>Phone: 5</h3>
                    <h3>Capacity: Fiction</h3>
                    <h3>Summary: alabalaczcz dzzdzc czczczczxczxc czczczczx czczcsfcsdczxc  czczczczc dzczcz adczccscssssssssssss dsaaaaaa daaaaaaaaaaaa alabalaczcz dzzdzc czczczczxczxc czczczczx czczcsfcsdczxc  czczczczc dzczcz adczccscssssssssssss dsaaaaaa daaaaaaaaaaaaalabalaczcz dzzdzc czczczczxczxc czczczczx czczcsfcsdczxc  czczczczc dzczcz adczccscssssssssssss dsaaaaaa daaaaaaaaaaaaalabalaczcz dzzdzc czczczczxczxc czczczczx czczcsfcsdczxc  czczczczc dzczcz adczccscssssssssssss dsaaaaaa daaaaaaaaaaaaalabalaczcz dzzdzc czczczczxczxc czczczczx czczcsfcsdczxc  czczczczc dzczcz adczccscssssssssssss dsaaaaaa daaaaaaaaaaaa</h3>
                    <div className={styles["buttons"]}>
                        <a href="#" className={styles["edit-button"]}>Edit</a>
                        <a href="#" className={styles["delete-button"]}>Delete</a>
                        <a className={styles["favourite-button"]} onClick={() => openModal()}>Favourite</a>
                        {/* <p className="wish-pub">You already added the book to your wish list</p> */}
                    </div>

                    <div className={styles["rating-container"]}>

                        <div className={styles["rating"]}>
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                const rating = 2;

                                return (
                                    <span
                                        key={index}
                                        className={index <= Math.round(rating) ? styles["full"] : styles["empty"]}
                                    >
                                        ☆
                                    </span>
                                )
                            })}
                            {/* <p>{`(${restaurant.reviews.length}) rewiews`}</p> */}

                        </div>
                    </div>

                </div>

                <div className={styles["item-details-image"]}>
                    <img src="https://static.pochivka.bg/bgstay.com/images/photos/39/39827/orig_39827_1.jpg" alt="resto" />
                </div>


            </div>
        </section>
    );
}