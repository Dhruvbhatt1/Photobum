import React, { useEffect, useState } from "react";
import Header from "./header.jsx";
import "./loginpage.scss";
import useDataStore from "./useDataStore.js";
import Card from "react-bootstrap/Card";
import { updateProfile, getAuth } from "firebase/auth";
import { getDatabaseS, onValue} from "firebase/database";
import { ref, getDatabase, child, push, update, set } from "firebase/database";
import Tabs from "./tabs";
import TodoList from "./TodoList.js";
import PhotoAlbumList from "./photoalbumlist.jsx";

export default function Profilepage() {
  const [
    EditState,
    saveUserName,
    saveUserEmail,
    saveUserPhone,
    saveUserBio,
    saveUserPic,
    changeEditStatus,
    UserName,
    UserEmail,
    UserPhone,
    UserBio,
    UserPic,
  ] = useDataStore((state) => [
    state.EditState,
    state.saveUserName,
    state.saveUserEmail,
    state.saveUserPhone,
    state.saveUserBio,
    state.saveUserPic,
    state.changeEditStatus,
    state.UserName,
    state.UserEmail,
    state.UserPhone,
    state.UserBio,
    state.UserPic
  ]);
  const [selectedTab, setSelectedTab] = useState("MyProfile");
  const [userInfo, updateUserInfo] = useState("");
  const [isSidebarOn, setSidebarStatus] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const defaultPicture = "https://picsum.photos/200/300";
  useEffect(() => {
    onValue(ref(db, 'User/'+user.uid), (snapshot) => {
      updateUserInfo(snapshot.val());
    });
  }, [user])
  
  const updateEditStatus = (status) => {
    if(status == false){
      updateData(UserName, UserEmail, UserPic, UserBio, UserPhone)
    }
    changeEditStatus(status);
  };

  const updateName = (event) => {
    saveUserName(event.target.value);
  };
  const updateEmail = (event) => {
    saveUserEmail(event.target.value);
  };
  const updatePhone = (event) => {
    saveUserPhone(event.target.value);
  };
  const updateBio = (event) => {
    saveUserBio(event.target.value);
  };
  const updatePic = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // Base64 Data URL 👇
      console.log(reader.result);
      saveUserPic(reader.result);
    });

    reader.readAsDataURL(file);
  };

  const labels = ["MyProfile", "To-Do", "Photo-Album"];
  const onSelect = (tab) => {
    setSelectedTab(tab);
  }
  function updateData(username, email, picture, bio, phone) {
    if(username == null){
      username = userInfo.UserName
    }
    if(email == null){
      email = userInfo.email
    }
    if(picture == null){
      picture = defaultPicture
    }
    const db = getDatabase();   
    return update(ref(db, "User/"+user.uid), {
      UserName: username,
      email: email,
      bio: bio,
      phoneNumber: phone,
      ProfilePicture: picture,
    });
  }

  return user ? (
    <div className={isSidebarOn == true ? "sidebar-profile-page" : "profile-page"} >
      { isSidebarOn === true ? (
        <div className="sidebar-group">
          <div className="sidebar-container">
            <button className="sidebar-button" onClick={() => setSidebarStatus(false)}>&#9776;</button>
            <Header selectedTab={selectedTab} onSelect={onSelect} />
          </div>
          <div className="sidebar-mask" onClick={() => setSidebarStatus(false)}></div>
          {EditState ? (
            <button
              className="editprofilebtn"
              onClick={() => updateEditStatus(false)}
            >
              <i class="fa fa-floppy-o fa-2x" aria-hidden="true"></i>
            </button>
          ) : (
            <div>
              {selectedTab == labels[0] ? (
                <button
                  className="editprofilebtn"
                  onClick={() => updateEditStatus(true)}
                >
                  <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                </button>
              ) : (
                <div>

                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <button className="sidebar-button" onClick={() => setSidebarStatus(true)}>&#9776;</button>
          {EditState ? (
            <button
              className="editprofilebtn"
              onClick={() => updateEditStatus(false)}
            >
              <i class="fa fa-floppy-o fa-2x" aria-hidden="true"></i>
            </button>
          ) : (
            <div>
              {selectedTab == labels[0] ? (
                <button
                  className="editprofilebtn"
                  onClick={() => updateEditStatus(true)}
                >
                  <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                </button>
              ) : (
                <div>

                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className={isSidebarOn == true ? "sidebar-profile" : "profile-body-container"}>
        <div className="profile-body">
          <div className="card-container">
            {selectedTab == labels[0] ? (
              <div className="card-container">
                <Card className="imgclass">
                  {EditState ? (
                    <div>
                      <label htmlFor="upload-img">
                        <img src={userInfo.ProfilePicture} className="mypic" alt="" />
                      </label>
                      <input id="upload-img" type="file" accept="image/*" placeholder="" onChange={updatePic} className="getImg" />
                    </div>
                  ) : (
                    <Card.Img variant="left" src={userInfo.ProfilePicture} className="mypic" />
                  )}
                </Card>
                <Card className="bodyclass">
                  <Card.Body>
                    <Card.Text>
                      {EditState ? (
                        <>
                          <p className="mypara-edit">
                            <input type="text" placeholder="Enter full name" onChange={updateName} />
                          </p>
                          <p className="mypara-edit">
                            <input type="email" placeholder="Enter new email" onChange={updateEmail} />
                          </p>
                          <p className="mypara-edit">
                            <input type="tel" placeholder="Enter phone number" onChange={updatePhone} />
                          </p>
                          <p className="mypara-edit">
                            <textarea type="text" resize="none" placeholder="Enter your bio" onChange={updateBio} />
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="mypara">
                            {userInfo.UserName}
                          </p>
                          <p className="mypara">
                            <b>Email ID:</b>&nbsp;
                            {userInfo.email}
                          </p>
                          <p className="mypara">
                            <b>Phone Number:</b>&nbsp;
                            {userInfo.phoneNumber}
                          </p>
                          <p className="mypara">
                            <b>Bio:</b>&nbsp;
                            {userInfo.bio}
                          </p>
                        </>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ) : (
              <div>
                {selectedTab == labels[1] ? (
                  <div>
                    <TodoList />
                  </div>
                ) : (
                  <div>
                    <PhotoAlbumList />
                  </div>
                )}
              </div>
            ) }
          </div>
        </div>
      </div>
      {/* {EditState ? (
        <button
          className="editprofilebtn"
          onClick={() => updateEditStatus(false)}
        >
          <i class="fa fa-floppy-o fa-2x" aria-hidden="true"></i>
        </button>
      ) : (
        <button
          className="editprofilebtn"
          onClick={() => updateEditStatus(true)}
        >
          <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
        </button>
      )} */}
    </div>
  ) : (
    <div>
      <p>Error occured please go back and login again. Sorry for the inconvenience. </p>
    </div>
  );
}
