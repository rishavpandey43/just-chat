import React from "react";
import { Link } from "react-router-dom";

import "./signup.css";

function Signup() {
  return (
    <div className="login-signup-wrapper">
      <div className="container">
        <div className="main-wrapper">
          <div className="wrapper">
            <div className="card col-12 col-sm-6">
              <div className="card-head">
                <h3>Create your account now</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>First name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="johndoe"
                          required
                        />
                        <small className="form-text text-muted">
                          your username should be unique
                        </small>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="johndoe@demo.com"
                          required
                        />
                        <small className="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Choose a strong Password</label>
                        <input
                          type="password"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Confirm your Password</label>
                        <input
                          type="password"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <small className="form-text text-muted mb-4">
                    Already have a account,
                    <Link to="/login" style={{ color: "blue" }}>
                      Sign in
                    </Link>
                  </small>
                  <button type="submit" className="btn btn-primary">
                    Sign Up
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

export default Signup;
