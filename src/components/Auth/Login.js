import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

import * as authService from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";

export const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setInputs(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const loggedInUser = await authService.login(inputs);
            userLogin(loggedInUser);
            navigate('/');
        } catch (error) {
            return window.alert(error.message);
        }

    }

    return (
        <section id="login-page">
            <div className={styles["container"]}>
                <div>
                    <h2 className={styles["heading"]}>
                        Login
                    </h2>
                </div>
                <form onSubmit={onSubmit} className={styles["auth-form"]}>
                    <div className={styles["input"]}>
                        <label htmlFor="username" className={styles["username"]}>Username</label>
                        <input
                            type="text"
                            className={styles["input-field"]}
                            name="username"
                            id="username"
                            placeholder="jdoe"
                            value={inputs.username}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className={styles["input"]}>
                        <label htmlFor="password" className={styles["password"]}>Password</label>
                        <input
                            type="password"
                            className={styles["input-field"]}
                            name="password"
                            id="password"
                            placeholder="******"
                            value={inputs.password}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className={styles["action"]}>
                        <button className={styles["action-button"]}>Login</button>
                    </div>
                </form>
                <div className={styles["auth-question"]}>
                    <p>Dont have an account?
                        <Link to="/register"> Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}