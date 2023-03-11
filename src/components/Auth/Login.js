import { Link } from "react-router-dom";

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
                        <input type="text" className="input-field" placeholder="jdoe" id="username" />
                        <label className="username">Username</label>
                    </div>
                    <div className="input">
                        <input type="password" className="input-field" id="password" placeholder="******" />
                        <label className="password">Password</label>
                    </div>
                    <div className="action">
                        <button className="action-button">Login</button>
                    </div>
                </form>
                <div className="auth-question">
                    <p>Dont have an account?
                        <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}