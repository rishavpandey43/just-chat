import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { FaHome, FaUser } from 'react-icons/fa';
import { FiPhone, FiMail } from 'react-icons/fi';

import Loading from '../../components/Loading/Loading';

import './profile.css';

import { baseUrl } from '../../utils/constant';

const Profile = ({ auth, user, match, getUserSuccess, logoutFetch }) => {
  const [state, setState] = useState({
    user: user.user ? { ...user.user } : null,
    isFetching: false,
    isLoading1: false,
    isLoading2: false,
    profileErrMessage: user.errMessage,
    errMessage: '',
  });

  useEffect(() => {
    let tempState = {
      user: user.user ? { ...user.user } : null,
      isFetching: false,
      isLoading1: false,
      isLoading2: false,
      profileErrMessage: user.errMessage,
    };
    if (user.user) {
      if (user.user.username !== match.params.username) {
        tempState.isFetching = true;
        setState({ ...tempState });
        axios
          .get(baseUrl + '/user/get-user-detail', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.authToken}`,
            },
            params: {
              username: `${match.params.username}`,
            },
          })
          .then((response) => {
            tempState.user = { ...response.data.user };
            tempState.isFetching = false;
            setState({ ...tempState });
          })
          .catch((error) => {
            if (
              error.response &&
              (error.response.status === 401 ||
                error.response.statusText === 'Unauthorized')
            ) {
              logoutFetch();
            } else {
              tempState.user = null;
              tempState.profileErrMessage = error.response
                ? error.response.data.errMessage || error.response.statusText
                : 'Some error occured, please try again';
              tempState.isFetching = false;
              setState({ ...tempState });
            }
          });
      } else {
        tempState.user = user.user ? { ...user.user } : null;
        setState({ ...tempState });
      }
    }
  }, [
    auth.authToken,
    logoutFetch,
    match.params.username,
    user.user,
    user.errMessage,
  ]);

  const _friendRequestAction = (endPoint, loading) => {
    if (endPoint === '/user/unfriend') {
      if (
        !window.confirm(
          `Do you really want to unfriend ${state.user.firstName} ${state.user.lastName}?`
        )
      ) {
        return;
      }
    }

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
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      )
      .then((response) => {
        getUserSuccess({ user: response.data.user2 });
        tempState.user = response.data.user1;
        tempState[loading] = false;
        setState({ ...tempState });
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
        if (
          error.response &&
          (error.response.status === 401 ||
            error.response.statusText === 'Unauthorized')
        ) {
          logoutFetch();
        } else {
          tempState.errMessage = error.response
            ? error.response.data.errMessage || error.response.statusText
            : 'Some error occured, please try again';
          tempState[loading] = false;
          setState({ ...tempState });
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
        }
      });
  };

  return state.isFetching ? (
    <div className="d-flex justify-content-center align-items-center m-5">
      <Loading isTrue={user.isFetching || state.isFetching} />
    </div>
  ) : !state.user || state.profileErrMessage ? (
    <div className="profile-wrapper">
      <div className="main-wrapper-error">
        <img
          src={require('../../assets/images/profile_not_found.png')}
          alt="not found"
          width="100%"
        />
        <h3 className="text-center">{state.profileErrMessage}</h3>
      </div>
    </div>
  ) : (
    <div className="profile-wrapper">
      <div className="main-page-card">
        <div className="general-info-wrapper">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="profile-detail text-center">
                <div className="user-name">
                  <h3>{`${state.user.firstName} ${state.user.lastName} ${
                    state.user._id === auth.userId ? '(You)' : ''
                  }`}</h3>
                  <span>{state.user.title}</span>
                </div>
                {state.user._id === auth.userId ? (
                  ''
                ) : (
                  <div className="action-btn mt-5">
                    {user.user.receivedFriendRequest.filter(
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
                    ) : !user.user.friendList.filter(
                        (friend) => friend._id === state.user._id
                      )[0] ? (
                      !user.user.sentFriendRequest.filter(
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

                    {user.user.friendList.filter(
                      (friend) => friend._id === state.user._id
                    )[0] ? (
                      <div className="row mt-4">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex align-items-center justify-content-center">
                          <div className="send-message mt-3">
                            <button className="btn">Send Message</button>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex align-items-center justify-content-center">
                          <div className="unfriend mt-3">
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
            <div className="col-12 col-md-6 d-flex align-items-center">
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

export default Profile;
