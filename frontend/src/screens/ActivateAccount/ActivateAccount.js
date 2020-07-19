import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading/Loading';

import { baseUrl } from '../../utils/constant';
import displayFlash from '../../utils/flashEvent';

import './activateaccount.css';

class ActivateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
      isActivationLoading: false,
      isResendLoading: false,
      activationErrorMessage: null,
      username: '',
      email: '',
    };
  }

  _activateAccount = () => {
    this.setState({ isActivationLoading: true, activationErrorMessage: null });
    axios
      .get(baseUrl + '/user/activate-user', {
        headers: { 'Content-Type': 'application/json' },
        params: {
          token: this.state.token,
        },
      })
      .then((response) => {
        this.setState({
          isActivationLoading: false,
          activationErrorMessage: null,
        });
        this.props.history.push('/login');
        toast.success(
          response.data.message || 'Account activated successfully',
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
      })
      .catch((error) => {
        this.setState({
          isActivationLoading: false,
          activationErrorMessage: error.response.data.errMessage,
        });
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
      });
  };
  _resendVerificationLink = (e) => {
    e.preventDefault();
    this.setState({ isResendLoading: true });
    axios
      .get(baseUrl + '/user/resend-activation-link', {
        headers: { 'Content-Type': 'application/json' },
        params: {
          username: this.state.username,
          email: this.state.email,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          isResendLoading: false,
        });
        displayFlash.emit('get-message', {
          message:
            response.data.message || 'Verification link sent successfully',
          type: 'success',
        });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          isResendLoading: false,
        });
        displayFlash.emit('get-message', {
          message:
            err.response.data.errMessage ||
            "Verification link can't be sent, try again",
          type: 'danger',
        });
      });
  };

  render() {
    return (
      <div className="activation-page">
        <div className="container">
          <div className="page-wrapper">
            <h1>Welcome to Just Chat Account Activation Page</h1>
            <div className="btn-wrapper">
              <button
                className="main-theme-btn"
                onClick={this._activateAccount.bind(null)}
              >
                Click here to activate your account now
              </button>
              <Loading isTrue={this.state.isActivationLoading}></Loading>
            </div>
            {this.state.activationErrorMessage ? (
              <div>
                <div className="error-div">
                  <p className="error-msg">
                    Sorry, this account confirmation link is no longer valid.
                    Perhaps your account is already active, or you had hit a
                    wrong link?
                  </p>
                  <p className="error-msg">
                    You can also request a new activation link by submitting the
                    detail below
                  </p>
                  <br />
                  <div>
                    <h4>Try navigating-</h4>
                    <span className="link">
                      <Link to="/">Home</Link>
                    </span>
                    <span className="link">
                      <Link to="/login">Login</Link>
                    </span>
                    <span className="link">
                      <Link to="/signup">Signup</Link>
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
            <h1 style={{ margin: '2rem' }}>OR</h1>
            <div className="form-div">
              <h2 style={{ margin: '1rem' }}>Request a new activation link</h2>
              <form onSubmit={this._resendVerificationLink.bind(null)}>
                <div className="form-group">
                  <label className="form-label">Type your email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="demo@demo.com"
                    required
                    value={this.state.email}
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Type your username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="johndoe"
                    required
                    minLength="5"
                    value={this.state.username}
                    onChange={(e) => {
                      this.setState({ username: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="main-theme-btn"
                    disabled={
                      this.state.email === '' || this.state.username === ''
                    }
                  >
                    Resend verification link
                  </button>
                  <Loading isTrue={this.state.isResendLoading} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivateAccount;
