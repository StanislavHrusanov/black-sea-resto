export const Login = () => {
    return (
        <section id="login-page">
            <div class="container">
                <div>
                    <h2 class="heading">
                        Login
                    </h2>
                </div>
                <form class="auth-form">

                    <div class="input">
                        <input type="text" class="input-field" placeholder="jdoe" id="username" />
                        <label class="username">Username</label>
                    </div>
                    <div class="input">
                        <input type="password" class="input-field" id="password" placeholder="******" />
                        <label class="password">Password</label>
                    </div>
                    <div class="action">
                        <button class="action-button">Login</button>
                    </div>
                </form>
                <div class="auth-question">
                    <p>Dont have an account?
                        <a href="#">Sign up</a>
                    </p>
                </div>
            </div>
        </section>
    );
}