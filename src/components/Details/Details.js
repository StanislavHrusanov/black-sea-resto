import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Details.module.css";

import { AddReview } from "./AddReview/AddReview";
import { Review } from "./Review/Review";

export const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const rating = 3;

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

            <div className={styles["item-details"]}>

                <div className={styles["item-description"]}>
                    <h2> Azahar</h2>
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
                    <h3>Address: dadada</h3>
                    <h3>Phone: 321221313</h3>
                    <h3>Capacity: 212</h3>
                    <h3>Summary: alabalaczcz dzzdzc czczczczxczxc czczczczx czczcsfcsdczxc  c</h3>
                    <div className={styles["buttons"]}>
                        <Link to="#" className={styles["edit-button"]}>Edit</Link>
                        <Link to="#" className={styles["delete-button"]}>Delete</Link>
                        <Link className={styles["favourite-button"]} >Favourite</Link>
                        {/* <p className="wish-pub"></p> */}
                    </div>

                    <div className={styles["reviews-container"]}>

                        <button onClick={() => openModal()} className={styles["add-review-btn"]}>Add review</button>

                        {<Review rating={rating} />}

                    </div>

                </div>

                <div className={styles["item-details-image"]}>
                    <img src="https://static.pochivka.bg/bgstay.com/images/photos/39/39827/orig_39827_1.jpg" alt="resto" />
                </div>
            </div>
        </section>
    );
}