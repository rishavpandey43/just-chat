import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading/Loading';

import './changePassword.css';

import { baseUrl } from '../../utils/constant';
const ChangePassword = (props) => {
  const [state, setState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
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
      alert('Both the new password and confirm new password should be same');
      return;
    }

    tempState.updating = true;
    setState({ ...tempState });
    axios
      .put(baseUrl + '/user/change-password', JSON.stringify(state), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.auth.authToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setState({
          updating: false,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        setState({
          updating: false,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
        toast.error(
          error.response
            ? error.response.data.errMessage || error.response.statusText
            : 'Some error occured, please try again',
          {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
  };

  return !props.user ? null : (
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
              <button type="submit" className="main-theme-btn">
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
