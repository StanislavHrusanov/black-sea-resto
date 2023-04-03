import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Restaurants.module.css";

import { RestaurantItem } from "./RestaurantItem/RestaurantItem";
import { Search } from "./Search/Search";
import { Pagination } from "./Pagination/Pagination";
import { Sort } from "./Sort/Sort";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import { LoadingContext } from "../../contexts/LoadingContext";
import { UserActionsContext } from "../../contexts/UserActionsContext";

import * as restaurantService from "../../services/restaurantService";
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
    const { search, sort, page, changeSearchState, changeSortState, changePageState } = useContext(UserActionsContext)
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                showLoading();
                const allRestaurants = await restaurantService.getAllRestaurants();
                setRestaurants(allRestaurants);
                const allFilteredRsts = allRestaurants.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
                setFilteredRestaurants([...utils.sortRestaurantsByCriteria([...allFilteredRsts], sort)]);
                setSortCriteria(sort);
                setCurrentPage(page);
                setStart(page * pageSize - pageSize);
                setNumberOfPages(Math.ceil(allFilteredRsts.length / pageSize));
                setOptions(() => {
                    const opt = [];
                    for (let i = 1; i <= Math.ceil(allFilteredRsts.length / pageSize); i++) {
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
        setSortCriteria(sort);
        setFilteredRestaurants(() => {
            const filtered = restaurants.filter(x => x.name.toLowerCase().includes(searched.toLowerCase()));

            return [...utils.sortRestaurantsByCriteria([...filtered], sort)];
        });
        setCurrentPage(1);
        setStart(0);
        changeSearchState(searched);
        changePageState(1);
    }

    const onSort = (criteria) => {
        setSortCriteria(criteria);
        setFilteredRestaurants(state => [...utils.sortRestaurantsByCriteria([...state], criteria)]);
        changeSortState(criteria);
        changePageState(currentPage);
    }

    const clickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(state => state - 1);
            setStart(state => state - pageSize);
            changePageState(currentPage - 1);
        }
    }

    const clickNext = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(state => state + 1);
            setStart(state => state + pageSize);
            changePageState(currentPage + 1);
        }
    }

    const onChangePage = (page) => {
        setCurrentPage(Number(page));
        setStart(Number(page) * pageSize - pageSize);
        changePageState(Number(page));
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
                        search={search}
                    />

                </div>
                <div className={styles["restaurants-container"]}>

                    <Sort
                        sortCriteria={sortCriteria}
                        onSort={onSort}
                    />

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
                        <Pagination
                            currentPage={currentPage}
                            options={options}
                            numberOfPages={numberOfPages}
                            clickPrev={clickPrev}
                            clickNext={clickNext}
                            onChangePage={onChangePage}
                        />
                    }
                </div>
            </section>
        );
}