import { Link } from "react-router-dom";
import styles from "./Restaurants.module.css";

export const Restaurants = () => {
    return (
        <section id="restaurants-section">
            <div className={styles["restaurants-message"]}>
                <h2>We will help you find your perfect restaurant!</h2>
            </div>
            <div className={styles["restaurants-container"]}>

                <div className={styles["restaurants"]}>
                    <h1>Restaurants</h1>

                    <div className={styles["restaurant"]}>
                        <div className={styles["image-wrap"]}>
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>Bistro staria sozo</h3>
                        <div className={styles["rating"]}>
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className={styles["data-buttons"]}>
                            <Link href="#" className={styles["details-btn"]}>Details</Link>
                        </div>
                    </div>
                    <div className={styles["restaurant"]}>
                        <div className={styles["image-wrap"]}>
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>Vili Sozopol</h3>
                        <div className={styles["rating"]}>
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className={styles["data-buttons"]}>
                            <Link href="#" className={styles["details-btn"]}>Details</Link>
                        </div>
                    </div>
                    <div className={styles["restaurant"]}>
                        <div className={styles["image-wrap"]}>
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>Vili Sozopol ddasdasda</h3>
                        <div className={styles["rating"]}>
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className={styles["data-buttons"]}>
                            <Link href="#" className={styles["details-btn"]}>Details</Link>
                        </div>
                    </div>
                    <div className={styles["restaurant"]}>
                        <div className={styles["image-wrap"]}>
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>Vili Sozopol ddasdasda</h3>
                        <div className={styles["rating"]}>
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className={styles["data-buttons"]}>
                            <Link href="#" className={styles["details-btn"]}>Details</Link>
                        </div>
                    </div>
                    <div className={styles["restaurant"]}>
                        <div className={styles["image-wrap"]}>
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>ViliSozopol ddasdasda</h3>
                        <div className={styles["rating"]}>
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className={styles["data-buttons"]}>
                            <Link href="#" className={styles["details-btn"]}>Details</Link>
                        </div>
                    </div>
                    <div className={styles["restaurant"]}>
                        <div className={styles["image-wrap"]}>
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>Vili Sozopol ddasdasda</h3>
                        <div className={styles["rating"]}>
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className={styles["data-buttons"]}>
                            <Link href="#" className={styles["details-btn"]}>Details</Link>
                        </div>
                    </div>
                    <div className={styles["restaurant"]}>
                        <div className={styles["image-wrap"]}>
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>Vili</h3>
                        <div className={styles["rating"]}>
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className={styles["data-buttons"]}>
                            <Link href="#" className={styles["details-btn"]}>Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}