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
    displayMobileNav: false,
    displaySettingOption: false,
  });

  const toggleSettingMenu = () => {
    setState({
      ...state,
      displaySettingOption: !state.displaySettingOption,
    });
  };

  const toggleMobileNav = () => {
    setState({
      ...state,
      displayMobileNav: !state.displayMobileNav,
    });
  };

  return (
    <aside
      className={`aside ${state.displayMobileNav ? 'open-sidebar' : ''} ${
        props.auth.isAuthenticated ? 'd-block' : 'd-none'
      }`}
    >
      {props.user.isFetching ? (
        <div className="loading-wrapper text-center mt-5">
          <Loading isTrue={props.user.isFetching} />
        </div>
      ) : !props.user.user ? (
        ''
      ) : (
        <div className="sidebar-wrapper">
          <div className="sidebar-toggle-btn d-none">
            <button className="btn" onClick={toggleMobileNav}>
              <GiHamburgerMenu />
            </button>
          </div>
          <div className="sidebar-nav-wrapper">
            <div
              className={`profile-detail ${
                state.displayMobileNav ? 'd-block' : ''
              }`}
            >
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
            <ul className="sidebar-nav">
              <li className="nav-item">
                <Link
                  className="link"
                  onClick={() => {
                    if (state.displayMobileNav) {
                      setState({ ...state, displayMobileNav: false });
                    }
                  }}
                  to={`/profile/${props.user.user.username}`}
                >
                  <span className="icon">
                    <AiOutlineProfile />
                  </span>
                  <span
                    className={`content ${
                      state.displayMobileNav ? 'd-inline' : ''
                    }`}
                  >
                    Profile
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="link"
                  onClick={() => {
                    if (state.displayMobileNav) {
                      setState({ ...state, displayMobileNav: false });
                    }
                  }}
                  to={`/${props.auth.username}`}
                >
                  <span className="icon">
                    <IoMdNotificationsOutline />
                  </span>
                  <span
                    className={`content ${
                      state.displayMobileNav ? 'd-inline' : ''
                    }`}
                  >
                    Notifications
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="link"
                  onClick={() => {
                    if (state.displayMobileNav) {
                      setState({ ...state, displayMobileNav: false });
                    }
                  }}
                  to="/friends"
                >
                  <span className="icon">
                    <FiUsers />
                  </span>
                  <span
                    className={`content ${
                      state.displayMobileNav ? 'd-inline' : ''
                    }`}
                  >
                    Friends
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="link"
                  onClick={() => {
                    if (state.displayMobileNav) {
                      setState({ ...state, displayMobileNav: false });
                    }
                  }}
                  to="/"
                >
                  <span className="icon">
                    <TiMessages />
                  </span>
                  <span
                    className={`content ${
                      state.displayMobileNav ? 'd-inline' : ''
                    }`}
                  >
                    Messages
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <div
                  tabIndex="0"
                  onKeyPress={(event) => {
                    if (event.which === 13) {
                      toggleSettingMenu();
                    } else return;
                  }}
                  onClick={() => {
                    toggleSettingMenu();
                  }}
                >
                  <span className="icon">
                    <AiOutlineSetting />
                  </span>
                  <span
                    className={`content ${
                      state.displayMobileNav ? 'd-inline' : ''
                    }`}
                  >
                    <span>Setting</span>
                  </span>
                  <span
                    className={`pl-4 content ${
                      state.displayMobileNav ? 'd-inline' : ''
                    }`}
                  >
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
                <ul className="sidebar-nav">
                  <li className="nav-item">
                    <Link
                      className="link"
                      onClick={() => {
                        setState({
                          displayMobileNav: false,
                          displaySettingOption: false,
                        });
                      }}
                      to="/change-password"
                    >
                      <span className="icon">
                        <FaEdit />
                      </span>
                      <span
                        className={`content ${
                          state.displayMobileNav ? 'd-inline' : ''
                        }`}
                      >
                        Change Password
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="link"
                      onClick={() => {
                        setState({
                          displayMobileNav: false,
                          displaySettingOption: false,
                        });
                      }}
                      to="/update-profile"
                    >
                      <span className="icon">
                        <MdUpdate />
                      </span>
                      <span
                        className={`content ${
                          state.displayMobileNav ? 'd-inline' : ''
                        }`}
                      >
                        Update Profile
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <div
                      tabIndex="0"
                      onClick={() => {
                        props.logoutFetch();
                        toggleMobileNav();
                        toggleSettingMenu();
                      }}
                      onKeyPress={(event) => {
                        if (event.which === 13) {
                          props.logoutFetch();
                        } else return;
                      }}
                    >
                      <span className="icon">
                        <FiLogOut />
                      </span>
                      <span
                        className={`content ${
                          state.displayMobileNav ? 'd-inline' : ''
                        }`}
                      >
                        Logout
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
