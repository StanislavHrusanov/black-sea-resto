import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

export const Register = () => {
    return (
        <section id="register-page">
            <div className={styles["container"]}>
                <div>
                    <h2 className={styles["heading"]}>
                        Register
                    </h2>
                </div>
                <form className={styles["auth-form"]} >
                    <div className={styles["input"]}>
                        <label htmlFor="full-name" className={styles["fullname"]}>Full Name</label>
                        <input type="text" className={styles["input-field"]} placeholder="John Doe" id="full-name" />
                    </div>
                    <div className={styles["input"]}>
                        <label htmlFor="username" className={styles["username"]}>Username</label>
                        <input type="text" className={styles["input-field"]} placeholder="jdoe" id="username" />
                    </div>
                    <div className={styles["input"]}>
                        <label htmlFor="password" className={styles["password"]}>Password</label>
                        <input type="password" className={styles["input-field"]} id="password" placeholder="******" />
                    </div>
                    <div className={styles["input"]}>
                        <label htmlFor="re-password" className={styles["re-password"]}>Repeat Password</label>
                        <input type="password" className={styles["input-field"]} id="re-password" placeholder="******" />
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