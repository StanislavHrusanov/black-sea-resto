import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
    return (
        <section id="home-section">

            <div className="home-message">
                <h2>Find your perfect restaurant</h2>
            </div>

            <div className="top-three">
                <h1>Top 3</h1>

                <div class="restaurant">
                    <div class="image-wrap">
                        <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto"/>
                    </div>
                    <h3>Cover Fire</h3>
                    <div class="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div class="data-buttons">
                        <Link href="#" class="btn details-btn">Details</Link>
                    </div>
                </div>
                <div class="restaurant">
                    <div class="image-wrap">
                        <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto"/>
                    </div>
                    <h3>Cover Fire</h3>
                    <div class="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div class="data-buttons">
                        <Link href="#" class="btn details-btn">Details</Link>
                    </div>
                </div>
                <div class="restaurant">
                    <div class="image-wrap">
                        <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto"/>
                    </div>
                    <h3>Cover Fire</h3>
                    <div class="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div class="data-buttons">
                        <Link href="#" class="btn details-btn">Details</Link>
                    </div>
                </div>
            </div>

        </section>

    );
}