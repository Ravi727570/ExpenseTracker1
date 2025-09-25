import { useState } from "react";
import "./LoginPage.css";
import {useNavigate} from "react-router-dom";

const LoginPage=()=>{
    const [form ,setForm]=useState({
        email:"",
        password:""
    });
    const navigate = useNavigate();

    const API_KEY =  "AIzaSyCtwLDyIgie3wiULpZiBj8FP6cFbJ3QSqs";
    const handleChange=(event)=>{
        const{name,value}=event.target;
        setForm({...form,[name]:value});
    };

    const handleSubmit=async(event)=>{
        event.preventDefault();
        try{
            const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    returnSecureToken: true
                    })
                }
                );
            const data=await response.json()
            if(!data){
                alert("No data, please signup first");
                return;
                }
                alert("login success");
                localStorage.setItem("idToken", data.idToken);
                localStorage.setItem("userEmail", form.email);
                navigate("/expensePage");
        }catch(error){
            console.log("error");
        }
    };

    return(
        <div className="container">.
            <div className="page_body">
                <div className="login_layout">
                    <h3 className="head_text">Login</h3>
                    <form onSubmit={handleSubmit} >
                        <input type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="email_field"
                        required
                        />
                        <input type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="password_field"
                        required
                        />
                        <button type="submit" className="loginPage_btn">Login</button>
                        <a href="/" className="forgot_link">Forgot Password</a>
                    </form>
                </div>
            </div>
            <button type="button" className="Signup_button" onClick={()=>navigate("/signup")}>Don't have an Account?Sign up</button>
        </div>
    );
};
export default LoginPage;
