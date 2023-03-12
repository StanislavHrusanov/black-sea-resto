import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

export const Login = () => {
    return (
        <section id="login-page">
            <div className={styles["container"]}>
                <div>
                    <h2 className={styles["heading"]}>
                        Login
                    </h2>
                </div>
                <form className={styles["auth-form"]}>
                    <div className={styles["input"]}>
                        <label htmlFor="username" className={styles["username"]}>Username</label>
                        <input type="text" className={styles["input-field"]} placeholder="jdoe" id="username" />
                    </div>
                    <div className={styles["input"]}>
                        <label htmlFor="password" className={styles["password"]}>Password</label>
                        <input type="password" className={styles["input-field"]} id="password" placeholder="******" />
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