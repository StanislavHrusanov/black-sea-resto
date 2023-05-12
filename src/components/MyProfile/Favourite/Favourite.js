import { Link, useNavigate } from "react-router-dom";
import styles from "./Favourite.module.css";

import * as favouritesService from "../../../services/favouritesService";

export const Favourite = ({ favourite, removeFromMyFavouritesState }) => {
    const navigate = useNavigate();

    const onRemove = async () => {

        try {
            const favouriteToRemove = Object.assign({}, favourite);
            await favouritesService.removeFromFavourites(favouriteToRemove._id);
            removeFromMyFavouritesState(favouriteToRemove);
        } catch (error) {
            window.alert(error.message);
            navigate('/myProfile');
        }
    }

    return (
        <div className={styles["restaurant"]}>
            <img src={favourite.imageUrl} alt="resto" />
            <h3>{favourite.restaurantName}</h3>
            <Link to={`/restaurants/${favourite.restaurantId}`}>
                <button className={styles["details-btn"]}>Details</button>
            </Link>
            <button
                onClick={onRemove}
                className={styles["favourites-btn"]}
            >Remove from favourites</button>
        </div>
    );
}