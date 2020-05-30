import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

import Loading from '../Loading/Loading';

import './updateProfile.css';

import { baseUrl } from '../../utils/constant';
import displayFlash from '../../utils/flashEvent';

const UpdateProfile = (props) => {
  const [state, setState] = useState({
    user: null,
    isUpdating: false,
  });

  useEffect(() => {
    setState({
      user: props.user.user ? { ...props.user.user } : null,
      isUpdating: false,
    });
  }, []);

  const _updateProfile = (e) => {
    setState({
      user: { ...state.user },
      isUpdating: true,
    });
    e.preventDefault();
    let data = {
      username: state.user.username,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      title: state.user.title,
      aboutMe: state.user.aboutMe,
      // phone: state.user.phone,
      address: state.user.address,
      password: state.user.password,
    };
    axios
      .put(baseUrl + '/user/update-user-detail', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            localStorage.getItem('chat_auth_token') ||
            sessionStorage.getItem('chat_auth_token')
          }`,
        },
      })
      .then((response) => {
        props.getuserFetch();
        displayFlash.emit('get-message', {
          message: response.data.message,
          type: 'success',
        });
        setState({
          user: { ...state.user },
          isUpdating: false,
        });
      })
      .catch((error) => {
        displayFlash.emit('get-message', {
          message: `${
            error.response
              ? error.response.data.message || error.response.data
              : 'Unable to connect to server, please try again later'
          }`,
          type: 'danger',
        });
        setState({
          user: props.user.user ? { ...props.user.user } : null,
          isUpdating: false,
        });
      });
  };
  return props.user.isFetching ? (
    <div className="loading-wrapper text-center m-5">
      <Loading isTrue={props.user.isFetching} />
    </div>
  ) : props.user.responseStatus === 503 ? (
    <div className="update-profile-wrapper">
      <div className="main-wrapper-error">
        <img
          src={require('../../assets/images/server_down.png')}
          alt="not found"
          width="100%"
        />
        <h3 className="text-center">{state.errMessage}</h3>
        <button
          className="main-theme-btn"
          onClick={props.getuserFetch.bind(null)}
        >
          Refresh
        </button>
      </div>
    </div>
  ) : !state.user ? null : (
    <div className="update-profile-wrapper">
      <div className="main-page-card">
        <div className="mb-5">
          <h1>Update Your Profile</h1>
        </div>
        <div className="update-box">
          <div className="form-div">
            <form onSubmit={_updateProfile}>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label className="form-label">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John"
                      name="firstName"
                      value={state.user.firstName}
                      onChange={(e) => {
                        let tempState = { ...state };
                        tempState.user[e.target.name] = e.target.value;
                        setState({ ...state });
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
                      name="lastName"
                      value={state.user.lastName}
                      onChange={(e) => {
                        let tempState = { ...state };
                        tempState.user[e.target.name] = e.target.value;
                        setState({ ...state });
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
                  value={state.user.title}
                  onChange={(e) => {
                    let tempState = { ...state };
                    tempState.user[e.target.name] = e.target.value;
                    setState({ ...state });
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
                  value={state.user.aboutMe}
                  onChange={(e) => {
                    let tempState = { ...state };
                    tempState.user[e.target.name] = e.target.value;
                    setState({ ...state });
                  }}
                ></textarea>
              </div>
              {/* <div className="form-group">
                <label className="form-label">Contact number</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  placeholder="97XXXXXX88"
                  value={state.user.phone}
                  onChange={(e) => {
                    let tempState = { ...state };
                    tempState.user[e.target.name] = e.target.value;
                    setState({ ...state });
                  }}
                />
              </div> */}
              <div className="form-group">
                <label className="form-label">Current Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="New Delhi, India"
                  value={state.user.address}
                  onChange={(e) => {
                    let tempState = { ...state };
                    tempState.user[e.target.name] = e.target.value;
                    setState({ ...state });
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
                  value={state.user.password || ''}
                  onChange={(e) => {
                    let tempState = { ...state };
                    tempState.user[e.target.name] = e.target.value;
                    setState({ ...state });
                  }}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="main-theme-btn">
                  Update Profile
                </button>
                <Loading isTrue={state.isUpdating} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
