import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddRestaurant.module.css";

import * as restaurantService from "../../services/restaurantService";
import * as validation from "../../validation";
import { UserActionsContext } from "../../contexts/UserActionsContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const AddRestaurant = () => {
    const [inputs, setInputs] = useState({
        name: '',
        address: '',
        phone: '',
        capacity: '',
        imageUrl: '',
        summary: ''
    });

    const [errors, setErrors] = useState({});

    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const { deleteUserActions } = useContext(UserActionsContext);
    const navigate = useNavigate();

    useEffect(() => {
        deleteUserActions();
    })

    const onChangeHandler = (e) => {
        setInputs(state => ({
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
            await restaurantService.addRestaurant({ ...inputs, reviews: [] });
            hideLoading();
            navigate('/restaurants');

        } catch (error) {
            window.alert(error.message);
            hideLoading();
            return navigate('/addRestaurant');
        }
    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <section id="addRestaurant-page">
                <div className={styles["container"]}>
                    <div>
                        <h2 className={styles["heading"]}>
                            Add your restaurant
                        </h2>
                    </div>
                    <form onSubmit={onSubmit} className={styles["create-form"]} >
                        <div className={styles["input"]}>
                            <label htmlFor="restaurant-name" className={styles["name"]}>Restaurant name</label>
                            <input
                                type="text"
                                className={styles["input-field"]}
                                name="name"
                                id="restaurant-name"
                                placeholder="Happy Bar & Grill"
                                value={inputs.name}
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
                                value={inputs.address}
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
                                value={inputs.phone}
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
                                placeholder="100"
                                value={inputs.capacity}
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
                                value={inputs.imageUrl}
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
                                value={inputs.summary}
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
                            <button className={styles["action-button"]}>Add your restaurant</button>
                        </div>
                    </form>


                </div>
            </section>
        );
}