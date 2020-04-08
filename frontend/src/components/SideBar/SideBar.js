import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { TiMessages } from "react-icons/ti";
import { AiOutlineSetting, AiOutlineProfile } from "react-icons/ai";

import "./sideBar.css";

const SideBar = (props) => {
  return (
    <aside className="aside">
      <div className="sidebar-wrapper">
        <div className="sidebar-btn">
          <button className="btn">
            <GiHamburgerMenu />
          </button>
        </div>
        <ul className="sidebar-list">
          <li className="list">
            <span className="icon">
              <AiOutlineProfile />
            </span>
            <span>Profile</span>
          </li>
          <li className="list">
            <span className="icon">
              <FiUsers />
            </span>
            <span>Friends</span>
          </li>
          <li className="list">
            <span className="icon">
              <TiMessages />
            </span>
            <span>Messages</span>
          </li>
          <li className="list">
            <span className="icon">
              <AiOutlineSetting />
            </span>
            <span>Setting</span>
          </li>
        </ul>
        <div className="logout">
          <button className="logout-btn btn">
            <FiLogOut />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
