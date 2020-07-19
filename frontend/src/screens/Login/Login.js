import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading/Loading';

import {
  baseUrl,
  storageAuthTokenName,
  storageUserIdName,
} from '../../utils/constant';

import './login.css';
const Login = (props) => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      if (props.user.user) {
        props.history.push(`/profile/${props.user.user.username}`);
      }
    }
  }, [props.auth.isAuthenticated, props.history, props.user.user]);

  const [state, setState] = useState({
    credentials: {
      username: '',
      password: '',
    },
    isLoading: false,
    rememberMe: false,
  });

  const _login = (e) => {
    e.preventDefault();
    const formData = {
      credentials: { ...state.credentials },
      rememberMe: state.rememberMe,
    };

    setState({ ...state, isLoading: true });

    axios
      .post(baseUrl + '/user/login', JSON.stringify(formData.credentials), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((response) => {
        setState({ ...state, isLoading: false });
        if (formData.rememberMe) {
          localStorage.setItem(storageAuthTokenName, response.data.authToken);
          localStorage.setItem(storageUserIdName, response.data.userId);
        } else {
          sessionStorage.setItem(storageAuthTokenName, response.data.authToken);
          sessionStorage.setItem(storageUserIdName, response.data.userId);
        }
        props.loginSuccess(response.data);
        props.getUserFetch();
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
        setState({ ...state, isLoading: false });
        if (error.response) {
          toast.error(
            `${error.response.data.errMessage || error.response.statusText}`,
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
        } else {
          toast.error(
            `Network Error, Connection to server couldn't be established. Please try again.`,
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

  return props.auth.isAuthenticated && props.user.isFetching ? (
    <div style={{ width: '40%', margin: '4rem auto', textAlign: 'center' }}>
      <Loading isTrue={props.auth.isAuthenticated && props.user.isFetching} />
    </div>
  ) : (
    <div className="login-signup">
      <div className="container">
        <div className="page-wrapper">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 grid-sec">
              <div className="img-container">
                <img
                  src={require('../../assets/images/sign_in.png')}
                  alt="main-illustrator"
                  width="100%"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 grid-sec">
              <div className="card">
                <div className="card-body">
                  <div className="heading">
                    <h3>Welcome Back :)</h3>
                  </div>
                  <div className="form-div">
                    <form onSubmit={_login}>
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="johndoe"
                          required
                          name="username"
                          minLength="5"
                          value={state.credentials.username}
                          onChange={(e) => {
                            const value = e.target.value;
                            let tempTarget = state.credentials;
                            tempTarget[e.target.name] = value;
                            setState({ ...state, credentials: tempTarget });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          required
                          name="password"
                          value={state.credentials.password}
                          onChange={(e) => {
                            const value = e.target.value;
                            let tempTarget = state.credentials;
                            tempTarget[e.target.name] = value;
                            setState({ ...state, credentials: tempTarget });
                          }}
                        />
                      </div>
                      <div className="form-group form-check">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="rememberMe"
                            checked={state.rememberMe}
                            onChange={() => {
                              let tempState = { ...state };
                              tempState.rememberMe = state.rememberMe
                                ? false
                                : true;
                              setState(tempState);
                            }}
                          />
                          Remember me
                        </label>
                      </div>
                      <small className="form-text text-muted mb-4">
                        Not having a account,
                        <Link to="/signup" style={{ color: 'blue' }}>
                          Sign up
                        </Link>
                      </small>
                      <div className="form-group">
                        <button type="submit" className="main-theme-btn">
                          Login
                        </button>
                        <Loading isTrue={state.isLoading} />
                      </div>
                    </form>
                    <div className="home-page-link">
                      <span>
                        <Link to="/"> &larr;Go back to Homepage</Link>
                      </span>
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
export default Login;
