import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddRestaurant.module.css";

import * as restaurantService from "../../services/restaurantService";
// import { RestaurantContext } from "../../contexts/RestaurantContext";

export const AddRestaurant = () => {
    const [inputs, setInputs] = useState({
        name: '',
        address: '',
        phone: '',
        capacity: '',
        imageUrl: '',
        summary: ''
    });

    const navigate = useNavigate();
    // const { addRestaurantToState } = useContext(RestaurantContext);

    const onChangeHandler = (e) => {
        setInputs(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await restaurantService.addRestaurant({ ...inputs, reviews: [] });
            // addRestaurantToState(addedRestaurant);
            navigate('/restaurants');

        } catch (error) {
            return window.alert(error);
        }
    }

    return (
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
                        />
                    </div>
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
                        />
                    </div>
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
                        />
                    </div>
                    <div className={styles["input"]}>
                        <label htmlFor="restaurant-capacity" className={styles["capacity"]}>Capacity</label>
                        <input
                            type="text"
                            className={styles["input-field"]}
                            name="capacity"
                            id="restaurant-capacity"
                            placeholder="100 persons"
                            value={inputs.capacity}
                            onChange={onChangeHandler}
                        />
                    </div>
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
                        />
                    </div>
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
                        />
                    </div>
                    <div className={styles["action"]}>
                        <button className={styles["action-button"]}>Add your restaurant</button>
                    </div>
                </form>


            </div>
        </section>
    );
}