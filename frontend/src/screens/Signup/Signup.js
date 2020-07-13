import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Loading from '../../components/Loading/Loading';

import './signup.css';

import { baseUrl } from '../../utils/constant';
import displayFlash from '../../utils/flashEvent';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
      },
      isLoading: false,
      responseData: {
        message: '',
        status: null,
      },
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  handleInputChange = (target, e) => {
    const tempuser = { ...this.state.user };
    tempuser[target] = e.target.value;
    this.setState({ user: tempuser });
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      responseData: {
        message: '',
        status: null,
      },
    });
    let isEmpty = true;
    for (const key in this.state.user) {
      if (this.state.user[key] === '') {
        isEmpty = true;
        break;
      } else isEmpty = false;
    }
    if (!isEmpty) {
      // CHECK VALIDATION OF USER DETAILS
      const newUser = JSON.stringify({ ...this.state.user });
      if (/\s/g.test(this.state.user.username)) {
        let responseData = {
          message:
            'username consist of whitespace, please avoid whitespace to continue.',
          status: 422,
        };
        this.setState({
          isLoading: false,
          responseData,
        });
        return;
      }
      if (this.state.user.password !== this.state.user.rePassword) {
        let responseData = {
          message: 'Both password should be same',
          status: 422,
        };
        this.setState({
          isLoading: false,
          responseData,
        });
        return;
      }
      if (this.state.user.password.length < 8) {
        let responseData = {
          message: 'password length should be greater than or equal to 8',
          status: 422,
        };
        this.setState({
          isLoading: false,
          responseData,
        });
        return;
      }

      this.setState({ isLoading: true });
      axios
        .post(baseUrl + '/user/signup', newUser, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
          let responseData = {
            message: res.data.message,
            status: res.status,
          };
          this.setState({
            isLoading: false,
            responseData,
            user: {
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              rePassword: '',
            },
          });
          displayFlash.emit('get-message', {
            message: responseData.message,
            type: 'success',
          });
        })
        .catch((err) => {
          let responseData = {
            message: 'Internal Server Error, please try again.',
            status: 500,
          };
          if (err.response) {
            responseData = {
              message: err.response.data.errMessage,
              status: err.response.status,
            };
          }
          this.setState({
            isLoading: false,
            responseData,
          });
          displayFlash.emit('get-message', {
            message: responseData.message,
            type: 'danger',
          });
        });
    } else alert('Please fill all the details first to signup');
  };
  render() {
    return (
      <div className="login-signup">
        <div className="container">
          <div className="page-wrapper">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 grid-sec">
                <div className="img-container">
                  <img
                    src={require('../../assets/images/sign_up.png')}
                    alt="main-illustrator"
                    width="100%"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 grid-sec">
                <div className="card">
                  <div className="card-body">
                    <div className="heading">
                      <h3>Create an account for free</h3>
                    </div>
                    <div className="form-div">
                      <form onSubmit={this._handleSubmit.bind(null)}>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label className="form-label">First name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="John"
                                required
                                value={this.state.user.firstName}
                                onChange={this.handleInputChange.bind(
                                  null,
                                  'firstName'
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label className="form-label">Last name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Doe"
                                required
                                value={this.state.user.lastName}
                                onChange={this.handleInputChange.bind(
                                  null,
                                  'lastName'
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="johndoe"
                            required
                            name="username"
                            minLength="5"
                            value={this.state.user.username}
                            onChange={this.handleInputChange.bind(
                              null,
                              'username'
                            )}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="johndoe@john.doe"
                            required
                            name="email"
                            minLength="5"
                            value={this.state.user.email}
                            onChange={this.handleInputChange.bind(
                              null,
                              'email'
                            )}
                          />
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label className="form-label">
                                Choose a strong Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                required
                                value={this.state.user.password}
                                onChange={this.handleInputChange.bind(
                                  null,
                                  'password'
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label className="form-label">
                                Confirm your Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                required
                                value={this.state.user.rePassword}
                                onChange={this.handleInputChange.bind(
                                  null,
                                  'rePassword'
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <small className="form-text text-muted mb-4">
                          Already have a account,
                          <Link to="/login" style={{ color: 'blue' }}>
                            Sign in
                          </Link>
                        </small>
                        <div className="form-group">
                          <button type="submit" className="main-theme-btn">
                            Signup
                          </button>
                          <Loading isTrue={this.state.isLoading} />
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
  }
}

export default Signup;
