import { Link } from "react-router-dom";
import "./Auth.css";

export const Login = () => {
    return (
        <section id="login-page">
            <div className="container">
                <div>
                    <h2 className="heading">
                        Login
                    </h2>
                </div>
                <form className="auth-form">
                    <div className="input">
                        <label htmlFor="username" className="username">Username</label>
                        <input type="text" className="input-field" placeholder="jdoe" id="username" />
                    </div>
                    <div className="input">
                        <label htmlFor="password" className="password">Password</label>
                        <input type="password" className="input-field" id="password" placeholder="******" />
                    </div>
                    <div className="action">
                        <button className="action-button">Login</button>
                    </div>
                </form>
                <div className="auth-question">
                    <p>Dont have an account?
                        <Link to="/register"> Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}