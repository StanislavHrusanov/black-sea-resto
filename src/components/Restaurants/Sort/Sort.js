import styles from "./Sort.module.css";

export const Sort = ({ sortCriteria, onSort }) => {

    return (
        <div className={styles["sort-div"]}>
            <span>Sort by</span>
            <select
                value={sortCriteria}
                name="criteria"
                className={styles["criteria"]}
                onChange={(e) => onSort(e.target.value)}
            >
                <option value=""></option>
                <option value="newest">Newest</option>
                <option value="a-z">A-Z</option>
                <option value="reviews">Reviews</option>
                <option value="rating">Rating</option>
            </select>
        </div>
    );
}