import React, { useState, useEffect, Component } from "react";

import "react-datepicker/dist/react-datepicker.css";

import Loading from "../Loading/Loading";

import "./updateProfile.css";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetail: null,
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.setState({
      userDetail: this.props.userDetail.user
        ? { ...this.props.userDetail.user }
        : null,
    });
  }

  // const [state, setState] = useState({
  //   userDetail: this.props.userDetail.user ? { ...this.props.userDetail.user } : null,
  // });

  // useEffect(() => {
  //   console.log(this.props.userDetail.user ? this.props.userDetail.user.updatedAt : null);
  //   // this.setState({ userDetail: { ...this.props.userDetail.user } });
  // }, [this.props.authDetail.token]);

  updateProfile = (e) => {
    e.preventDefault();
    let data = {
      username: this.state.userDetail.username,
      firstName: this.state.userDetail.firstName,
      lastName: this.state.userDetail.lastName,
      title: this.state.userDetail.title,
      aboutMe: this.state.userDetail.aboutMe,
      contactNum: this.state.userDetail.contactNum,
      address: this.state.userDetail.address,
      password: this.state.userDetail.password,
    };
    this.props.updateUserDetailFetch(data);
  };

  render() {
    console.log(this.state.userDetail);
    return this.props.userDetail.isFetching ? (
      <div className="loading-wrapper text-center m-5">
        <Loading isTrue={this.props.userDetail.isFetching} />
      </div>
    ) : this.props.userDetail.responseStatus === 503 ? (
      <div className="profile-wrapper">
        <div className="main-wrapper-error">
          <img
            src={require("../../assets/images/server_down.png")}
            alt="not found"
            width="100%"
          />
          <h3 className="text-center">{this.state.errMessage}</h3>
          <button
            className="main-theme-btn"
            onClick={this.props.getUserDetailFetch.bind(null)}
          >
            Refresh
          </button>
        </div>
      </div>
    ) : !this.state.userDetail ? null : (
      <div className="update-profile-wrapper">
        <div className="main-page-card">
          <div className="mb-5">
            <h1>Update Your Profile</h1>
          </div>
          <div className="update-box">
            <div className="form-div">
              <form onSubmit={this.updateProfile.bind(null)}>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="form-label">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John"
                        required
                        name="firstName"
                        value={this.state.userDetail.firstName}
                        onChange={(e) => {
                          let tempState = { ...this.state };
                          tempState.userDetail[e.target.name] = e.target.value;
                          this.setState({ ...this.state });
                        }}
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
                        name="lastName"
                        value={this.state.userDetail.lastName}
                        onChange={(e) => {
                          let tempState = { ...this.state };
                          tempState.userDetail[e.target.name] = e.target.value;
                          this.setState({ ...this.state });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Software Engineer"
                    name="title"
                    minLength="5"
                    value={this.state.userDetail.title}
                    onChange={(e) => {
                      let tempState = { ...this.state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      this.setState({ ...this.state });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">About Me</label>
                  <textarea
                    className="form-control"
                    cols="20"
                    rows="10"
                    name="aboutMe"
                    minLength="50"
                    maxLength="400"
                    placeholder="write under min 50 and max 400 words"
                    value={this.state.userDetail.aboutMe}
                    onChange={(e) => {
                      let tempState = { ...this.state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      this.setState({ ...this.state });
                    }}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Contact number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="contactNum"
                    required
                    placeholder="97XXXXXX88"
                    value={this.state.userDetail.contactNum}
                    onChange={(e) => {
                      let tempState = { ...this.state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      this.setState({ ...this.state });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Current Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    required
                    placeholder="New Delhi, India"
                    value={this.state.userDetail.address}
                    onChange={(e) => {
                      let tempState = { ...this.state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      this.setState({ ...this.state });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Enter the password to proceed
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    minLength="5"
                    value={this.state.userDetail.password || ""}
                    onChange={(e) => {
                      let tempState = { ...this.state };
                      tempState.userDetail[e.target.name] = e.target.value;
                      this.setState({ ...this.state });
                    }}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="main-theme-btn">
                    Update Profile
                  </button>
                  <Loading isTrue={this.props.userDetail.isUpdating} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateProfile;
