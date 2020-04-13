import React, { useState } from "react";

import "./messageInput.css";

const MessageInput = (props) => {
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    let data = {
      message: {
        content: messageInput,
        from: props.currentUserId,
      },
      currentGroupId: props.currentGroupId,
    };
    props.sendMessage(data);
    setMessageInput("");
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={sendMessage}>
        <div className="form-wrapper">
          <div className="input-box">
            <input
              className="input"
              type="text"
              required
              placeholder="Type a message..."
              value={messageInput}
              onChange={({ target: { value } }) => setMessageInput(value)}
            />
          </div>
          <div className="send-btn">
            <button className="sendButton" type="submit">
              <img
                src={require("../../../../assets/images/send.png")}
                alt="send-icon"
                width="25px"
                height="25px"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
