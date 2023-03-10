import "./Auth.css";

export const Register = () => {
    return (
        <section id="register-page">
            <div className="container">
                <div>
                    <h2 className="heading">
                        Create your account
                    </h2>
                </div>
                <form className="auth-form" >
                    <div className="input">
                        <input type="text" className="input-field" placeholder="John Doe" />
                        <label className="fullname">Full Name</label>
                    </div>
                    <div className="input">
                        <input type="text" className="input-field" placeholder="jdoe" id="username" />
                        <label className="username">Username</label>
                    </div>
                    <div className="input">
                        <input type="password" className="input-field" id="password" placeholder="******" />
                        <label className="password">Password</label>
                    </div>
                    <div className="input">
                        <input type="password" className="input-field" id="re-password" placeholder="******" />
                        <label className="re-password">Repeat Password</label>
                    </div>
                    <div className="action">
                        <button className="action-button">Register</button>
                    </div>
                </form>

                <div className="auth-question">
                    <p>Already have an account?<a href="#"> Sign in</a>
                    </p>
                </div>
            </div>
        </section>
    );
}