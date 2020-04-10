import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

import displayFlash from "../../utils/flashEvent";

import Loading from "../Loading/Loading";

import "./updateProfile.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const UpdateProfile = (props) => {
  const [state, setState] = useState({
    userDetail: null,
    updating: false,
    notFetched: false,
  });

  useEffect(() => {
    if (props.authDetail.isAuthenticated) {
      let tempState = { ...state };
      setState({ ...tempState });
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
          tempState.notFetched = false;
          tempState.userDetail = {
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            title: response.data.user.title,
            aboutMe: response.data.user.aboutMe,
            dob: moment(response.data.user.dob).toDate(),
            contactNum: response.data.user.contactNum,
            address: response.data.user.address,
            password: "",
          };
          setState({ ...tempState });
        })
        .catch((error) => {
          tempState.notFetched = true;
          setState({ ...tempState });
          displayFlash.emit("get-message", {
            message: `Network Error, Connection to server couldn't be established. Please try again.`,
            type: "danger",
          });
        });
    }
  }, []);

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
          dob: moment(response.data.user.dob).toDate(),
          contactNum: response.data.user.contactNum,
          address: response.data.user.address,
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
          console.log(error.response);
          displayFlash.emit("get-message", {
            message:
              error.response.data.message ||
              "password incorrect, try with valid password",
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
        {!state.userDetail || state.notFetched ? (
          <div className="loading-wrapper text-center m-5">
            <Loading isTrue={!state.userDetail} />
            <div className={`${state.notFetched ? "mt-5 d-block" : "d-none"}`}>
              <span>Unable to fetch detail, please try again</span>
            </div>
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
                    minLength="50"
                    maxLength="400"
                    placeholder="write under min 50 and max 400 words"
                    value={state.userDetail.aboutMe}
                    onChange={(e) => {
                      let tempState = { ...state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      setState({ ...tempState });
                    }}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <DatePicker
                    dateFormat={moment(state.userDetail.dob).format(
                      "DD/MM/YYYY"
                    )}
                    selected={state.userDetail.dob}
                    onChange={(date) => {
                      console.log(date);
                      let tempState = { ...state };
                      tempState.userDetail.dob = date;
                      setState(tempState);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="contactNum"
                    required
                    minLength="5"
                    placeholder="+91-97XXXXXX88"
                    value={state.userDetail.contactNum}
                    onChange={(e) => {
                      let tempState = { ...state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      setState({ ...tempState });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Current Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    required
                    placeholder="New Delhi, India"
                    value={state.userDetail.address}
                    onChange={(e) => {
                      let tempState = { ...state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      setState({ ...tempState });
                    }}
                  />
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
