import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaRegCalendarAlt, FaHome, FaUser } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";

import Loading from "../Loading/Loading";

import "./profile.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Profile = (props) => {
  const [state, setState] = useState({
    userDetail: { ...props.userDetail.user },
    isLoading: false,
    errMessage: "",
  });

  useEffect(() => {
    let tempState = { ...state };
    if (props.userDetail.user) {
      if (props.userDetail.user.username !== props.match.params.username) {
        tempState.isLoading = true;
        setState({ ...tempState });
        axios
          .get(baseUrl + "user/get-user-detail", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.authDetail.token}`,
            },
            params: {
              username: `${props.match.params.username}`,
            },
          })
          .then((response) => {
            tempState.userDetail = { ...response.data.user };
            tempState.isLoading = false;
            setState({ ...tempState });
          })
          .catch((error) => {
            tempState.userDetail = null;
            tempState.errMessage = error.response.data.message || "";
            tempState.isLoading = false;
            setState({ ...tempState });
          });
      } else {
        tempState.userDetail = { ...props.userDetail.user };
        setState({ ...tempState });
      }
    }
  }, []);

  return props.userDetail.isLoading || state.isLoading ? (
    <div className="loading-wrapper text-center m-5">
      <Loading isTrue={props.userDetail.isLoading || state.isLoading} />
    </div>
  ) : !state.userDetail ? (
    <div className="profile-wrapper">
      <div className="not-found-error">
        <img
          src={require("../../assets/images/profile_not_found.png")}
          alt="not found"
          width="100%"
        />
        <h3>{state.errMessage}</h3>
      </div>
    </div>
  ) : (
    <div className="profile-wrapper">
      <div className="main-page-card">
        <div className="general-info-wrapper">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="profile-detail">
                <div className="name">
                  <h3>{`${state.userDetail.firstName} ${state.userDetail.lastName}`}</h3>
                  <span>{`${state.userDetail.title}`}</span>
                </div>
                {state.userDetail._id === props.authDetail.userId ? (
                  ""
                ) : (
                  <div className="action-btn mt-5">
                    <div className="add-friend">
                      <button className="btn">Add Friend</button>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div className="send-message">
                          <button className="btn">Send Message</button>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="unfriend">
                          <button className="btn"> Unfriend</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="profile-photo">
                <img
                  src={require("../../assets/images/profile_pic.png")}
                  alt=""
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-page-card">
        <div className="personal-info-wrapper">
          <div
            className={`${
              state.userDetail.aboutMe ? "about-me d-block" : "about-me d-none"
            }`}
          >
            <div className="heading">
              <h3>
                <FaUser className="fa-colored-icon" />
                <span className="pl-3">About Me</span>
              </h3>
            </div>
            <div className="content">
              <p>{state.userDetail.aboutMe}</p>
            </div>
          </div>
          <div className="personal-info">
            <div className="heading">
              <h3>Personal Information</h3>
            </div>
            <div className="content">
              <ul>
                <li className="info-list">
                  <span className="icon">
                    <FiPhone className="fa-colored-icon" />
                  </span>
                  <span className="text">{state.userDetail.contactNum}</span>
                </li>
                <li className="info-list">
                  <span className="icon">
                    <FiMail className="fa-colored-icon" />
                  </span>
                  <span className="text">{state.userDetail.email}</span>
                </li>
                <li className="info-list">
                  <span className="icon">
                    <FaHome className="fa-colored-icon" />
                  </span>
                  <span className="text">{state.userDetail.address}</span>
                </li>
              </ul>
            </div>
            <div className="social-link"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="search-bar-wrapper">
  <form>
    <div className="search-bar">
      <div className="search-input">
        <input type="text" className="input" placeholder="search" required />
      </div>
      <div className="search-btn">
        <button className="btn">
          <MdSearch />
        </button>
      </div>
    </div>
  </form>
</div>; */
}

export default Profile;
