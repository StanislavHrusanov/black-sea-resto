import { Link } from "react-router-dom";
import "./Auth.css";

export const Register = () => {
    return (
        <section id="register-page">
            <div className="container">
                <div>
                    <h2 className="heading">
                        Register
                    </h2>
                </div>
                <form className="auth-form" >
                    <div className="input">
                        <label htmlFor="full-name" className="fullname">Full Name</label>
                        <input type="text" className="input-field" placeholder="John Doe" id="full-name" />
                    </div>
                    <div className="input">
                        <label htmlFor="username" className="username">Username</label>
                        <input type="text" className="input-field" placeholder="jdoe" id="username" />
                    </div>
                    <div className="input">
                        <label htmlFor="password" className="password">Password</label>
                        <input type="password" className="input-field" id="password" placeholder="******" />
                    </div>
                    <div className="input">
                        <label htmlFor="re-password" className="re-password">Repeat Password</label>
                        <input type="password" className="input-field" id="re-password" placeholder="******" />
                    </div>
                    <div className="action">
                        <button className="action-button">Register</button>
                    </div>
                </form>

                <div className="auth-question">
                    <p>Already have an account?
                        <Link to="/login"> Sign in</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}