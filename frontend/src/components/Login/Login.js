import React, { useState } from "react";
import { Link } from "react-router-dom";

import Loading from "../Loading/Loading";

import "./login.css";
const Login = props => {
  const [state, setState] = useState({
    credentials: {
      username: "",
      password: ""
    }
  });

  const handleInputChange = e => {
    console.log(e.target.value);
    const value = e.target.value;
    let tempTarget = state.credentials;
    tempTarget[e.target.name] = value;
    setState({ ...state, credentials: tempTarget });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.loginFetch(state.credentials);
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
                      <input type="checkbox" className="form-check-input" />
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
