import { Link } from "react-router-dom";
import styles from "./Favourite.module.css";

export const Favourite = ({ favourite }) => {
    return (
        <div className={styles["restaurant"]}>
            <div className={styles["restaurant-image-wrap"]}>
                <img src={favourite.imageUrl} alt="resto" />
            </div>
            <h3>{favourite.restaurantName}</h3>
            <div className={styles["data-buttons"]}>
                <Link to={`/restaurants/${favourite.restaurantId}`}><button className={styles["details-btn"]}>Details</button></Link>
                <button className={styles["favourites-btn"]}>Remove from favourites</button>
            </div>
        </div>
    );
}