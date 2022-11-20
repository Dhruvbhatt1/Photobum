import React, { useState } from "react";
import "./loginpage.scss";
import mylogo from "../images/mylogo.png";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { updateProfile, getAuth } from "firebase/auth";
import { ref, getDatabase, child, push, update, set } from "firebase/database";
import { database } from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const defaultPicture = "https://picsum.photos/200/300";

  function writeNewPost(uid, username, email, picture) {
    const db = getDatabase();   
  
    return set(ref(db, "User/"+uid), {
      UserName: username,
      email: email,
      bio: null,
      phoneNumber: null,
      ProfilePicture: picture,
    });
  }

  const onRegister = async (event) => {
    event.preventDefault();
    const userName = (new FormData(event.target).get("userName")); 
    console.log(userName);
    try {
      await signUp(email, password).then(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        updateProfile(user, {
          displayName: userName
        }).then(() => {
          writeNewPost(user.uid, user.displayName, user.email, defaultPicture)
          navigate("/profilepage");
        }).catch((error) => {
          console.log(error);
        });

      });
    } catch (err) {
      console.log("Error");
    }
  };

  return (
    <div className="register-page">
      <div className="leftside">
        <img src={mylogo} alt="" className="mylogo" />
      </div>
      <div className="register-f">
        <h4 className="headings">Register New Account</h4>
        <form className="register-form" onSubmit={onRegister}>
          <div className="input-group2">
            <input
              formcontrolname="userName"
              name="userName"
              type="text"
              className="userName"
              placeholder="User Name"
              required
            />
          </div>
          <div className="input-group">
            <input
              formcontrolname="email"
              type="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div className="input-group">
            <input
              name="pwd"
              formcontrolname="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div className="input-group">
            <input
              name="confpwd"
              formcontrolname="password"
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              required
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div>
              <button type="submit" className="buttonsignup">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
