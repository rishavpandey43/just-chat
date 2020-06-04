import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaHome, FaUser } from 'react-icons/fa';
import { FiPhone, FiMail } from 'react-icons/fi';

import Loading from '../Loading/Loading';

import './profile.css';

import { baseUrl } from '../../utils/constant';
import displayFlash from '../../utils/flashEvent';

const Profile = (props) => {
  const [state, setState] = useState({
    user: props.user.user ? { ...props.user.user } : null,
    isFetching: false,
    isLoading1: false,
    isLoading2: false,
    errMessage: props.user.errMessage,
  });

  useEffect(() => {
    let tempState = { ...state };
    if (props.user.user) {
      if (props.user.user.username !== props.match.params.username) {
        tempState.isFetching = true;
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
            tempState.isFetching = false;
            setState({ ...tempState });
          })
          .catch((error) => {
            tempState.user = null;
            tempState.errMessage = error.response
              ? error.response.data.errMessage || error.response.statusText
              : 'Some error occured, please try again';
            tempState.isFetching = false;
            setState({ ...tempState });
          });
      } else {
        tempState.user = props.user.user ? { ...props.user.user } : null;
        setState({ ...tempState });
      }
    }
  }, []);

  const _friendRequestAction = (endPoint, loading) => {
    let tempState = { ...state };
    tempState[loading] = true;
    setState({ ...tempState });
    axios
      .post(
        baseUrl + endPoint,
        { userId: state.user._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.auth.token}`,
          },
        }
      )
      .then((response) => {
        props.getuserFetch();
        tempState.user = { ...response.data.user };
        tempState[loading] = false;
        setState({ ...tempState });
        displayFlash.emit('get-message', {
          message: response.data.message,
          type: 'success',
        });
      })
      .catch((error) => {
        tempState.errMessage = error.response
          ? error.response.data.errMessage || error.response.statusText
          : 'Some error occured, please try again';
        tempState[loading] = false;
        setState({ ...tempState });
        displayFlash.emit('get-message', {
          message: error.response
            ? error.response.data.errMessage || error.response.statusText
            : 'Some error occured, please try again',
          type: 'error',
        });
      });
  };

  return props.user.isFetching || state.isFetching ? (
    <div className="loading-wrapper text-center m-5">
      <Loading isTrue={props.user.isFetching || state.isFetching} />
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
                <div className="user-name">
                  <h3>{`${state.user.firstName} ${state.user.lastName} ${
                    state.user._id === props.auth.userId ? '(You)' : ''
                  }`}</h3>
                  <span>{state.user.title}</span>
                </div>
                {state.user._id === props.auth.userId ? (
                  ''
                ) : (
                  <div className="action-btn mt-5">
                    {props.user.user.receivedFriendRequest.filter(
                      (friend) => friend._id === state.user._id
                    )[0] ? (
                      <>
                        <div>
                          <button
                            className="btn"
                            onClick={_friendRequestAction.bind(
                              null,
                              '/user/accept-friend-request',
                              'isLoading1'
                            )}
                          >
                            Accept Friend Request
                          </button>
                          <Loading isTrue={state.isLoading1} />
                        </div>
                        <div className="mt-3">
                          <button
                            className="btn"
                            onClick={_friendRequestAction.bind(
                              null,
                              '/user/reject-friend-request',
                              'isLoading2'
                            )}
                          >
                            Reject Friend Request
                          </button>
                          <Loading isTrue={state.isLoading2} />
                        </div>
                      </>
                    ) : !props.user.user.friendList.filter(
                        (friend) => friend._id === state.user._id
                      )[0] ? (
                      !props.user.user.sentFriendRequest.filter(
                        (friend) => friend._id === state.user._id
                      )[0] ? (
                        <div>
                          <button
                            className="btn"
                            onClick={_friendRequestAction.bind(
                              null,
                              '/user/send-friend-request',
                              'isLoading1'
                            )}
                          >
                            Send Friend Request
                          </button>
                          <Loading isTrue={state.isLoading1} />
                        </div>
                      ) : (
                        <div>
                          <button
                            className="btn"
                            onClick={_friendRequestAction.bind(
                              null,
                              '/user/cancel-friend-request',
                              'isLoading1'
                            )}
                          >
                            Cancel Friend Request
                          </button>
                          <Loading isTrue={state.isLoading1} />
                        </div>
                      )
                    ) : null}

                    {props.user.user.friendList.filter(
                      (friend) => friend._id === state.user._id
                    )[0] ? (
                      <div className="row mt-4">
                        <div className="col-6">
                          <div className="send-message">
                            <button className="btn">Send Message</button>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="unfriend">
                            <button
                              className="btn"
                              onClick={_friendRequestAction.bind(
                                null,
                                '/user/unfriend',
                                'isLoading1'
                              )}
                            >
                              Unfriend
                            </button>
                            <Loading isTrue={state.isLoading1} />
                          </div>
                        </div>
                      </div>
                    ) : null}
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
                    state.user.contactNum ? 'd-flex' : 'd-none'
                  }`}
                >
                  <div className="icon-wrapper">
                    <span className="mr-3">
                      <FiPhone className="fa-colored-icon" />
                    </span>
                  </div>
                  <div className="text-wrapper">
                    <span className="">{state.user.contactNum}</span>
                  </div>
                </li>
                <li
                  className={`info-list ${
                    state.user.email ? 'd-flex' : 'd-none'
                  }`}
                >
                  <div className="icon-wrapper">
                    <span className="mr-3">
                      <FiMail className="fa-colored-icon" />
                    </span>
                  </div>
                  <div className="text-wrapper">
                    <span className="">{state.user.email}</span>
                  </div>
                </li>
                <li
                  className={`info-list ${
                    state.user.address ? 'd-flex' : 'd-none'
                  }`}
                >
                  <div className="icon-wrapper">
                    <span className="mr-3">
                      <FaHome className="fa-colored-icon" />
                    </span>
                  </div>
                  <div className="text-wrapper">
                    <span className="">{state.user.address}</span>
                  </div>
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
        <input type="text-wrapper" className="input" placeholder="search" required />
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
