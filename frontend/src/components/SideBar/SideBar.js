import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi';
import { FiUsers, FiLogOut } from 'react-icons/fi';
import { FaEdit, FaAngleRight } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { TiMessages } from 'react-icons/ti';
import { AiOutlineSetting, AiOutlineProfile } from 'react-icons/ai';

import Loading from '../Loading/Loading';

import './sideBar.css';

const SideBar = (props) => {
  const [state, setState] = useState({
    displaySettingOption: false,
  });
  return (
    <aside
      className={`${
        props.auth.isAuthenticated ? 'aside d-block' : 'aside d-none'
      }`}
    >
      {props.user.isFetching ? (
        <div className="loading-wrapper text-center m-5">
          <Loading isTrue={props.user.isFetching} />
        </div>
      ) : !props.user.user ? (
        ''
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
                  src={require('../../assets/images/user.png')}
                  alt="user-name"
                  width="100%"
                />
              </div>
              <div className="name mt-2">
                <span>{`${props.user.user.firstName} ${props.user.user.lastName}`}</span>
              </div>
            </div>
            <ul className="sidebar-list">
              <li className="list">
                <Link to={`/profile/${props.user.user.username}`}>
                  <span className="icon">
                    <AiOutlineProfile />
                  </span>
                  <span className="content">Profile</span>
                </Link>
              </li>
              <li className="list">
                <Link to={`/${props.auth.username}`}>
                  <span className="icon">
                    <IoMdNotificationsOutline />
                  </span>
                  <span className="content">Notifications</span>
                </Link>
              </li>
              <li className="list">
                <Link to="/friends">
                  <span className="icon">
                    <FiUsers />
                  </span>
                  <span className="content">Friends</span>
                </Link>
              </li>
              <li className="list">
                <Link to="/">
                  <span className="icon">
                    <TiMessages />
                  </span>
                  <span className="content">Messages</span>
                </Link>
              </li>
              <li className="list">
                <div
                  tabIndex="0"
                  onKeyPress={(event) => {
                    console.log(event.which, event.keycode);
                    if (event.which === 13) {
                      let tempState = { ...state };
                      tempState.displaySettingOption = tempState.displaySettingOption
                        ? false
                        : true;
                      setState(tempState);
                    } else return;
                  }}
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
                        state.displaySettingOption ? 'rotate-90' : ''
                      }`}
                    />
                  </span>
                </div>
              </li>
              <div
                className={`setting-option mt-3 ${
                  state.displaySettingOption ? 'd-block' : 'd-none'
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
            <button
              role="button"
              tabIndex="0"
              onClick={props.logoutFetch}
              className="logout-btn btn"
            >
              <FiLogOut />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
