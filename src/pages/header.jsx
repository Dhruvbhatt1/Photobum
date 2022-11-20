import React from "react";
import mylogo1 from "../images/mylogo1.png";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import useDataStore from "./useDataStore";
import { useUserAuth } from "../context/UserAuthContext";


export default function Header(props) {
  const navigate = useNavigate();
  const { logOut } = useUserAuth();
  const [changeLoginStatus, UserState, changeEditStatus, EditState] =
    useDataStore((state) => [
      state.changeLoginStatus,
      state.UserState,
      state.changeEditStatus,
      state.EditState,
    ]);
  const selectedTab = props.selectedTab;
  const onSelect = props.onSelect;
  const navigateToLogin = async (event) => {
    event.preventDefault();
    try {
      await logOut().then(() => {
        navigate("/");
      });
    } catch (err) {
      console.log("Error");
    }
  };
  // if(UserState === false){
  //     navigate('/');
  // }

  const updateEditStatus = (status) => {
    changeEditStatus(status);
  };

  return (
    <div className="Title">
      <div className="buttons">
        {/* {EditState ? (
          <button
            className="editprofilebtn"
            onClick={() => updateEditStatus(false)}
          >
            Save Profile
          </button>
        ) : (
          <button
            className="editprofilebtn"
            onClick={() => updateEditStatus(true)}
          >
            Edit Profile
          </button>
        )} */}
        <button className={selectedTab == "MyProfile" ? "buttonlogin is-active" : "buttonlogin not-active"} onClick={() => onSelect("MyProfile")}>
          Profile
        </button>
        <button className={selectedTab == "To-Do" ? "buttonlogin is-active" : "buttonlogin not-active"} onClick={() => onSelect("To-Do")}>
          To-Do List
        </button>
        <button className={selectedTab == "Photo-Album" ? "buttonlogin is-active" : "buttonlogin not-active"} onClick={() => onSelect("Photo-Album")}>
          Photo Album
        </button>
        <button className="buttonlogin" onClick={navigateToLogin}>
          Log Out
        </button>
      </div>
    </div>
  );
}
