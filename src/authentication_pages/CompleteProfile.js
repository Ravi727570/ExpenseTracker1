import "./CompleteProfile.css";

const CompleteProfile=()=>{
    return(
        <div className="profileContainer">
            <div className="profile_layout">
                <p className="profileText">Winners never quite,Quitters never win.</p>
                <p className="profileUpdation_realtime">Your profile  . A completed profile has higher chances of landing a job.<a href="/" className="profile_text">Complete now</a></p>
            </div>
            <hr/>
            <div className=" complete_profile_headText">
                <h3 className="text">Contact Details</h3>
                <button type="button" className="cancel_btn">Cancel</button>
            </div>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="name">Profile Photo URL</label>
                <input type="text" id="name" name="name" />
                <button type="submit" className="update_btn">Update</button>
            </form>
            <hr/>
        </div>
    );
};
export default CompleteProfile;