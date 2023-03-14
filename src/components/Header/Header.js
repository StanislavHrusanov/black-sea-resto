import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css"

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

export const Header = () => {
    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = async (e) => {
        e.preventDefault();
        try {
            await authService.logout();
            userLogout();
            navigate('/');

        } catch (error) {
            return window.alert(error);
        }
    }

    return (
        <header>
            <h1><Link className={styles["home"]} to="/">Black See Resto</Link></h1>
            <nav>
                {user &&
                    <span className={styles["hello"]}>{`Hello, ${user.username}!`}</span>
                }
                <Link to="/restaurants">Restaurants</Link>
                {user
                    ? <div id="user">
                        <Link to="/addRestaurant">Add restaurant</Link>
                        <Link to="/logout" onClick={(e) => onLogout(e)}>Logout</Link>
                    </div>

                    : <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                }
            </nav>
        </header>
    );
}