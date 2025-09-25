import "./CompleteProfile.css";
import {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

const CompleteProfile=({idToken})=>{
    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    const navigate = useNavigate();
    const API_KEY =  "AIzaSyCtwLDyIgie3wiULpZiBj8FP6cFbJ3QSqs";
    const storedToken = localStorage.getItem("idToken")
    console.log("storedToken:", storedToken);
    useEffect(() => {
  const fetchProfile = async () => {
    if (!storedToken){
    navigate("/login");
    return;
  }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: storedToken }),
        }
      );

      const data = await response.json();
      console.log("Fetched profile:", data);

      if (data && data.users && data.users.length > 0) {
        const user = data.users[0];
        setName(user.displayName || "");
        setPhotoUrl(user.photoUrl || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();
}, [storedToken,navigate]);


  const resetdata = () => {
    setName("");
    setPhotoUrl("");
  };

  const handleCancel = () => {
    navigate("/expensePage");
  };

  const handleUpdate = async (event) => {
  event.preventDefault();

  try {
    const body = { idToken: storedToken, returnSecureToken: true };
    if (name) body.displayName = name;
    if (photoUrl) body.photoUrl = photoUrl;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log("Update response:", data);

    if (data.error) {
      alert("Error updating profile: " + data.error.message);
      return;
    }

    if (data.idToken) localStorage.setItem("idToken", data.idToken);
    alert("Profile updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Error updating profile.");
  }
};


    return(
        <div className="profileContainer">
            <div className="profile_layout">
                <p className="profileText">Winners never quite,Quitters never win.</p>
                <p className="profileUpdation_realtime">Your profile  . A completed profile has higher chances of landing a job.<a href="/" className="profile_text">Complete now</a></p>
            </div>
            <hr/>
            <div className=" complete_profile_headText">
                <h3 className="text">Contact Details</h3>
                <button type="button" className="cancel_btn" onClick={handleCancel}>Cancel</button>
            </div>
            <div className="formDetails">
                <form onSubmit={handleUpdate}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" className="input" value={name} onChange={(event)=>setName(event.target.value)} />
                    <label htmlFor="photo">Profile Photo URL</label>
                    <input type="text" id="photo" name="photo" className="input"value={photoUrl} onChange={(event)=>setPhotoUrl(event.target.value)} />
                    <button type="submit" className="update_btn">Update</button>
                    <hr/>
                </form>
            </div>
        </div>
    );
};
export default CompleteProfile;
