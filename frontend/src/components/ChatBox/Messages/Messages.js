import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./message.css";

import Message from "./Message/Message";
import MessageInput from "./MessageInput/MessageInput";

const Messages = (props) => {
  return props.currentGroup ? (
    <div className="messages-wrapper">
      <div className="heading">
        <h4>{props.currentGroup.groupDetail.name}</h4>
      </div>
      <div className="message-container">
        <div className="text-center">
          <small>
            {`${props.currentGroup.groupDetail.name} was created by
            ${props.currentGroup.groupDetail.owner.firstName} ${props.currentGroup.groupDetail.owner.lastName} on
            ${props.currentGroup.groupDetail.createdAt}`}
          </small>
        </div>
        <ScrollToBottom>
          {props.currentGroup.messages.map((message, i) => (
            <Message
              currentUserId={props.currentUserId}
              message={message}
              key={i}
            />
          ))}
        </ScrollToBottom>
      </div>
      <div className="input-container">
        <MessageInput
          currentGroupId={props.currentGroup.groupDetail.groupId}
          currentUserId={props.currentUserId}
          sendMessage={props.sendMessage}
        />
      </div>
    </div>
  ) : (
    <div className="text-center mt-5">
      <h3>Select the conversation to view message.</h3>
    </div>
  );
};

export default Messages;
