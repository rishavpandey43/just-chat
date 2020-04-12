import React, { useState } from "react";
import axios from "axios";

import displayFlash from "../../utils/flashEvent";

import Loading from "../Loading/Loading";

import "./changePassword.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const ChangePassword = () => {
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    updating: false,
  });

  const updatePassword = (e) => {
    e.preventDefault();
    let tempState = { ...state };

    if (tempState.newPassword === tempState.currentPassword) {
      alert("Please don't use existing password as a new password");
      return;
    }

    if (tempState.newPassword !== tempState.confirmNewPassword) {
      alert("Both the new password and confirm new password should be same");
      return;
    }

    tempState.updating = true;
    setState({ ...tempState });
    axios
      .put(baseUrl + "user/change-password", JSON.stringify(state), {
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
        setState({
          updating: false,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        displayFlash.emit("get-message", {
          message: response.data.message,
          type: "success",
        });
      })
      .catch((error) => {
        setState({
          updating: false,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        if (error.response) {
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
    <div className="change-password-wrapper">
      <div className="main-page-card">
        <div className="heading">
          <h3>Change Password</h3>
        </div>
        <div className="form-div">
          <form onSubmit={updatePassword}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-control"
                required
                minLength="8"
                name="currentPassword"
                value={state.currentPassword}
                onChange={(e) => {
                  let tempState = { ...state };
                  tempState[e.target.name] = e.target.value;
                  setState(tempState);
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                required
                minLength="8"
                name="newPassword"
                value={state.newPassword}
                onChange={(e) => {
                  let tempState = { ...state };
                  tempState[e.target.name] = e.target.value;
                  setState(tempState);
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                required
                minLength="8"
                name="confirmNewPassword"
                value={state.confirmNewPassword}
                onChange={(e) => {
                  let tempState = { ...state };
                  tempState[e.target.name] = e.target.value;
                  setState(tempState);
                }}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn">
                Update New Password
              </button>
              <Loading isTrue={state.updating} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
