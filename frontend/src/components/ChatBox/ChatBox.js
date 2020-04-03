import React from "react";

import "./chatbox.css";

import Inbox from "./Inbox/Inbox";
import Messages from "./Messages/Messages";

const ChatBox = () => {
  return (
    <div className="chat-wrapper">
      <div className="container">
        <div className="main-wrapper">
          <div className="row">
            <div className="inbox col-12 col-sm-4">
              <Inbox />
            </div>
            <div className="messages col-12 col-sm-8">
              <Messages />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
