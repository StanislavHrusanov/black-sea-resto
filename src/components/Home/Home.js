import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export const Home = () => {
    return (
        <section id="home-section">
            <div className={styles["home-message"]}>
                <h2>We will help you find your perfect restaurant!</h2>
            </div>
            <div className={styles["home-container"]}>

                <div className={styles["top-three"]}>
                    <h1>Most Popular</h1>

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
                        <h3>Vili Sozopol</h3>
                        <div className={styles["rating"]}>
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className={styles["data-buttons"]}>
                            <Link href="#" className={styles["details-btn"]}>Details</Link>
                        </div>
                    </div>
                    <p className={styles["no-restaurants"]}>There is no restaurants yet!</p>
                </div>
            </div>
        </section>
    );
}