import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./signup.css";

import Loading from "../Loading/Loading";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetail: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: ""
      },
      loadingIsTrue: false,
      responseData: {
        message: "",
        status: null
      }
    };
  }

  handleInputChange = (target, e) => {
    const tempUserDetail = { ...this.state.userDetail };
    tempUserDetail[target] = e.target.value;
    this.setState({ userDetail: tempUserDetail });
  };

  signup = e => {
    e.preventDefault();
    this.setState({
      responseData: {
        message: "",
        status: null
      }
    });
    let isEmpty = true;
    for (const key in this.state.userDetail) {
      if (this.state.userDetail[key] === "") {
        isEmpty = true;
        break;
      } else isEmpty = false;
    }
    if (!isEmpty) {
      // CHECK VALIDATION OF USER DETAILS
      const newUser = JSON.stringify({ ...this.state.userDetail });
      if (/\s/g.test(this.state.userDetail.username)) {
        let responseData = {
          message:
            "username consist of whitespace, please avoid whitespace to continue.",
          status: 422
        };
        this.setState({
          loadingIsTrue: false,
          responseData
        });
        return;
      }
      if (this.state.userDetail.password !== this.state.userDetail.rePassword) {
        let responseData = {
          message: "Both password should be same",
          status: 422
        };
        this.setState({
          loadingIsTrue: false,
          responseData
        });
        return;
      }
      if (this.state.userDetail.password.length < 8) {
        let responseData = {
          message: "password length should be greater than or equal to 8",
          status: 422
        };
        this.setState({
          loadingIsTrue: false,
          responseData
        });
        return;
      }

      this.setState({ loadingIsTrue: true });
      axios
        .post(process.env.REACT_APP_API_BASE_URL + "user/signup", newUser, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => {
          let responseData = {
            message: res.data.message,
            status: res.status
          };
          this.setState({
            loadingIsTrue: false,
            responseData,
            userDetail: {
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              rePassword: ""
            }
          });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 1000);
        })
        .catch(err => {
          let responseData = {
            message: "Internal Server Error, please try again.",
            status: 500
          };
          console.log(err.response);
          if (err.response) {
            responseData = {
              message: err.response.data.message,
              status: err.response.status
            };
          }
          this.setState({
            loadingIsTrue: false,
            responseData
          });
        });
    } else alert("Please fill all the details first to signup");
  };
  render() {
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
                            value={this.state.userDetail.firstName}
                            onChange={this.handleInputChange.bind(
                              null,
                              "firstName"
                            )}
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
                            value={this.state.userDetail.lastName}
                            onChange={this.handleInputChange.bind(
                              null,
                              "lastName"
                            )}
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
                            value={this.state.userDetail.username}
                            onChange={this.handleInputChange.bind(
                              null,
                              "username"
                            )}
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
                            value={this.state.userDetail.email}
                            onChange={this.handleInputChange.bind(
                              null,
                              "email"
                            )}
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
                            value={this.state.userDetail.password}
                            onChange={this.handleInputChange.bind(
                              null,
                              "password"
                            )}
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
                            value={this.state.userDetail.rePassword}
                            onChange={this.handleInputChange.bind(
                              null,
                              "rePassword"
                            )}
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.signup.bind(null)}
                    >
                      Sign Up
                    </button>
                    <Loading isTrue={this.state.loadingIsTrue} />
                    <div>
                      {this.state.responseData.status ? (
                        this.state.responseData.status === 200 ? (
                          <span className="text-success">
                            {this.state.responseData.message}
                          </span>
                        ) : (
                          <span className="text-danger">
                            {this.state.responseData.message}
                          </span>
                        )
                      ) : (
                        ""
                      )}
                    </div>
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

export default Signup;
