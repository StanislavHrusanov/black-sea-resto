import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css"

import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
    const { user } = useContext(AuthContext);

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
                        <Link to="/myProfile">My profile</Link>
                        <Link to="/logout">Logout</Link>
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