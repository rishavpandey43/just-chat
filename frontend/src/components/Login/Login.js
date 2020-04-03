import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../Loading/Loading";

import "./login.css";
const Login = props => {
  useEffect(() => {
    if (props.authDetail.isAuthenticated) {
      props.history.push("/");
    }
  }, []);

  const [state, setState] = useState({
    credentials: {
      username: "",
      password: ""
    },
    rememberMe: false
  });

  const handleInputChange = e => {
    const value = e.target.value;
    let tempTarget = state.credentials;
    tempTarget[e.target.name] = value;
    setState({ ...state, credentials: tempTarget });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      credentials: { ...state.credentials },
      rememberMe: state.rememberMe
    };
    props.loginFetch(formData);
  };

  return (
    <div className="login-signup-wrapper">
      <div className="container">
        <div className="main-wrapper">
          <div className="wrapper">
            <div className="card col-12 col-sm-6">
              <div className="card-head">
                <h3>Welcome Back</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="username"
                      className="form-control"
                      placeholder="johndoe@demo.com"
                      required
                      name="username"
                      value={state.credentials.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      name="password"
                      value={state.credentials.password}
                      onChange={handleInputChange}
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
                    <Link to="/signup" style={{ color: "blue" }}>
                      Sign up
                    </Link>
                  </small>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <Loading isTrue={props.authDetail.isLoading} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
