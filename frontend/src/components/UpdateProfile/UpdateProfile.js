import React, { useState, useEffect } from "react";
import axios from "axios";

import displayFlash from "../../utils/flashEvent";

import Loading from "../Loading/Loading";

import "./updateProfile.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const UpdateProfile = (props) => {
  useEffect(() => {
    if (props.authDetail.isAuthenticated) {
      axios
        .get(baseUrl + "user/get-user-detail", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.authDetail.token}`,
          },
          params: {
            username: `${props.authDetail.username}`,
          },
        })
        .then((response) => {
          let tempState = { ...state };
          tempState.userDetail = {
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            title: response.data.user.title,
            aboutMe: response.data.user.aboutMe,
            password: "",
          };
          setState({ ...tempState });
        })
        .catch((error) => {});
    }
  }, []);

  const [state, setState] = useState({ userDetail: null, updating: false });

  const updateProfile = (e) => {
    e.preventDefault();
    let tempState = { ...state };
    tempState.updating = true;
    setState({ ...tempState });
    let data = { ...state.userDetail };
    data.username = props.authDetail.username;

    axios
      .put(baseUrl + "user/update-user-detail", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("chat_auth_token") ||
            sessionStorage.getItem("chat_auth_token")
          }`,
        },
        withCredentials: true,
      })
      .then((response) => {
        tempState.updating = false;
        tempState.userDetail = {
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          title: response.data.user.title,
          aboutMe: response.data.user.aboutMe,
          password: "",
        };
        setState({ ...tempState });
        displayFlash.emit("get-message", {
          message: response.data.message,
          type: "success",
        });
      })
      .catch((error) => {
        tempState.updating = false;
        setState({ ...tempState });
        if (error.response) {
          displayFlash.emit("get-message", {
            message: error.response.data.message,
            type: "danger",
          });
        } else {
          displayFlash.emit("get-message", {
            message: `Network Error, Connection to server couldn't be established. Please try again.`,
            type: "danger",
          });
        }
      });
  };

  return (
    <div className="update-profile-wrapper">
      <div className="main-page-card">
        {!state.userDetail ? (
          <div className="loading-wrapper text-center m-5">
            <Loading isTrue={!state.userDetail} />
          </div>
        ) : (
          <div className="update-box">
            <div className="form-div">
              <form onSubmit={updateProfile}>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="form-label">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John"
                        required
                        name="firstName"
                        value={state.userDetail.firstName}
                        onChange={(e) => {
                          let tempState = { ...state };
                          tempState.userDetail[e.target.name] = e.target.value;
                          setState(tempState);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Doe"
                        required
                        name="lastName"
                        value={state.userDetail.lastName}
                        onChange={(e) => {
                          let tempState = { ...state };
                          tempState.userDetail[e.target.name] = e.target.value;
                          setState(tempState);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="johndoe"
                    required
                    name="newUsername"
                    minLength="5"
                    value={state.userDetail.newUsername}
                    onChange={(e) => {
                      let tempState = { ...state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      setState({ ...tempState });
                    }}
                  />
                </div> */}
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Software Engineer"
                    name="title"
                    minLength="5"
                    value={state.userDetail.title}
                    onChange={(e) => {
                      let tempState = { ...state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      setState({ ...tempState });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">About Me</label>
                  <textarea
                    className="form-control"
                    cols="20"
                    rows="10"
                    name="aboutMe"
                    maxLength="400"
                    placeholder="write under 400 words"
                    value={state.userDetail.aboutMe}
                    onChange={(e) => {
                      let tempState = { ...state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      setState({ ...tempState });
                    }}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Enter the password to proceed
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    minLength="5"
                    value={state.userDetail.password}
                    onChange={(e) => {
                      let tempState = { ...state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      setState({ ...tempState });
                    }}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn">
                    Update Profile
                  </button>
                  <Loading isTrue={state.updating} />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
