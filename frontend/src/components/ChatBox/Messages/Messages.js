import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./message.css";

import Loading from "../../Loading/Loading";

import Message from "./Message/Message";
import MessageInput from "./MessageInput/MessageInput";

const Messages = props => {
  return props.currentGroup ? (
    <div className="messages-wrapper">
      <div className="heading">
        <h4>{props.currentGroup.groupDetail.name}</h4>
      </div>
      <div className="message-container">
        <div className="text-center">
          <small>
            {`${props.currentGroup.groupDetail.name} was created by
            ${props.currentGroup.groupDetail.createdBy} on
            ${props.currentGroup.groupDetail.createdAt}`}
          </small>
        </div>
        <ScrollToBottom>
          {props.currentGroup.messageList.map(message => (
            <Message />
          ))}
        </ScrollToBottom>
      </div>
      <div className="input-container">
        <MessageInput />
      </div>
    </div>
  ) : (
    <div className="text-center mt-5">
      <Loading isTrue={!props.currentGroup} />
    </div>
  );
  return;
};

export default Messages;
