import styles from "./Pagination.module.css";

export const Pagination = ({
    currentPage,
    options,
    numberOfPages,
    clickPrev,
    clickNext,
    onChangePage
}) => {

    return (
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
    );
}