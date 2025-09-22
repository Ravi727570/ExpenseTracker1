import { useState } from "react";
import "./SignupPage.css";

const SignupPage=()=>{
    const [form,setForm]=useState({
        email:"",
        password:"",
        confirmpassword:""
    });

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

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(form.password !==form.confirmpassword){
            console.log("Password Not Matched !");
            return;
        }else{
            alert("success");
            console.log("Successfully login");
            console.log(form);
        }
        resetData();
    }
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
                <button type="submit" className="login_btn">Have an Account? Login</button>
            </div>
        </div>
    );
};
export default SignupPage;