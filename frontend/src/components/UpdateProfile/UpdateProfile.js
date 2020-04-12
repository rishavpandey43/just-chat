import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

import displayFlash from "../../utils/flashEvent";

import Loading from "../Loading/Loading";

import "./updateProfile.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const UpdateProfile = (props) => {
  const [state, setState] = useState({
    userDetail: props.userDetail.user || null,
    updating: false,
  });

  const updateProfile = (e) => {};

  console.log(state);

  return props.userDetail.isLoading || !state.userDetail ? (
    <div className="loading-wrapper text-center m-5">
      <Loading isTrue={props.userDetail.isLoading} />
    </div>
  ) : (
    <div className="update-profile-wrapper">
      <div className="main-page-card">
        <div className="update-box">
          <div className="form-div">
            <form>
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
                      value={state.userDetail.firstName}
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
                      value={state.userDetail.lastName}
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
                  value={state.userDetail.title}
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
                  value={state.userDetail.aboutMe}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Contact number</label>
                <input
                  type="number"
                  className="form-control"
                  name="contactNum"
                  required
                  minLength="5"
                  placeholder="+91-97XXXXXX88"
                  value={state.userDetail.contactNum}
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
                  value={state.userDetail.address}
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
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn">
                  Update Profile
                </button>
                <Loading isTrue={state.updating} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
