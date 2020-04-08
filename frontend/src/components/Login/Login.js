import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../Loading/Loading";

import "./login.css";
const Login = (props) => {
  useEffect(() => {
    if (props.authDetail.isAuthenticated) {
      props.history.push("/");
    }
  }, []);

  const [state, setState] = useState({
    credentials: {
      username: "",
      password: "",
    },
    rememberMe: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      credentials: { ...state.credentials },
      rememberMe: state.rememberMe,
    };
    props.loginFetch(formData);
  };

  return (
    <div className="login-signup">
      <div className="container">
        <div className="page-wrapper">
          <div className="row">
            <div className="col-12 col-sm-6 grid-sec">
              <div className="img-container">
                <img
                  src={require("../../assets/images/sign_in.png")}
                  alt="main-illustrator"
                  width="100%"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 grid-sec">
              <div className="card">
                <div className="card-body">
                  <div className="heading">
                    <h3>Welcome Back :)</h3>
                  </div>
                  <div className="form-div">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Username</label>
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
                        <label>Password</label>
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
                        <Link to="/signup" style={{ color: "blue" }}>
                          Sign up
                        </Link>
                      </small>
                      <div className="form-group">
                        <button type="submit" className="btn">
                          Login
                        </button>
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
