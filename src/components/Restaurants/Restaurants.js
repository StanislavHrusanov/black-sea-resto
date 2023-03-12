import { Link } from "react-router-dom";
import "./Restaurants.css";

export const Restaurants = () => {
    return (
        <section id="restaurants-section">
            <div className="home-message">
                <h2>We will help you find your perfect restaurant!</h2>
            </div>
            <div className="restaurants-container">

                <div className="restaurants">
                    <h1>Restaurants</h1>

                    <div className="restaurant">
                        <div className="image-wrap">
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>Vili Sozopol</h3>
                        <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className="data-buttons">
                            <Link href="#" className="btn details-btn">Details</Link>
                        </div>
                    </div>
                    <div className="restaurant">
                        <div className="image-wrap">
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>Vili Sozopol</h3>
                        <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className="data-buttons">
                            <Link href="#" className="btn details-btn">Details</Link>
                        </div>
                    </div>
                    <div className="restaurant">
                        <div className="image-wrap">
                            <img src="https://villi-sozopol-hotel.hotelmix.bg/data/Photos/OriginalPhoto/11239/1123947/1123947600/Villi-Sozopol-Hotel-Exterior.JPEG" alt="resto" />
                        </div>
                        <h3>Vili Sozopol daadadaddadadadas</h3>
                        <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className="data-buttons">
                            <Link href="#" className="btn details-btn">Details</Link>
                        </div>
                    </div>
                    <p className="no-restaurants">There is no restaurants yet!</p>
                </div>
            </div>
        </section>
    );
}