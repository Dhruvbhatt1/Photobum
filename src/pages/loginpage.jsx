import React, { useState, useEffect } from "react";
import "./loginpage.scss";
import mylogo from "../images/mylogo.png";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import useDataStore from "./useDataStore";
import { useUserAuth } from "../context/UserAuthContext";
import { ref, getDatabase, set } from "firebase/database";
import { updateProfile, getAuth } from "firebase/auth";
import Tabs from "./tabs";


export default function Loginpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const [selectedTab, setSelectedTab] = useState("Login");
  const labels = ["Login", "Signup"];
  const { signUp } = useUserAuth();
  const defaultPicture = "https://picsum.photos/200/300";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await logIn(email, password);

      navigate("/profilepage");

      //   const pwd = new FormData(event.target).get("pwd");
      //   const confpwd = new FormData(event.target).get("confpwd");
      //   if (confpwd === pwd) {
      //   }
    } catch (err) {
      console.log("Error");
    }
  };

  const onSelect = (tab) => {
    setSelectedTab(tab);
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      await googleSignIn().then(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        updateProfile(user, {
          displayName: user.displayName,
          defaultPicture: user.photoURL != null ? user.photoURL : defaultPicture
        }).then(() => {
          writeNewPost(user.uid, user.displayName, user.email, user.photoURL)
          navigate("/profilepage");
        }).catch((error) => {
          console.log(error);
        });
      });
    } catch (err) {
      console.log("Error");
    }
  };

  const clientId =
    "782239294150-39nu17sk486jaaqhucqb4hvt0mbop9pn.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

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
    <div className="login-page">
      <div className="login-f">
        <h4 className="headings">PhotoAlbum</h4>
        {/* <p className="quote">Keep it Simple</p> */}
        <div className="tabs-container">
          <Tabs labels={labels} selectedLabel={selectedTab} onSelect={onSelect} classname={"tabs"}/>
        </div>
        { selectedTab === "Login" ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <p className="cred-container">
                <input
                  formControlName="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </p>
            </div>
            <div className="input-group">
              <p className="cred-container">
                <input
                  formcontrolname="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </p>
            </div>
            <div className="row">
              <div>
                <button type="submit" className="buttonlogin">
                  Login
                </button>
              </div>
              <h5 className="subheadings">OR</h5>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="login-with-google-btn"
              >
                Sign in with Google
              </button>
            </div>
          </form>
        ) : (
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
              {/* <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div> */}
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
              {/* <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div> */}
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
              {/* <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div> */}
            </div>
            <div className="row">
              <div>
                <button type="submit" className="buttonlogin">Sign Up</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
