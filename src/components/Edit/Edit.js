import styles from "./Edit.module.css";

export const Edit = () => {

    return (
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
                        <button className={styles["action-button"]}>Edit</button>
                    </div>
                </form>


            </div>
        </section>
    );
}