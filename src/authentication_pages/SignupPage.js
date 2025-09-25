import { useState } from "react";
import "./SignupPage.css";
import {useNavigate} from "react-router-dom";

const SignupPage=()=>{
    const [form,setForm]=useState({
        email:"",
        password:"",
        confirmpassword:""
    });
    const navigate = useNavigate();

    const API_KEY =  "AIzaSyCtwLDyIgie3wiULpZiBj8FP6cFbJ3QSqs";
    const handleChange=(event)=>{
        const{name,value}=event.target;
        setForm({...form,[name]:value});
    };

    const resetData=()=>{
        setForm({
            email:"",
            password:"",
            confirmpassword:""
        });
    };

    const handleSubmit=async (event)=>{
        event.preventDefault();
        if(form.password !==form.confirmpassword){
            console.log("Password Not Matched !");
            return;
        }try{
            const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        email:form.email,
                        password:form.password,
                        returnSecureToken:true
                    })
                }
            );
             const data = await response.json();
                if (data.error) {
                alert(data.error.message);
                return;
                }
                localStorage.setItem("idToken", data.idToken);
            console.log("User has successfully signed up.");
            navigate("/login");
            resetData();
        }catch(error){
            console.log("error");
        }
    };

    return(
        <div className=" container">
            <div className="page_body">
                <div className="layout">
                    <h3 className="head_text">SignUp</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="email"
                        id="email"
                        name="email" 
                        placeholder="Enter Email" 
                        value={form.email}
                        onChange={handleChange}
                        className="email_input"
                        required
                        />
                        <input type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter Password" 
                        value={form.password}
                        onChange={handleChange}
                        className="passinput" 
                        required
                        />
                        <input type="password" 
                        id="confirmpassword" 
                        name="confirmpassword" 
                        placeholder="Confirm Password"
                        value={form.confirmpassword}
                        onChange={handleChange}
                        className="confirmpassinput"
                        required
                        />
                        <button type="submit" className="btn">Sign Up</button>
                    </form>
                </div>
                .
            </div>
            <button type="button" className="login_btn" onClick={()=>navigate("/login")}>Have an Account? Login</button>
        </div>
    );
};
export default SignupPage;
