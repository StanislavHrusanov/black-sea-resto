import { useState } from "react";
import styles from "./Search.module.css";

export const Search = ({
    onSearch,
    calculateNumberOfPages
}) => {
    const [searched, setSearched] = useState('');

    const onChangeHandler = (e) => {
        setSearched(e.target.value);
    }

    const onClearSearch = () => {
        setSearched('')
        calculateNumberOfPages('');
        onSearch('');
    }

    return (
        <div className={styles['search-container']}>
            <input
                className={styles['search-input']}
                name="search"
                id="search-input"
                value={searched}
                onChange={onChangeHandler}
                onBlur={(e) => calculateNumberOfPages(e.target.value)}
            />
            {searched.length > 0 &&
                <button
                    className={styles["btn-close"]}
                    onClick={onClearSearch}
                >
                    <i className="fa-regular fa-rectangle-xmark"></i>
                </button>
            }
            <button
                className={styles['search-btn']}
                onClick={() => onSearch(searched)}
            >Search</button>
        </div>
    );
}