import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  signin = e => {
    e.preventDefault();
    this.props.login("dummyData");
  };
  render() {
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
                  <form>
                    <div className="form-group">
                      <label>User Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="johndoe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        required
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.signin.bind(null)}
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
