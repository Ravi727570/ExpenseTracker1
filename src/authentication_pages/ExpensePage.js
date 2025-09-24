import "./ExpensePage.css";
import { useNavigate } from "react-router-dom";

const ExpensePage=()=>{
    const navigate = useNavigate();
    return (
        <div className="expense_container">
            <div className="expensePage_layout">
                <p className=" expense_head_text">Welcome to Expense Tracker!</p>
                <p className="profile_update_text">Your profile is incomplete<a href="/" className="profile_text" onClick={()=>navigate("/completeProfile")}>Complete now</a></p>
            </div>
            <hr/>
        </div>
    );
};
export default ExpensePage;