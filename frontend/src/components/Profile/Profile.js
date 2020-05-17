import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FaHome, FaUser } from 'react-icons/fa';
import { FiPhone, FiMail } from 'react-icons/fi';

import Loading from '../Loading/Loading';

import './profile.css';

import { baseUrl } from '../../utils/constant';

const Profile = (props) => {
  const [state, setState] = useState({
    user: props.user.user ? { ...props.user.user } : null,
    isLoading: false,
    errMessage: props.user.errMessage,
  });

  useEffect(() => {
    let tempState = { ...state };
    if (props.user.user) {
      if (props.user.user.username !== props.match.params.username) {
        tempState.isLoading = true;
        setState({ ...tempState });
        axios
          .get(baseUrl + '/user/get-user-detail', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${props.auth.token}`,
            },
            params: {
              username: `${props.match.params.username}`,
            },
          })
          .then((response) => {
            tempState.user = { ...response.data.user };
            tempState.isLoading = false;
            setState({ ...tempState });
          })
          .catch((error) => {
            tempState.user = null;
            tempState.errMessage = error.response
              ? error.response.data.errMessage || error.response.statusText
              : 'Some error occured, please try again';
            tempState.isLoading = false;
            setState({ ...tempState });
          });
      } else {
        tempState.user = props.user.user ? { ...props.user.user } : null;
        setState({ ...tempState });
      }
    }
  }, []);

  return props.user.isFetching || state.isLoading ? (
    <div className="loading-wrapper text-center m-5">
      <Loading isTrue={props.user.isFetching || state.isLoading} />
    </div>
  ) : props.user.responseStatus === 503 ? (
    <div className="profile-wrapper">
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
  ) : !state.user ? (
    <div className="profile-wrapper">
      <div className="main-wrapper-error">
        <img
          src={require('../../assets/images/profile_not_found.png')}
          alt="not found"
          width="100%"
        />
        <h3 className="text-center">{state.errMessage}</h3>
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
                  <h3>{`${state.user.firstName} ${state.user.lastName} ${
                    state.user._id === props.auth.userId ? '(You)' : ''
                  }`}</h3>
                  <span>{state.user.title}</span>
                </div>
                {state.user._id === props.auth.userId ? (
                  ''
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
                  src={require('../../assets/images/profile_pic.png')}
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
            className={`about-me ${state.user.aboutMe ? 'd-block' : 'd-none'}`}
          >
            <div className="heading">
              <h3>
                <FaUser className="fa-colored-icon" />
                <span className="pl-3">About Me</span>
              </h3>
            </div>
            <div className="content">
              <p>{state.user.aboutMe}</p>
            </div>
          </div>
          <div className="personal-info">
            <div className="heading">
              <h3>Personal Information</h3>
            </div>
            <div className="content">
              <ul>
                <li
                  className={`info-list ${
                    state.user.contactNum ? 'd-block' : 'd-none'
                  }`}
                >
                  <span className="icon">
                    <FiPhone className="fa-colored-icon" />
                  </span>
                  <span className="text">{state.user.contactNum}</span>
                </li>
                <li
                  className={`info-list ${
                    state.user.email ? 'd-block' : 'd-none'
                  }`}
                >
                  <span className="icon">
                    <FiMail className="fa-colored-icon" />
                  </span>
                  <span className="text">{state.user.email}</span>
                </li>
                <li
                  className={`info-list ${
                    state.user.address ? 'd-block' : 'd-none'
                  }`}
                >
                  <span className="icon">
                    <FaHome className="fa-colored-icon" />
                  </span>
                  <span className="text">{state.user.address}</span>
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
