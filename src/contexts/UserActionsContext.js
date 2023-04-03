import { createContext, useState } from "react";

export const UserActionsContext = createContext();

export const UserActionsProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);

    const changeSearchState = (searched) => {
        setSearch(searched);
    }

    const changeSortState = (criteria) => {
        setSort(criteria);
    }

    const changePageState = (pageNumber) => {
        setPage(pageNumber);
    }

    const deleteUserActions = () => {
        setSearch('');
        setSort('');
        setPage(1);
    }

    return (
        <UserActionsContext.Provider
            value={{
                search,
                sort,
                page,
                changeSearchState,
                changeSortState,
                changePageState,
                deleteUserActions
            }}
        >
            {children}
        </UserActionsContext.Provider>
    )
}