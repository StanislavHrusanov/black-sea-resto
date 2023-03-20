import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import * as authService from "../../services/authService";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const Register = () => {
    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        password: '',
        rePass: ''
    });
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

        const userData = {
            ...inputs,
            myReviews:[],
            favourites:[]
        };

        try {
            showLoading();
            const createdUser = await authService.register(userData);
            userLogin(createdUser);
            hideLoading();
            navigate('/');

        } catch (error) {
            hideLoading();
            window.alert(error.message);
            return navigate('/register');
        }
    }

    return isLoading
        ? (
            <LoadingSpinner />
        )
        : (
            <section id="register-page">
                <div className={styles["container"]}>
                    <div>
                        <h2 className={styles["heading"]}>
                            Register
                        </h2>
                    </div>
                    <form onSubmit={onSubmit} className={styles["auth-form"]} >
                        <div className={styles["input"]}>
                            <label htmlFor="full-name" className={styles["fullname"]}>Full Name</label>
                            <input
                                type="text"
                                className={styles["input-field"]}
                                name="fullname"
                                id="full-name"
                                placeholder="John Doe"
                                value={inputs.fullname}
                                onChange={onChangeHandler}
                            />
                        </div>
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
                        <div className={styles["input"]}>
                            <label htmlFor="rePass" className={styles["re-password"]}>Repeat Password</label>
                            <input
                                type="password"
                                className={styles["input-field"]}
                                name="rePass"
                                id="rePass"
                                placeholder="******"
                                value={inputs.rePass}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className={styles["action"]}>
                            <button className={styles["action-button"]}>Register</button>
                        </div>
                    </form>

                    <div className={styles["auth-question"]}>
                        <p>Already have an account?
                            <Link to="/login"> Sign in</Link>
                        </p>
                    </div>
                </div>
            </section>
        );
}