import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./message.css";

import Message from "./Message/Message";
import MessageInput from "./MessageInput/MessageInput";

const Messages = () => {
  return (
    <div className="messages-wrapper">
      <div className="heading">
        <h4>Group 1</h4>
      </div>
      <div className="message-container">
        <ScrollToBottom>
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </ScrollToBottom>
      </div>
      <div className="input-container">
        <MessageInput />
      </div>
    </div>
  );
};

export default Messages;
