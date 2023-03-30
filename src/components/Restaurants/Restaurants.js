import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Restaurants.module.css";

import { RestaurantItem } from "./RestaurantItem/RestaurantItem";
import { Search } from "./Search/Search";
import * as restaurantService from "../../services/restaurantService";

import { LoadingContext } from "../../contexts/LoadingContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import * as utils from "../../utils";

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [start, setStart] = useState(0);
    const [pageSize] = useState(8);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [options, setOptions] = useState([]);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                showLoading();
                const allRestaurants = await restaurantService.getAllRestaurants();
                setRestaurants(allRestaurants);
                setFilteredRestaurants(allRestaurants);
                setNumberOfPages(Math.ceil(allRestaurants.length / pageSize));
                setOptions(() => {
                    const opt = [];
                    for (let i = 1; i <= Math.ceil(allRestaurants.length / pageSize); i++) {
                        opt.push(i);
                    }
                    return opt;
                });
                hideLoading();

            } catch (error) {
                window.alert(error.message);
                hideLoading();
                return navigate('/restaurants');
            }
        })();
    }, [showLoading, hideLoading, navigate, pageSize]);

    const onSearch = (searched) => {
        setSortCriteria('');
        setFilteredRestaurants(restaurants.filter(x => x.name.toLowerCase().includes(searched.toLowerCase())));
        setCurrentPage(1);
        setStart(0);
    }

    const onSort = (criteria) => {
        setSortCriteria(criteria);
        setFilteredRestaurants(state => [...utils.sortRestaurantsByCriteria(state, criteria)]);
    }

    const clickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(state => state - 1);
            setStart(state => state - pageSize);
        }
    }

    const clickNext = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(state => state + 1);
            setStart(state => state + pageSize);
        }
    }

    const onChangePage = (page) => {
        setCurrentPage(Number(page));
        setStart(Number(page) * pageSize - pageSize)
    }

    const calculateNumberOfPages = (searched) => {
        const filtered = restaurants.filter(x => x.name.toLowerCase().includes(searched.toLowerCase()))
        setNumberOfPages(Math.ceil(filtered.length / pageSize));
        setOptions(() => {
            const opt = [];
            for (let i = 1; i <= Math.ceil(filtered.length / pageSize); i++) {
                opt.push(i);
            }
            return opt;
        });
    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <section id="restaurants-section">
                <div className={styles["restaurants-message"]}>
                    <h2>We will help you find your perfect restaurant!</h2>

                    <Search
                        onSearch={onSearch}
                        calculateNumberOfPages={calculateNumberOfPages}
                    />

                </div>
                <div className={styles["restaurants-container"]}>
                    <div className={styles["sort-container"]}>
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
                    </div>

                    <div className={styles["restaurants"]}>
                        <h1>Restaurants</h1>

                        {restaurants.length === 0
                            ? <p className={styles["no-restaurants"]}>There is no restaurants yet!</p>
                            : filteredRestaurants.length === 0
                                ? <p className={styles["no-restaurants"]}>0 restaurants found!</p>
                                : filteredRestaurants
                                    .slice(start, start + pageSize)
                                    .map(x => <RestaurantItem key={x._id} restaurant={x} />)
                        }

                    </div>

                    {filteredRestaurants.length > 0 &&
                        <div className={styles["page-container"]}>
                            <div className={styles["page-div"]}>
                                <button onClick={clickPrev}>Prev</button>
                                <select
                                    name="page"
                                    value={currentPage}
                                    className={styles["page"]}
                                    onChange={(e) => onChangePage(e.target.value)}
                                >
                                    {options.length > 0 &&
                                        options.map((x, i) => <option key={i} value={i + 1}>{i + 1}</option>)
                                    }
                                </select>
                                <button onClick={clickNext}>{currentPage < numberOfPages ? 'Next' : 'Last'}</button>
                            </div>

                        </div>
                    }
                </div>
            </section>
        );
}