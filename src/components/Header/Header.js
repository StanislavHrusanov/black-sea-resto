import { Link } from "react-router-dom";
import "./Header.css"

export const Header = () => {
    return (
        <header>
            <h1><Link className="home" to="/">Black See Resto</Link></h1>
            <nav>
                <Link to="/restaurants">Restaurants</Link>

                <div id="user">
                    <Link to="/addRestaurant">Add restaurant</Link>
                    <Link to="/logout">Logout</Link>
                </div>

                <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
}