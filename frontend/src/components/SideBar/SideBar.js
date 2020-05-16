import React, { useState } from "react";
import { Link } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { FaEdit, FaAngleRight } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { AiOutlineSetting, AiOutlineProfile } from "react-icons/ai";

import Loading from "../Loading/Loading";

import "./sideBar.css";

const SideBar = (props) => {
  const [state, setState] = useState({
    displaySettingOption: false,
  });
  return (
    <aside
      className={`${
        props.authDetail.isAuthenticated ? "aside d-block" : "aside d-none"
      }`}
    >
      {props.userDetail.isFetching ? (
        <div className="loading-wrapper text-center m-5">
          <Loading isTrue={props.userDetail.isFetching} />
        </div>
      ) : !props.userDetail.user ? (
        ""
      ) : (
        <div className="sidebar-wrapper">
          <div className="sidebar-btn">
            <button className="btn">
              <GiHamburgerMenu />
            </button>
          </div>
          <div>
            <div className="profile-detail">
              <div className="image">
                <img
                  src={require("../../assets/images/user.png")}
                  alt="user-name"
                  width="100%"
                />
              </div>
              <div className="name mt-2">
                <span>{`${props.userDetail.user.firstName} ${props.userDetail.user.lastName}`}</span>
              </div>
            </div>
            <ul className="sidebar-list">
              <li className="list">
                <span className="icon">
                  <AiOutlineProfile />
                </span>
                <span className="content">
                  <Link to={`/${props.userDetail.user.username}`}>Profile</Link>
                </span>
              </li>
              <li className="list">
                <span className="icon">
                  <IoMdNotificationsOutline />
                </span>
                <span className="content">
                  <Link to={`/${props.authDetail.username}`}>
                    Notifications
                  </Link>
                </span>
              </li>
              <li className="list">
                <span className="icon">
                  <FiUsers />
                </span>
                <span className="content">
                  <Link to="/">Friends</Link>
                </span>
              </li>
              <li className="list">
                <span className="icon">
                  <TiMessages />
                </span>
                <span className="content">
                  <Link to="/">Messages</Link>
                </span>
              </li>
              <li
                className="list"
                onClick={() => {
                  let tempState = { ...state };
                  tempState.displaySettingOption = tempState.displaySettingOption
                    ? false
                    : true;
                  setState(tempState);
                }}
              >
                <span className="icon">
                  <AiOutlineSetting />
                </span>
                <span className="content">
                  <span>Setting</span>
                </span>
                <span className="pl-4">
                  <FaAngleRight
                    className={`${
                      state.displaySettingOption ? "rotate-90" : ""
                    }`}
                  />
                </span>
              </li>
              <div
                className={`setting-option mt-3 ${
                  state.displaySettingOption ? "d-block" : "d-none"
                }`}
              >
                <ul className="sidebar-list">
                  <li className="list">
                    <span className="icon">
                      <FaEdit />
                    </span>
                    <span className="content">
                      <Link to="/change-password">Change Password</Link>
                    </span>
                  </li>
                  <li className="list">
                    <span className="icon">
                      <MdUpdate />
                    </span>
                    <span className="content">
                      <Link to="/update-profile">Update Profile</Link>
                    </span>
                  </li>
                </ul>
              </div>
            </ul>
          </div>

          <div className="logout">
            <button onClick={props.logoutFetch} className="logout-btn btn">
              <FiLogOut />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
