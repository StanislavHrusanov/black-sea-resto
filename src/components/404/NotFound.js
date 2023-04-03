import styles from "./NotFound.module.css";

export const NotFound = () => {
    return (
        <div className={styles["container"]}>
            <div className={styles["copy-container"]}>
                <p>
                    404, page not found.
                </p>

            </div>
        </div>
    );
}