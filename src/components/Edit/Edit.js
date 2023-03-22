import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Edit.module.css";

import * as restaurantService from "../../services/restaurantService";
import * as validation from "../../validation";
import { LoadingContext } from "../../contexts/LoadingContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const Edit = () => {
    const [restaurant, setRestaurant] = useState({
        name: '',
        address: '',
        phone: '',
        capacity: '',
        imageUrl: '',
        summary: ''
    });

    const [errors, setErrors] = useState({});

    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const { restaurantId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        showLoading();
        restaurantService.getOne(restaurantId)
            .then(result => setRestaurant(result))
            .then(() => hideLoading())
            .catch(err => {
                window.alert(err.message);
                hideLoading();
                return navigate(`/restaurants/${restaurantId}`);
            });
    }, [restaurantId, showLoading, hideLoading, navigate]);

    const onChangeHandler = (e) => {
        setRestaurant(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        for (let key in errors) {
            if (errors[key]) {
                return;
            }
        }

        try {
            showLoading();
            await restaurantService.edit(restaurantId, restaurant);
            hideLoading();
            navigate(`/restaurants/${restaurantId}`);
        } catch (error) {
            window.alert(error.message);
            hideLoading();
            return navigate(`/restaurants/${restaurantId}/edit`);
        }
    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <section id="editRestaurant-page">
                <div className={styles["container"]}>
                    <div>
                        <h2 className={styles["heading"]}>
                            Edit your restaurant
                        </h2>
                    </div>

                    <form onSubmit={onSubmit} className={styles["edit-form"]} >
                        <div className={styles["input"]}>
                            <label htmlFor="restaurant-name" className={styles["name"]}>Restaurant name</label>
                            <input
                                type="text"
                                className={styles["input-field"]}
                                name="name"
                                id="restaurant-name"
                                placeholder="Happy Bar & Grill"
                                value={restaurant.name}
                                onChange={onChangeHandler}
                                onBlur={(e) => validation.minLength(e, setErrors)}
                            />
                        </div>
                        {errors.name &&
                            <div className={styles["error-msg"]}>
                                Restaurant name is required!
                            </div>
                        }
                        <div className={styles["input"]}>
                            <label htmlFor="restaurant-address" className={styles["address"]}>Address</label>
                            <input
                                type="text"
                                className={styles["input-field"]}
                                name="address"
                                id="restaurant-address"
                                placeholder="10, Vitosha, Sofia 1000"
                                value={restaurant.address}
                                onChange={onChangeHandler}
                                onBlur={(e) => validation.minLength(e, setErrors)}
                            />
                        </div>
                        {errors.address &&
                            <div className={styles["error-msg"]}>
                                Address is required!
                            </div>
                        }
                        <div className={styles["input"]}>
                            <label htmlFor="phone-number" className={styles["phone"]}>Phone</label>
                            <input
                                type="text"
                                className={styles["input-field"]}
                                name="phone"
                                id="phone-number"
                                placeholder="+359888XXXXXX"
                                value={restaurant.phone}
                                onChange={onChangeHandler}
                                onBlur={(e) => validation.isPhoneNumber(e, setErrors)}
                            />
                        </div>
                        {errors.phone &&
                            <div className={styles["error-msg"]}>
                                Phone number must start with +359 followed by 9 digits!
                            </div>
                        }
                        <div className={styles["input"]}>
                            <label htmlFor="restaurant-capacity" className={styles["capacity"]}>Capacity</label>
                            <input
                                type="number"
                                className={styles["input-field"]}
                                name="capacity"
                                id="restaurant-capacity"
                                placeholder="100 persons"
                                value={restaurant.capacity}
                                onChange={onChangeHandler}
                                onBlur={(e) => validation.isPositiveNumber(e, setErrors)}
                            />
                        </div>
                        {errors.capacity &&
                            <div className={styles["error-msg"]}>
                                Capacity must be an integer bigger than 0!
                            </div>
                        }
                        <div className={styles["input"]}>
                            <label htmlFor="restaurant-image" className={styles["imageUrl"]}>Image</label>
                            <input
                                type="text"
                                className={styles["input-field"]}
                                name="imageUrl"
                                id="restaurant-image"
                                placeholder="http://image.jpeg"
                                value={restaurant.imageUrl}
                                onChange={onChangeHandler}
                                onBlur={(e) => validation.isImageUrl(e, setErrors)}
                            />
                        </div>
                        {errors.imageUrl &&
                            <div className={styles["error-msg"]}>
                                Image must be a link!
                            </div>
                        }
                        <div className={styles["input"]}>
                            <label htmlFor="restaurant-summary" className={styles["summary"]}>Summary</label>
                            <input
                                type="text"
                                className={styles["input-field"]}
                                name="summary"
                                id="restaurant-summary"
                                placeholder="Some text..."
                                value={restaurant.summary}
                                onChange={onChangeHandler}
                                onBlur={(e) => validation.minLength(e, setErrors)}
                            />
                        </div>
                        {errors.summary &&
                            <div className={styles["error-msg"]}>
                                Summary is required!
                            </div>
                        }
                        <div className={styles["action"]}>
                            <button className={styles["action-button"]}>Edit</button>
                        </div>
                    </form>

                </div>
            </section>
        );
}