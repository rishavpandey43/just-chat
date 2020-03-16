import React from "react";

import "./profile.css";

const Profile = () => {
  return (
    <div className="profile-wrapper">
      <div className="container">
        <div className="main-wrapper">
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="profile-container">
                <div className="card">
                  <div className="card-head">
                    <h3>Your Profile</h3>
                  </div>
                  <div className="card-body">
                    <div className="short-summary">
                      <div className="user-img">
                        <img
                          src={require("../../assets/images/user.png")}
                          alt="user-img"
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="user-name">
                        <h3>John Doe</h3>
                      </div>
                    </div>
                    <div className="detail-summery">
                      <div className="heading">
                        <h3>About</h3>
                      </div>
                      <div className="content">
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="label">
                              <label>username:</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="value">johndoe</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="label">
                              <label>Name:</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="value">John Doe</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="label">
                              <label>email:</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="value">johndoe@demo.com</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="service-container">
                <div className="card">
                  <div className="card-head">
                    <h3>Say Hello!</h3>
                  </div>
                  <div className="card-body">
                    <div className="service-btn">
                      <div className="create-room-btn">
                        <button className="btn btn-primary">
                          Create Group
                        </button>
                      </div>
                      <div className="join-room-btn">
                        <button className="btn btn-primary">Join Group</button>
                      </div>
                    </div>
                    <div className="service">
                      <div className="create-group-form">
                        <form action=""></form>
                      </div>
                      <div className="join-group-form">
                        <form>
                          <div className="form-group">
                            <label>Group</label>
                            <input type="text" className="form-control" />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Create Group
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Join Group
                          </button>
                        </form>
                      </div>
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

export default Profile;
