import "./ExpensePage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ExpensePage = () => {
  const navigate = useNavigate();
  const [emailVerified, setEmailVerified] = useState(true);
  const API_KEY = "AIzaSyCtwLDyIgie3wiULpZiBj8FP6cFbJ3QSqs";
  const idToken = localStorage.getItem("idToken");

  useEffect(() => {
    const checkVerification = async () => {
      if (!idToken) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          }
        );
        const data = await response.json();
        if (data?.users?.length > 0) {
          setEmailVerified(data.users[0].emailVerified);
        }
      } catch (error) {
        console.error("error");
      }
    };
    checkVerification();
  }, [idToken, navigate]);

  const handleVerifyEmail = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        alert("Error, not valid emailid ",data.error.message);
        return;
      }
      alert("Email sent. Check your inbox.");
    } catch (error) {
      console.error("Error for send email:", error);
      alert(" wrong. Try again.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="expense_container">
      <div className="expensePage_layout">
        <p className="expense_head_text">Welcome to Expense Tracker!</p>
        <div className="btn_section">
        <p className="profile_update_text">
          Your profile is incomplete
          <span className="profile_text" onClick={() => navigate("/completeProfile")}>Complete now</span>
        </p>
        {!emailVerified && (
          <button className="verify_btn" onClick={handleVerifyEmail}>
            Verify Email
          </button>
        )}
        <button className="logout_btn" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ExpensePage;
