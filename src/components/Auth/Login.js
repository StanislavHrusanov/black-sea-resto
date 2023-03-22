import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

import * as authService from "../../services/authService";
import * as validation from "../../validation";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { trimInputs } from "../../utils";

export const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const { userLogin } = useContext(AuthContext);
    const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setInputs(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        for (let key in errors) {
            if (errors[key]) {
                return;
            }
        }

        const trimedInputs = trimInputs(inputs);

        try {
            showLoading();
            const loggedInUser = await authService.login(trimedInputs);
            userLogin(loggedInUser);
            hideLoading();
            navigate('/');
        } catch (error) {
            window.alert(error.message);
            hideLoading();
            return navigate('/login');
        }

    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
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
                                onBlur={(e) => validation.minLength(e, setErrors)}
                            />
                        </div>
                        {errors.username &&
                            <div className={styles["error-msg"]}>
                                Username is required!
                            </div>
                        }
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
                                onBlur={(e) => validation.minLength(e, setErrors)}
                            />
                        </div>
                        {errors.password &&
                            <div className={styles["error-msg"]}>
                                Password is required!
                            </div>
                        }
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