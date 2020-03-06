import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./chat.css";

let socket;

const Chat = ({ location }) => {
  const [userName, setName] = useState("");
  const [userRoom, setRoom] = useState("");
  const [userMessage, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();
    console.log(userMessage);
    if (userMessage) {
      socket.emit("sendMessage", userMessage, () => setMessage(""));
    }
    console.log(userMessage, messages);
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={userMessage}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
};
export default Chat;
