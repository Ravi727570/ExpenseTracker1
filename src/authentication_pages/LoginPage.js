import "./LoginPage.css";

const LoginPage=()=>{
    return(
        <div className="container">.
            <div className="page_body">
                <div className="layout">
                    <h3 className="head_text">Login</h3>
                    <form >
                        <input type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="email_field"
                        required
                        />
                        <input type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="password_field"
                        required
                        />
                        <div className="btn">.
                        <button type="submit" className="login_btn">Login</button>
                        <a href="/" className="forgot_link">Forgot Password</a>
                        </div>
                    </form>
                </div>
            </div>
            <button type="submit" className="Signup_button">Don't have an Account?Sign up</button>
        </div>
    );
};
export default LoginPage;