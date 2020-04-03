import React from "react";

import "./message.css";

const Message = () => {
  return (
    <div className="message-wrapper">
      <div className="wrapper">
        <div className="user-img">
          <img
            src={require("../../../../assets/images/user.png")}
            alt="user-name"
            width="30px"
            height="30px"
          />
        </div>
        <div className="user-name">
          <span>Gaurav</span>
        </div>
      </div>
      <div className="wrapper">
        <div className="user-text">
          <div className="text">
            LoremMinim ad mollit nostrud ullamco excepteur qui laborum.
          </div>
        </div>
        <div className="text-time">
          <small>11:01 AM | June 9</small>
        </div>
      </div>
    </div>
  );
};

export default Message;
