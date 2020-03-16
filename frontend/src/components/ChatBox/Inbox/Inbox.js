import React from "react";

import "./inbox.css";

const Inbox = () => {
  return (
    <div className="inbox-wrapper">
      <div className="heading">
        <h4>Recent Conversation</h4>
      </div>
      <div className="inbox-list">
        <ul>
          <li className="recipient-list">
            <div className="recipient-img">
              <img
                src={require("../../../assets/images/group.png")}
                alt="group-icon"
                width="40px"
                height="40px"
              />
            </div>
            <div className="recipient-name">
              <span>Group 1</span>
            </div>
          </li>
          <li className="recipient-list">
            <div className="recipient-img">
              <img
                src={require("../../../assets/images/group.png")}
                alt="group-icon"
                width="40px"
                height="40px"
              />
            </div>
            <div className="recipient-name">
              <span>Group 1</span>
            </div>
          </li>
          <li className="recipient-list">
            <div className="recipient-img">
              <img
                src={require("../../../assets/images/group.png")}
                alt="group-icon"
                width="40px"
                height="40px"
              />
            </div>
            <div className="recipient-name">
              <span>Group 1</span>
            </div>
          </li>
          <li className="recipient-list">
            <div className="recipient-img">
              <img
                src={require("../../../assets/images/group.png")}
                alt="group-icon"
                width="40px"
                height="40px"
              />
            </div>
            <div className="recipient-name">
              <span>Group 1</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Inbox;
