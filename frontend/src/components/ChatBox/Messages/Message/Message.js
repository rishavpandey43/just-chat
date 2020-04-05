import React from "react";
import moment from "moment";

import "./message.css";

const Message = (props) => {
  return (
    <div
      className={`message-wrapper row ${
        props.currentUserId === props.message.from._id ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`wrapper col-2 ${
          props.currentUserId === props.message.from._id ? "d-none" : "d-block"
        }`}
      >
        <div className="user-img">
          <img
            src={require("../../../../assets/images/user.png")}
            alt="user-name"
            width="30px"
            height="30px"
          />
        </div>
        <div className="user-name">
          <span>
            {`${props.message.from.firstName} ${props.message.from.lastName}`}
          </span>
        </div>
      </div>
      <div className="wrapper col-10">
        <div
          className={`user-text ${
            props.currentUserId === props.message.from._id
              ? "text-right"
              : "text-left"
          }`}
        >
          <div className="text">{props.message.content} </div>
        </div>
        <div
          className={`text-time ${
            props.currentUserId === props.message.from._id
              ? "text-right"
              : "text-left"
          }`}
        >
          <small>
            {`${moment(props.message.createdAt).format("LT")} |
            ${moment(props.message.createdAt).format("DD-MM-YYYY")}`}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Message;
