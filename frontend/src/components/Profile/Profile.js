import React, { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../Loading/Loading";

import "./profile.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Profile = props => {
  useEffect(() => {
    if (props.authDetail.isAuthenticated) {
      axios
        .get(baseUrl + "user/get-user-detail", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.authDetail.token}`
          },
          params: {
            username: `${props.match.params.username}`
          }
        })
        .then(response => {
          const userDetail = {
            userId: response.data.user._id,
            username: response.data.user.username,
            email: response.data.user.email,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName
          };
          let tempState = { ...state };
          tempState.userDetail = { ...userDetail };
          setState(tempState);
        })
        .catch(error => {
          console.log(error.response);
          props.logoutFetch();
        });
    }
  }, []);

  const [state, setState] = useState({
    authUserId: props.authDetail.userId,
    userDetail: null
  });
  return !state.userDetail ? (
    <div className="container">
      <div style={{ margin: "auto", width: "80px", marginTop: "50px" }}>
        <Loading isTrue={!state.userDetail} />
      </div>
    </div>
  ) : (
    <div className="profile-wrapper">
      <div className="container">
        <div className="main-wrapper">
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="profile-container">
                <div className="card">
                  <div className="card-head">
                    <h3>
                      {state.userDetail
                        ? state.authUserId === state.userDetail.userId
                          ? `Your Profile`
                          : `${state.userDetail.firstName} ${state.userDetail.lastName}'s Profile`
                        : "Your Profile"}
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="short-summary">
                      <div className="user-img">
                        <img
                          src={require("../../assets/images/user.png")}
                          alt="user-img"
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="user-name">
                        <h3>
                          {state.userDetail
                            ? `${state.userDetail.firstName} ${state.userDetail.lastName}`
                            : ``}
                        </h3>
                      </div>
                    </div>
                    <div className="detail-summery">
                      <div className="heading">
                        <h3>About</h3>
                      </div>
                      <div className="content">
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="label">
                              <label>Username:</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="value">
                              {state.userDetail
                                ? `${state.userDetail.username}`
                                : ``}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="label">
                              <label>Name:</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="value">
                              {state.userDetail
                                ? `${state.userDetail.firstName} ${state.userDetail.lastName}`
                                : ``}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="label">
                              <label>Email:</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="value">
                              {state.userDetail
                                ? `${state.userDetail.email}`
                                : ``}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div
                className={`service-container ${
                  state.authUserId === state.userDetail.userId
                    ? "d-block"
                    : "d-none"
                }`}
              >
                <div className="card">
                  <div className="card-head">
                    <h3>Say Hello!</h3>
                  </div>
                  <div className="card-body">
                    <div className="service-btn">
                      <div className="create-room-btn">
                        <button className="btn btn-primary">
                          Create Group
                        </button>
                      </div>
                      <div className="join-room-btn">
                        <button className="btn btn-primary">Join Group</button>
                      </div>
                    </div>
                    <div className="service">
                      <div className="create-group-form">
                        <form action=""></form>
                      </div>
                      <div className="join-group-form">
                        <form>
                          <div className="form-group">
                            <label>Group</label>
                            <input type="text" className="form-control" />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Create Group
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Join Group
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
