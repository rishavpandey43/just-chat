import React from "react";

import "./messageinput.css";

const MessageInput = () => (
  <div className="input-wrapper">
    <form>
      <div className="form-wrapper">
        <div className="input-box">
          <input
            className="input"
            type="text"
            placeholder="Type a message..."
            // value={message}
            // onChange={({ target: { value } }) => setMessage(value)}
            // onKeyPress={event => (event.key === "Enter" ? sendMessage(event) : null)}
          />
        </div>
        <div className="send-btn">
          <button className="sendButton">
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

export default MessageInput;
